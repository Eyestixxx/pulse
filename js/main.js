function initBurger() {
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');

    if (!burger || !nav) return;

    burger.addEventListener('click', function () {
        nav.classList.toggle('header__nav--open');
    });
}

function initRegistration() {
    const form = document.getElementById('registrationForm');
    const message = document.getElementById('formMessage');

    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;
        const passwordRepeat = form.passwordRepeat.value;
        const agree = form.agree.checked;

        if (!name || !email || !password || !passwordRepeat) {
            message.textContent = 'Заполните все поля';
            return;
        }

        if (!email.includes('@')) {
            message.textContent = 'Email должен содержать @';
            return;
        }

        if (password.length < 6) {
            message.textContent = 'Пароль должен быть не меньше 6 символов';
            return;
        }

        if (password !== passwordRepeat) {
            message.textContent = 'Пароли не совпадают';
            return;
        }

        if (!agree) {
            message.textContent = 'Нужно согласиться с обработкой данных';
            return;
        }

        localStorage.setItem('pulseUserName', name);
        localStorage.setItem('pulseUserEmail', email);
        message.style.color = '#8ef5a5';
        message.textContent = 'Регистрация выполнена. Теперь можно войти.';
    });
}

function initLogin() {
    const form = document.getElementById('loginForm');
    const message = document.getElementById('loginMessage');

    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = form.email.value.trim();
        const password = form.password.value;

        if (!email || !password) {
            message.textContent = 'Введите email и пароль';
            return;
        }

        if (!email.includes('@')) {
            message.textContent = 'Email должен содержать @';
            return;
        }

        if (password.length < 6) {
            message.textContent = 'Пароль должен быть не меньше 6 символов';
            return;
        }

        localStorage.setItem('pulseUserName', 'Алина');
        localStorage.setItem('pulseUserEmail', email);
        message.style.color = '#8ef5a5';
        message.textContent = 'Вход выполнен';
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const message = document.getElementById('contactMessage');

    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!form.name.value.trim() || !form.email.value.trim() || !form.message.value.trim()) {
            message.textContent = 'Заполните все поля';
            return;
        }

        if (!form.email.value.includes('@')) {
            message.textContent = 'Email должен содержать @';
            return;
        }

        message.style.color = '#8ef5a5';
        message.textContent = 'Сообщение отправлено';
        form.reset();
    });
}

function initAccount() {
    const name = localStorage.getItem('pulseUserName');
    const email = localStorage.getItem('pulseUserEmail');
    const nameElement = document.getElementById('accountName');
    const emailElement = document.getElementById('accountEmail');

    if (nameElement && name) nameElement.textContent = name;
    if (emailElement && email) emailElement.textContent = email;
}

initBurger();
if (typeof renderHomeProducts === 'function') renderHomeProducts();
if (typeof renderAllProducts === 'function') renderAllProducts();
if (typeof renderCart === 'function') renderCart();
if (typeof updateCartCount === 'function') updateCartCount();
initRegistration();
initLogin();
initContactForm();
initAccount();
