const products = [
    { id: 'chaos-tshirt', name: 'CHAOS T-shirt', price: '1 790 ₽', priceValue: 1790, image: 'img/product-chaos-tshirt.png', text: 'Футболка с ангельским принтом' },
    { id: 'pulse-hoodie', name: 'PULSE Hoodie', price: '3 490 ₽', priceValue: 3490, image: 'img/product-pulse-hoodie.png', text: 'Худи с крупной графикой на спине' },
    { id: 'pulse-cap', name: 'PULSE Cap', price: '1 290 ₽', priceValue: 1290, image: 'img/product-pulse-cap.png', text: 'Чёрная кепка с красным акцентом' },
    { id: 'pulse-tote', name: 'PULSE Tote Bag', price: '990 ₽', priceValue: 990, image: 'img/product-tote.png', text: 'Шопер с тёмным принтом' },
    { id: 'pulse-bottle', name: 'PULSE Bottle', price: '1 490 ₽', priceValue: 1490, image: 'img/product-bottle.png', text: 'Бутылка в стиле коллекции' },
    { id: 'pulse-boots', name: 'PULSE Boots', price: '5 990 ₽', priceValue: 5990, image: 'img/product-boots.png', text: 'Высокие ботинки с ремнями' },
    { id: 'pulse-pants', name: 'PULSE Pants', price: '3 990 ₽', priceValue: 3990, image: 'img/product-jeans.png', text: 'Чёрные штаны с цепочкой' },
    { id: 'pulse-necklace', name: 'PULSE Necklace', price: '1 190 ₽', priceValue: 1190, image: 'img/product-necklace.png', text: 'Подвеска с линией пульса' }
];

function createProductCard(product) {
    return `
        <article class="product-card">
            <img class="product-card__image" src="${product.image}" alt="${product.name}">
            <h3 class="product-card__name">${product.name}</h3>
            <p class="product-card__description">${product.text}</p>
            <p class="product-card__price">${product.price}</p>
            <button class="product-card__button" type="button" data-product-id="${product.id}">Купить</button>
        </article>
    `;
}

function getCart() {
    return JSON.parse(localStorage.getItem('pulseCart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('pulseCart', JSON.stringify(cart));
}

function updateCartCount() {
    const countElement = document.getElementById('cartCount');
    if (!countElement) return;

    const count = getCart().reduce(function (sum, item) {
        return sum + item.quantity;
    }, 0);

    countElement.textContent = count;
}

function addToCart(productId) {
    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (!product) return;

    const cart = getCart();
    const cartItem = cart.find(function (item) {
        return item.id === productId;
    });

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ id: product.id, quantity: 1 });
    }

    saveCart(cart);
    updateCartCount();
}

function addBuyEvents() {
    const buttons = document.querySelectorAll('.product-card__button');

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            addToCart(button.dataset.productId);
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

    if (!showMoreBtn) return;

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

    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
        const value = searchInput.value.toLowerCase();
        const filtered = products.filter(function (product) {
            return product.name.toLowerCase().includes(value);
        });
        draw(filtered);
    });
}

function renderCart() {
    const cartBlock = document.getElementById('cartContent');
    if (!cartBlock) return;

    const cart = getCart();

    if (cart.length === 0) {
        cartBlock.innerHTML = `
            <div class="cart__empty">
                <p>Корзина пока пустая.</p>
                <a class="cart__button" href="products.html">Перейти в каталог</a>
            </div>
        `;
        updateCartCount();
        return;
    }

    let total = 0;
    const items = cart.map(function (cartItem) {
        const product = products.find(function (item) {
            return item.id === cartItem.id;
        });

        if (!product) return '';
        total += product.priceValue * cartItem.quantity;

        return `
            <article class="cart__item">
                <img class="cart__image" src="${product.image}" alt="${product.name}">
                <div class="cart__info">
                    <h2 class="cart__title">${product.name}</h2>
                    <p class="cart__text">${product.text}</p>
                    <p class="cart__price">${product.price} × ${cartItem.quantity}</p>
                </div>
                <button class="cart__remove" type="button" data-product-id="${product.id}">Удалить</button>
            </article>
        `;
    }).join('');

    cartBlock.innerHTML = `
        <div class="cart__list">${items}</div>
        <div class="cart__summary">
            <p class="cart__total">Итого: ${total.toLocaleString('ru-RU')} ₽</p>
            <button class="cart__button" type="button" id="clearCartBtn">Очистить корзину</button>
        </div>
    `;

    document.querySelectorAll('.cart__remove').forEach(function (button) {
        button.addEventListener('click', function () {
            const filtered = getCart().filter(function (item) {
                return item.id !== button.dataset.productId;
            });
            saveCart(filtered);
            renderCart();
        });
    });

    const clearButton = document.getElementById('clearCartBtn');
    clearButton.addEventListener('click', function () {
        saveCart([]);
        renderCart();
    });

    updateCartCount();
}
