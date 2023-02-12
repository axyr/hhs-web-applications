(function () {

    const cards         = [];
    const amountOfCards = 13;
    const cardsPerPage  = 5;
    const categories    = [
        'Category A',
        'Category B',
        'Category C',
    ];

    let data = {
        currentPage: 1,
        sortDirection: 'asc',
        filterFavorites: false,
        selectedCategories: [],
        selectedCards: [],
        favoriteCards: [],
    };

    function setData(key, value) {
        data[key] = value;
        window.localStorage.setItem('data', JSON.stringify(data));
    }

    function loadDataFromLocalStorage() {
        const dataFromLocalStorage = window.localStorage.getItem('data');
        if(dataFromLocalStorage) {
            data = JSON.parse(dataFromLocalStorage);
        }
    }

    function init() {
        loadDataFromLocalStorage();
        createCards();
        redraw();

        document.getElementById('logo').addEventListener('click', toToHomepage);
        document.getElementById('sort').addEventListener('change', handleSortChange);
    }

    function setPageTitle() {
        document.getElementsByTagName('title')[0].text = `Page ${data.currentPage} - Books`;
    }

    function toToHomepage() {
        setData('selectedCategories', []);
        setCurrentPage(1);
    }

    function setCurrentPage(page) {
        setData('currentPage', parseInt(page));
        redraw();
    }

    function getRandomCategoryId() {
        return Math.floor(Math.random() * Object.keys(categories).length);
    }

    function getClearedElementById(id) {
        const element     = document.getElementById(id);
        element.innerHTML = '';

        return element;
    }

    function createCards() {
        for (let i = 1; i <= amountOfCards; i++) {
            const card = {
                id: i,
                title: `Book ${i}`,
                categoryId: getRandomCategoryId(),
            };
            cards.push(card);
        }
    }

    function selectCards() {

        const low  = data.sortDirection === 'desc' ? -1 : 1;
        const high = data.sortDirection === 'desc' ? 1 : -1;

        data.selectedCards = cards
            .filter(card => !Object.keys(data.selectedCategories).length || data.selectedCategories.includes(card.categoryId))
            .filter(card => !data.filterFavorites || data.favoriteCards.includes(card.id))
            .sort((a, b) => (a.id > b.id) ? low : high);

        renderCards();
    }

    function renderCards() {
        const targetElement = getClearedElementById('cards');

        const firstItem = (data.currentPage * cardsPerPage) - cardsPerPage;
        const lastItem  = firstItem + cardsPerPage;

        data.selectedCards
            .slice(firstItem, lastItem)
            .forEach(function (card) {
                const element         = appendCard(targetElement, card);
                const favoriteButtons = element.getElementsByClassName('favorite');
                Array.prototype.forEach.call(favoriteButtons, function (element) {
                    element.addEventListener('click', function (e) {
                        toggleFavorite(e.target.tagName === 'IMG' ? e.target.parentElement.value : e.target.value);
                    });
                });
            });
    }

    function appendCard(targetElement, card) {
        const template   = cardTemplate(card);
        const parent     = document.createElement('div');
        parent.className = 'card shadow rounded bg-white';
        parent.innerHTML = template;
        return targetElement.appendChild(parent);
    }

    function renderMenuItems() {
        const targetElement     = getClearedElementById('main-nav');
        const numberOfMenuItems = Math.ceil(Object.keys(data.selectedCards).length / cardsPerPage);

        for (let i = 1; i <= numberOfMenuItems; i++) {
            const menuItem = {
                id: i,
                title: `Page ${i}`,
                active: i === data.currentPage,
            };

            const element = appendMenuItem(targetElement, menuItem);
            element.addEventListener('click', handleMenuClick);
        }
    }

    function appendMenuItem(targetElement, menuItem) {
        const className = menuItem.active ? 'active' : '';
        const template  = `<a href="#" title="View ${menuItem.title}" data-page="${menuItem.id}" class="${className}">${menuItem.title}</a>`;
        const li        = document.createElement('li');
        li.innerHTML    = template;
        return targetElement.appendChild(li);
    }

    function renderCategoryCheckboxes() {
        const targetElement = getClearedElementById('categories');
        categories.forEach(function (category, index) {
            const checked = data.selectedCategories.includes(index);
            const element = appendCheckbox(targetElement, index, category, checked);
            element.addEventListener('change', handleCategoryChange);
        });
    }

    function renderFavoriteCheckbox() {
        const targetElement = getClearedElementById('favorites');
        const favoriteCount = Object.keys(data.favoriteCards).length;
        const element       = appendCheckbox(targetElement, 'favorite', `Favorites (${favoriteCount})`, data.filterFavorites);
        element.addEventListener('change', handleFavoriteChange);
    }

    function appendCheckbox(targetElement, value, label, checked) {
        const checkbox = checkboxTemplate(value, label, checked);
        const html     = document.createElement('div');
        html.className = 'checkbox shadow rounded bg-white';
        html.innerHTML = checkbox;
        return targetElement.appendChild(html);
    }

    function cardTemplate(card) {
        const category = categories[card.categoryId];

        const favoriteImage = data.favoriteCards.includes(card.id) ? './assets/img/heart-solid.svg' : './assets/img/heart-regular.svg';
        return `
            <img src="https://picsum.photos/300/150" alt="placeholder">
            <div class="content">
                <span class="number bg-gray">${card.id}</span>
                <div class="content-inner">
                    <h3>${card.title}</h3>
                </div>
                <div class="category bg-gray">
                    ${category}
                    <button class="favorite" title="Like!" value="${card.id}">
                        <img src="${favoriteImage}" alt="Like!">
                    </button>
                </div>
            </div>
        `;
    }

    function checkboxTemplate(value, label, checked) {
        checked = checked ? 'checked' : '';
        return `<label for="checkbox-${value}">
           <input type="checkbox" value="${value}" id="checkbox-${value}" ${checked}>
           ${label}
        </label>`;
    }

    function handleMenuClick(e) {
        setCurrentPage(e.target.getAttribute('data-page'));
    }

    function handleCategoryChange() {
        const selectedCategories = [];

        const inputs = document.getElementById('categories').getElementsByTagName('input');

        Array.prototype.slice.call(inputs).forEach(function (input) {
            if (input.checked) {
                selectedCategories.push(parseInt(input.value));
            }
        });

        setData('selectedCategories', selectedCategories);

        setCurrentPage(1);
        redraw();
    }

    function handleFavoriteChange(e) {
        setData('filterFavorites', e.target.checked);
        setCurrentPage(1);
        redraw();
    }

    function handleSortChange() {
        setData('sortDirection', document.getElementById('sort').value);
        setCurrentPage(1);
        redraw();
    }

    function toggleFavorite(id) {
        let favoriteCards = data.favoriteCards;
        id = parseInt(id);

        if (favoriteCards.includes(id)) {
            favoriteCards = favoriteCards.filter(e => e !== id)
        } else {
            favoriteCards.push(id);
        }

        setData('favoriteCards', favoriteCards);

        redraw();
    }

    function redraw() {
        renderCategoryCheckboxes();
        renderFavoriteCheckbox();
        selectCards();
        setPageTitle();
        renderMenuItems();
    }

    init();

})();