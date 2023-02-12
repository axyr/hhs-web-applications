(function () {

    const cardsPerPage = 5;

    const collection = './collections/books/index.json';

    const data = {
        items: [],
        categories: [],
    };

    let displayedItems = [];

    let settings = {
        currentPage: 1,
        sortDirection: 'asc',
        filterFavorites: false,
        selectedCategories: [],
        favoriteCards: [],
    };

    function updateSetting(key, value) {
        settings[key] = value;
        window.localStorage.setItem('settings', JSON.stringify(settings));
    }

    function loadSettingsFromLocalStorage() {
        const settingsFromLocalStorage = window.localStorage.getItem('settings');
        if (settingsFromLocalStorage) {
            const settingsObject = JSON.parse(settingsFromLocalStorage);

            for (const [key, value] of Object.entries(settingsObject)) {
                if (settings.hasOwnProperty(key)) {
                    settings[key] = value;
                }
            }
        }
    }

    function fetchItems() {
        fetch(collection).then(response => {
            return response.json();
        }).catch(error => {
            console.log(error);
            console.log('Could not load items');
        }).then(json => {
            data.items      = json.items;
            data.categories = json.categories;

            data.items.forEach(function (item) {
                data.categories.forEach(function (category) {
                    if (item.categoryId === category.id) {
                        category.itemCount++;
                    }
                });
            });

            redraw();
        });
    }

    function init() {
        loadSettingsFromLocalStorage();
        fetchItems();

        document.getElementById('logo').addEventListener('click', toToHomepage);
        document.getElementById('sort').addEventListener('change', handleSortChange);
    }

    function setPageTitle() {
        document.getElementsByTagName('title')[0].text = `Page ${settings.currentPage} - Books`;
    }

    function toToHomepage() {
        updateSetting('selectedCategories', []);
        setCurrentPage(1);
    }

    function setCurrentPage(page) {
        updateSetting('currentPage', parseInt(page));
        redraw();
    }

    function getClearedElementById(id) {
        const element     = document.getElementById(id);
        element.innerHTML = '';

        return element;
    }

    function displayCards() {

        const low  = settings.sortDirection === 'desc' ? -1 : 1;
        const high = settings.sortDirection === 'desc' ? 1 : -1;

        displayedItems = data.items
            .filter(item => !Object.keys(settings.selectedCategories).length || settings.selectedCategories.includes(item.categoryId))
            .filter(item => !settings.filterFavorites || settings.favoriteCards.includes(item.id))
            .sort((a, b) => (a.id > b.id) ? low : high);

        renderCards();
    }

    function renderCards() {
        const targetElement = getClearedElementById('cards');

        const firstItem = (settings.currentPage * cardsPerPage) - cardsPerPage;
        const lastItem  = firstItem + cardsPerPage;

        displayedItems
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
        const numberOfMenuItems = Math.ceil(Object.keys(displayedItems).length / cardsPerPage);

        for (let i = 1; i <= numberOfMenuItems; i++) {
            const menuItem = {
                id: i,
                title: `Page ${i}`,
                active: i === settings.currentPage,
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

        data.categories.forEach(function (category) {
            const checked = settings.selectedCategories.includes(category.id);
            const element = appendCheckbox(targetElement, category.id, `${category.title} (${category.itemCount})`, checked);
            element.addEventListener('change', handleCategoryChange);
        });
    }

    function renderFavoriteCheckbox() {
        const targetElement = getClearedElementById('favorites');
        const favoriteCount = Object.keys(settings.favoriteCards).length;
        const element       = appendCheckbox(targetElement, 'favorite', `Favorites (${favoriteCount})`, settings.filterFavorites);
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
        const category      = data.categories.find(category => category.id === card.categoryId);
        const favoriteImage = settings.favoriteCards.includes(card.id) ? './assets/img/heart-solid.svg' : './assets/img/heart-regular.svg';

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

        updateSetting('selectedCategories', selectedCategories);

        setCurrentPage(1);
        redraw();
    }

    function handleFavoriteChange(e) {
        updateSetting('filterFavorites', e.target.checked);
        setCurrentPage(1);
        redraw();
    }

    function handleSortChange() {
        updateSetting('sortDirection', document.getElementById('sort').value);
        setCurrentPage(1);
        redraw();
    }

    function toggleFavorite(id) {
        let favoriteCards = settings.favoriteCards;
        id                = parseInt(id);

        if (favoriteCards.includes(id)) {
            favoriteCards = favoriteCards.filter(e => e !== id)
        } else {
            favoriteCards.push(id);
        }

        updateSetting('favoriteCards', favoriteCards);

        redraw();
    }

    function redraw() {
        renderCategoryCheckboxes();
        renderFavoriteCheckbox();
        displayCards();
        setPageTitle();
        renderMenuItems();
    }

    init();

})();