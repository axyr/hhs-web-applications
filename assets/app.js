const cards         = [];
const menuItems     = [];
const amountOfCards = 13;
const cardsPerPage  = 5;

let currentPage   = 1;
let sortDirection = 'asc';

function init() {
    setPageTitle();
    renderMenuItems();
    createCards();
    renderCards();

    document.getElementById('sort').addEventListener('change', setSortDirection);
}

function setPageTitle() {
    document.getElementsByTagName('title')[0].text = `Page ${currentPage} - Books`;
}

function setSortDirection() {
    sortDirection = document.getElementById('sort').value;
    renderCards();
}

function createCards() {
    for (let i = 1; i <= 13; i++) {
        const card = {
            id: i,
            title: `Book ${i}`,
            category: 'Category',
        };
        cards.push(card);
    }
}

function renderCards() {
    const targetElement = getClearedElementById('cards');

    const firstItem = (currentPage * cardsPerPage) - cardsPerPage;
    const lastItem  = firstItem + cardsPerPage;

    if (sortDirection === 'desc') {
        cards.sort((a, b) => (a.id > b.id) ? -1 : 1);
    } else {
        cards.sort((a, b) => (a.id > b.id) ? 1 : -1);
    }

    cards.slice(firstItem, lastItem).forEach(function (card) {
        appendCard(targetElement, card);
    });
}

function appendCard(targetElement, card) {
    const template = cardTemplate(card);
    const html     = document.createElement('div');
    html.className = 'card-holder';
    html.innerHTML = template;
    targetElement.appendChild(html);
}

function cardTemplate(card) {
    return `<div class="card" data-id="${card.id}">
            <img src="https://picsum.photos/150" alt="placeholder">
            <div class="content">
                <span class="number">${card.id}</span>
                <div class="content-inner">
                    <h3>${card.title}</h3>
                </div>
                <div class="category">
                    ${card.category}
                </div>
            </div>
        </div>`;
}

function renderMenuItems() {
    const targetElement     = getClearedElementById('main-nav');
    const numberOfMenuItems = Math.ceil(amountOfCards / cardsPerPage);

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

function handleMenuClick(e) {
    currentPage = parseInt(e.target.getAttribute('data-page'));

    setPageTitle();
    renderMenuItems();
    renderCards();
}

function getClearedElementById(id) {
    const element     = document.getElementById(id);
    element.innerHTML = '';

    return element
}

init();