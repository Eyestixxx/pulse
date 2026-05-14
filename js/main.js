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

        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        message.style.color = '#8ef5a5';
        message.textContent = 'Регистрация выполнена';
    });
}

function initAccount() {
    localStorage.removeItem('cartCount');
}


initBurger();
if (typeof renderHomeProducts === 'function') renderHomeProducts();
if (typeof renderAllProducts === 'function') renderAllProducts();
initRegistration();
initAccount();
