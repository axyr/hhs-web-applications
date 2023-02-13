(function () {

    const collection = {
        cardsPerPage: 5,
        dataSource: './collections/books/index.json',
        data: {
            items: [],
            categories: [],
        },
        settings: {
            currentPage: 1,
            sortField: 'title',
            sortDirection: 'asc',
            filterFavorites: false,
            selectedCategories: [],
            favoriteCards: [],
        },
        displayedItems: [],
        searchTerm: null,
        init() {
            this.loadSettingsFromLocalStorage();
            this.initEventListeners();
            this.fetchItems();
        },
        loadSettingsFromLocalStorage() {
            const settingsFromLocalStorage = window.localStorage.getItem('settings');
            if (settingsFromLocalStorage) {
                const settingsObject = JSON.parse(settingsFromLocalStorage);

                for (const [key, value] of Object.entries(settingsObject)) {
                    if (this.settings.hasOwnProperty(key)) {
                        this.settings[key] = value;
                    }
                }
            }
        },
        initEventListeners() {
            document.getElementById('logo').addEventListener('click', e => this.toHomepage(e));
            document.getElementById('sort').addEventListener('change', e => this.onSortChange(e));
            document.getElementById('search-field').addEventListener('keyup', this.debounce((e) => this.searchItems(e), 300));
        },
        fetchItems() {
            fetch(this.dataSource).then(response => {
                return response.json();
            }).catch(error => {
                console.log(error);
                console.log('Could not load items');
            }).then(json => {
                this.data.items = json.items;
                this.data.categories = json.categories;
                this.data.items.forEach(item => this.setCategoryTotals(item));
                this.redraw();
            });
        },
        setCategoryTotals(item) {
            this.data.categories.forEach(category => item.categoryId === category.id ? category.itemCount++ : null);
        },
        redraw() {
            this.renderCategoryCheckboxes();
            this.renderFavoriteCheckbox();
            this.displayCards();
            this.setPageTitle();
            this.renderMenuItems();
        },
        updateSetting(key, value) {
            this.settings[key] = value;
            window.localStorage.setItem('settings', JSON.stringify(this.settings));
        },
        setPageTitle() {
            document.getElementsByTagName('title')[0].text = `Page ${this.settings.currentPage} - Books`;
        },
        resetSearchTerm() {
            this.searchTerm = null;
            document.getElementById('search-field').value = null;
        },
        toHomepage() {
            this.resetSearchTerm();
            this.updateSetting('selectedCategories', []);
            this.setCurrentPage(1);
        },
        setCurrentPage(page) {
            this.updateSetting('currentPage', parseInt(page));
            this.redraw();
        },
        getClearedElementById(id) {
            const element = document.getElementById(id);
            element.innerHTML = '';

            return element;
        },
        displayCards() {
            const low = this.settings.sortDirection === 'desc' ? -1 : 1;
            const high = this.settings.sortDirection === 'desc' ? 1 : -1;

            this.displayedItems = this.data.items
                .filter(item => !Object.keys(this.settings.selectedCategories).length || this.settings.selectedCategories.includes(item.categoryId))
                .filter(item => !this.settings.filterFavorites || this.settings.favoriteCards.includes(item.id))
                .filter(item => !this.searchTerm || item.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
                .sort((a, b) => (a[this.settings.sortField] > b[this.settings.sortField]) ? low : high);

            this.renderCards();
        },
        renderCards() {
            const targetElement = this.getClearedElementById('cards');

            const firstItem = (this.settings.currentPage * this.cardsPerPage) - this.cardsPerPage;
            const lastItem = firstItem + this.cardsPerPage;

            this.displayedItems
                .slice(firstItem, lastItem)
                .forEach(card => this.renderCard(targetElement, card));
        },
        renderCard(targetElement, card) {
            const element = this.appendCard(targetElement, card);
            const favoriteButtons = element.getElementsByClassName('favorite');
            Array.prototype.forEach.call(favoriteButtons, element => this.addtoggleFavoriteListener(element));
        },
        addtoggleFavoriteListener(element) {
            element.addEventListener('click', e => this.toggleFavorite(e.target.tagName === 'IMG' ? e.target.parentElement.value : e.target.value));
        },
        appendCard(targetElement, card) {
            const template = this.cardTemplate(card);
            const parent = document.createElement('div');
            parent.className = 'card shadow rounded bg-white';
            parent.innerHTML = template;
            return targetElement.appendChild(parent);
        },
        renderMenuItems() {
            const targetElement = this.getClearedElementById('main-nav');
            const numberOfMenuItems = Math.ceil(Object.keys(this.displayedItems).length / this.cardsPerPage);

            for (let i = 1; i <= numberOfMenuItems; i++) {
                const menuItem = {
                    id: i,
                    title: `Page ${i}`,
                    active: i === this.settings.currentPage,
                };

                const element = this.appendMenuItem(targetElement, menuItem);

                element.addEventListener('click', e => this.onMenuClick(e));
            }
        },
        appendMenuItem(targetElement, menuItem) {
            const className = menuItem.active ? 'active' : '';
            const template = `<a href="#" title="View ${menuItem.title}" data-page="${menuItem.id}" class="${className}">${menuItem.title}</a>`;
            const li = document.createElement('li');
            li.innerHTML = template;
            return targetElement.appendChild(li);
        },
        renderCategoryCheckboxes() {
            const targetElement = this.getClearedElementById('categories');
            this.data.categories.forEach(category => this.renderCategoryCheckbox(targetElement, category));
        },
        renderCategoryCheckbox(targetElement, category) {
            const checked = this.settings.selectedCategories.includes(category.id);
            const element = this.appendCheckbox(targetElement, category.id, `${category.title} (${category.itemCount})`, checked);

            element.addEventListener('change', e => this.onCategoryChange(e));
        },
        renderFavoriteCheckbox() {
            const targetElement = this.getClearedElementById('favorites');
            const favoriteCount = Object.keys(this.settings.favoriteCards).length;
            const element = this.appendCheckbox(targetElement, 'favorite', `Favorites (${favoriteCount})`, this.settings.filterFavorites);

            element.addEventListener('change', e => this.onFavoriteChange(e));
        },
        appendCheckbox(targetElement, value, label, checked) {
            const checkbox = this.checkboxTemplate(value, label, checked);
            const html = document.createElement('div');
            html.className = 'checkbox shadow rounded bg-white';
            html.innerHTML = checkbox;

            return targetElement.appendChild(html);
        },
        cardTemplate(card) {
            const category = this.data.categories.find(category => category.id === card.categoryId);
            const favoriteImage = this.settings.favoriteCards.includes(card.id) ? './assets/img/heart-solid.svg' : './assets/img/heart-regular.svg';

            return `
            <div class="image">
                <img src="${card.img}" alt="${card.title}">
            </div>
            <div class="content">
                <span class="number bg-gray">${card.id}</span>
                <div class="content-inner">
                    <h3>${card.title}</h3>
                </div>
                <div class="category bg-gray">
                    ${category.title}
                    <button class="favorite" title="Like!" value="${card.id}">
                        <img src="${favoriteImage}" alt="Like!">
                    </button>
                </div>
            </div>
        `;
        },
        checkboxTemplate(value, label, checked) {
            checked = checked ? 'checked' : '';

            return `<label for="checkbox-${value}">
               <input type="checkbox" value="${value}" id="checkbox-${value}" ${checked}>
               ${label}
            </label>`;
        },
        onMenuClick(e) {
            this.setCurrentPage(e.target.getAttribute('data-page'));
        },
        onCategoryChange() {
            const selectedCategories = [];
            const inputs = document.getElementById('categories').getElementsByTagName('input');

            Array.prototype.slice.call(inputs).forEach(input => input.checked ? selectedCategories.push(parseInt(input.value)) : null);

            this.updateSetting('selectedCategories', selectedCategories);
            this.setCurrentPage(1);
            this.redraw();
        },
        onFavoriteChange(e) {
            this.updateSetting('filterFavorites', e.target.checked);
            this.setCurrentPage(1);
            this.redraw();
        },
        onSortChange(e) {
            const sort = e.target.value.split('_');

            this.updateSetting('sortField', sort[0]);
            this.updateSetting('sortDirection', sort[1]);

            this.setCurrentPage(1);
            this.redraw();
        },
        searchItems(e) {
            this.searchTerm = e.target.value;
            this.setCurrentPage(1);
            this.redraw();
        },
        toggleFavorite(id) {
            let favoriteCards = this.settings.favoriteCards;
            id = parseInt(id);

            if (favoriteCards.includes(id)) {
                favoriteCards = favoriteCards.filter(e => e !== id)
            } else {
                favoriteCards.push(id);
            }

            this.updateSetting('favoriteCards', favoriteCards);

            this.redraw();
        },
        debounce(func, timeout = 3000) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args);
                }, timeout);
            };
        },
    }

    window.collection = collection;
    window.collection.init();

})();