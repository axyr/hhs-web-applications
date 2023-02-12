(function () {

    const cards         = [];
    const menuItems     = [];
    const amountOfCards = 13;
    const cardsPerPage  = 5;
    const categories    = [
        'Category A',
        'Category B',
        'Category C',
    ];

    let currentPage        = 1;
    let sortDirection      = 'asc';
    let filterFavorites    = false;
    let selectedCategories = [];
    let selectedCards      = [];
    let favoriteCards      = [];

    function init() {
        createCards();
        redraw();

        document.getElementById('logo').addEventListener('click', toToHomepage);
        document.getElementById('sort').addEventListener('change', handleSortChange);
    }

    function setPageTitle() {
        document.getElementsByTagName('title')[0].text = `Page ${currentPage} - Books`;
    }

    function toToHomepage() {
        selectedCategories = [];
        setCurrentPage(1);
    }

    function setCurrentPage(page) {
        currentPage = parseInt(page);
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
            console.log(favoriteCards.includes(i));

            const card = {
                id: i,
                title: `Book ${i}`,
                categoryId: getRandomCategoryId(),
            };
            cards.push(card);
        }
    }

    function selectCards() {

        const low  = sortDirection === 'desc' ? -1 : 1;
        const high = sortDirection === 'desc' ? 1 : -1;

        selectedCards = cards
            .filter(card => !Object.keys(selectedCategories).length || selectedCategories.includes(card.categoryId))
            .filter(card => !filterFavorites || favoriteCards.includes(card.id))
            .sort((a, b) => (a.id > b.id) ? low : high);

        renderCards();
    }

    function renderCards() {
        const targetElement = getClearedElementById('cards');

        const firstItem = (currentPage * cardsPerPage) - cardsPerPage;
        const lastItem  = firstItem + cardsPerPage;

        selectedCards
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
        const numberOfMenuItems = Math.ceil(Object.keys(selectedCards).length / cardsPerPage);

        for (let i = 1; i <= numberOfMenuItems; i++) {
            const menuItem = {
                id: i,
                title: `Page ${i}`,
                active: i === currentPage,
            };
            menuItems.push(menuItem);
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
            const checked = selectedCategories.includes(index);
            const element = appendCheckbox(targetElement, index, category, checked);
            element.addEventListener('change', handleCategoryChange);
        });
    }

    function renderFavoriteCheckbox() {
        const targetElement = getClearedElementById('favorites');
        const favoriteCount = Object.keys(favoriteCards).length;
        const element       = appendCheckbox(targetElement, 'favorite', `Favorites (${favoriteCount})`, filterFavorites);
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

        const favoriteImage = favoriteCards.includes(card.id) ? './assets/img/heart-solid.svg' : './assets/img/heart-regular.svg';
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
        selectedCategories = [];

        const inputs = document.getElementById('categories').getElementsByTagName('input');

        Array.prototype.slice.call(inputs).forEach(function (input) {
            if (input.checked) {
                selectedCategories.push(parseInt(input.value));
            }
        });
        setCurrentPage(1);
        redraw();
    }

    function handleFavoriteChange(e) {
        filterFavorites = e.target.checked;
        setCurrentPage(1);
        redraw();
    }

    function handleSortChange() {
        sortDirection = document.getElementById('sort').value;
        setCurrentPage(1);
        redraw();
    }

    function toggleFavorite(id) {
        id = parseInt(id);

        if (favoriteCards.includes(id)) {
            favoriteCards = favoriteCards.filter(e => e !== id)
        } else {
            favoriteCards.push(id);
        }

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