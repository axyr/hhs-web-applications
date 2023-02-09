const cards        = [];
const menuItems    = [];
const itemsPerPage = 5;
let currentPage    = 1;

for (let i = 1; i <= 13; i++) {
    cards.push({
        id: i,
        title: `Book ${i}`,
        category: 'Category',
    },);
}

const numberOfMenuItems = Math.ceil(cards.length / itemsPerPage);

for (let i = 1; i <= numberOfMenuItems; i++) {
    menuItems.push({
        id: i,
        title: `Page ${i}`,
        active: i === currentPage,
    });
}

function addMenuItem(i) {
    const title     = `Page ${i}`;
    const className = i === currentPage ? 'active' : '';
    const template  = `<a href="#" title="View ${title}" data-page="${i}" class="${className}">${title}</a>`;
    const li        = document.createElement('li');
    li.innerHTML    = template;

    menuItem.addEventListener('click', setActiveMenuItem);
    return document.getElementById('main-nav').appendChild(li);
}

function setActiveMenuItem(e) {
    currentPage = e.target.getAttribute('data-page');
    setPage();
    return false;
}

function setPage() {

}

menuItems.forEach(function (menuItem) {
    const className = menuItem.active ? 'active':';'
    const template  = `<a href="#" title="View ${menuItem.title}" data-page="${menuItem.id}" class="${className}">${menuItem.title}</a>`;
    const li        = document.createElement('li');
    li.innerHTML    = template;
    return document.getElementById('main-nav').appendChild(li);
});

cards.forEach(function (card) {
    const template = cardTemplate(card);
    const html     = document.createElement('div');
    html.className = 'card-holder';
    html.innerHTML = template;
    document.getElementById('cards').appendChild(html);
});

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
