const products = [
    { name: 'CHAOS T-shirt', price: '1 790 ₽', image: 'img/product-chaos-tshirt.png', text: 'Футболка с ангельским принтом' },
    { name: 'PULSE Hoodie', price: '3 490 ₽', image: 'img/product-pulse-hoodie.png', text: 'Худи с крупной графикой на спине' },
    { name: 'PULSE Cap', price: '1 290 ₽', image: 'img/product-pulse-cap.png', text: 'Чёрная кепка с красным акцентом' },
    { name: 'PULSE Tote Bag', price: '990 ₽', image: 'img/product-tote.png', text: 'Шопер с тёмным принтом' },
    { name: 'PULSE Bottle', price: '1 490 ₽', image: 'img/product-bottle.png', text: 'Бутылка в стиле коллекции' },
    { name: 'PULSE Boots', price: '5 990 ₽', image: 'img/product-boots.png', text: 'Высокие ботинки с ремнями' },
    { name: 'PULSE Pants', price: '3 990 ₽', image: 'img/product-jeans.png', text: 'Чёрные штаны с цепочкой' },
    { name: 'PULSE Necklace', price: '1 190 ₽', image: 'img/product-necklace.png', text: 'Подвеска с линией пульса' }
];

function createProductCard(product) {
    return `
        <article class="product-card">
            <img class="product-card__image" src="${product.image}" alt="${product.name}">
            <h3 class="product-card__name">${product.name}</h3>
            <p class="product-card__description">${product.text}</p>
            <p class="product-card__price">${product.price}</p>
            <button class="product-card__button" type="button">Купить</button>
        </article>
    `;
}

function addBuyEvents() {
    const buttons = document.querySelectorAll('.product-card__button');

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            button.textContent = 'Добавлено';
        });
    });
}

function renderHomeProducts() {
    const homeBlock = document.getElementById('homeProducts');
    const showMoreBtn = document.getElementById('showMoreBtn');

    if (!homeBlock) return;

    let isOpen = false;
    homeBlock.innerHTML = products.slice(0, 4).map(createProductCard).join('');
    addBuyEvents();

    showMoreBtn.addEventListener('click', function () {
        isOpen = !isOpen;

        if (isOpen) {
            homeBlock.innerHTML = products.map(createProductCard).join('');
            showMoreBtn.textContent = 'Скрыть товары';
        } else {
            homeBlock.innerHTML = products.slice(0, 4).map(createProductCard).join('');
            showMoreBtn.textContent = 'Показать больше';
        }

        addBuyEvents();
    });
}

function renderAllProducts() {
    const allBlock = document.getElementById('allProducts');
    const searchInput = document.getElementById('searchInput');

    if (!allBlock) return;

    function draw(list) {
        allBlock.innerHTML = list.map(createProductCard).join('');
        addBuyEvents();
    }

    draw(products);

    searchInput.addEventListener('input', function () {
        const value = searchInput.value.toLowerCase();
        const filtered = products.filter(function (product) {
            return product.name.toLowerCase().includes(value);
        });
        draw(filtered);
    });
}
