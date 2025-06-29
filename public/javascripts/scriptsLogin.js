document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', OnClicklogin);
});

async function OnClicklogin() {
    const loginInput = document.getElementById('user_name');
    const passwordInput = document.getElementById('user_pass');
    const loginError = document.getElementById('login-error');
    const passwordError = document.getElementById('password-error');

    // Сбрасываем предыдущие сообщения об ошибках
    loginError.textContent = '';
    passwordError.textContent = '';
    loginInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');

    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();

    let isValid = true;

    // Валидация логина
    if (!login) {
        loginError.textContent = 'Пожалуйста, введите логин';
        loginInput.classList.add('is-invalid');
        isValid = false;
    }

    // Валидация пароля
    if (!password) {
        passwordError.textContent = 'Пожалуйста, введите пароль';
        passwordInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login, password})
        });

        const data = await response.json();

        if (data.success) {
            // Сохраняем данные пользователя в localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            // Перенаправляем на страницу клиентов
            window.location.href = '/client';
        } else {
            // Обработка ошибок сервера
            if (data.field === 'login') {
                loginError.textContent = data.message || 'Логин введен неверно. Попробуйте снова или обратитесь к администратору';
                loginInput.classList.add('is-invalid');
            } else if (data.field === 'password') {
                passwordError.textContent = data.message || 'Пароль введен неверно. Попробуйте снова или обратитесь к администратору';
                passwordInput.classList.add('is-invalid');
            } else {
                alert(data.message || 'Ошибка авторизации');
            }
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
        alert('Ошибка сети: ' + error.message);
    }
}