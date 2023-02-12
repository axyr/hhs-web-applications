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
let selectedCategories = [];
let selectedCards      = [];

function init() {
    renderCategories();
    createCards();
    redraw();

    document.getElementById('logo').addEventListener('click', setCurrentPage);
    document.getElementById('sort').addEventListener('change', handleSortChange);
}

function setPageTitle() {
    document.getElementsByTagName('title')[0].text = `Page ${currentPage} - Books`;
}

function setCurrentPage(page) {
    page = parseInt(page);

    currentPage = Number.isNaN(page) ? 1 : page;

    redraw();
}

function getRandomCategoryId() {
    return Math.floor(Math.random() * categories.length);
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

    const low  = sortDirection === 'desc' ? -1 : 1;
    const high = sortDirection === 'desc' ? 1 : -1;

    selectedCards = cards
        .filter(card => !selectedCategories.length || typeof selectedCategories[card.categoryId] !== 'undefined')
        .sort((a, b) => (a.id > b.id) ? low : high);

    renderCards();
}

function renderCards() {
    const targetElement = getClearedElementById('cards');

    const firstItem = (currentPage * cardsPerPage) - cardsPerPage;
    const lastItem  = firstItem + cardsPerPage;

    selectedCards
        .slice(firstItem, lastItem)
        .forEach(card => appendCard(targetElement, card));
}

function appendCard(targetElement, card) {
    const template = cardTemplate(card);
    const parent     = document.createElement('div');
    parent.className = 'card shadow rounded bg-white';
    parent.innerHTML = template;
    targetElement.appendChild(parent);
}

function renderMenuItems() {
    const targetElement     = getClearedElementById('main-nav');
    const numberOfMenuItems = Math.ceil(selectedCards.length / cardsPerPage);

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

function renderCategories() {
    const targetElement = getClearedElementById('categories');
    categories.forEach(function (category, index) {
        const element = appendCategory(targetElement, index, category);
        element.addEventListener('change', handleCategoryChange);
    });
}

function appendCategory(targetElement, index, category) {
    const checkbox = checkboxTemplate(index, category);
    const html     = document.createElement('div');
    html.className = 'checkbox shadow rounded bg-white';
    html.innerHTML = checkbox;
    return targetElement.appendChild(html);
}

function cardTemplate(card) {
    const category = categories[card.categoryId];
    return `
            <img src="https://picsum.photos/300/150" alt="placeholder">
            <div class="content">
                <span class="number bg-gray">${card.id}</span>
                <div class="content-inner">
                    <h3>${card.title}</h3>
                </div>
                <div class="category bg-gray">
                    ${category}
                </div>
            </div>
        `;
}

function checkboxTemplate(index, title) {
    return `<label for="category-${index}">
       <input type="checkbox" value="${index}" id="category-${index}">
       ${title}
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
            selectedCategories[input.value] = input.value;
        }
    });
    setCurrentPage(1);
    redraw();
}

function handleSortChange() {
    sortDirection = document.getElementById('sort').value;
    setCurrentPage(1);
    redraw();
}

function redraw() {
    selectCards();
    setPageTitle();
    renderMenuItems();
}

init();