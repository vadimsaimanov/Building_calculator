document.addEventListener('DOMContentLoaded', function() {
    // Инициализация модального окна
    const createClientModal = document.getElementById('createClientModal');
    if (createClientModal) {
        createClientModal.addEventListener('show.bs.modal', function() {
            // Сброс формы при открытии модального окна
            resetClientForm();
        });
    }
});

function resetClientForm() {
    const fields = ['lastName', 'firstName', 'middleName', 'phone', 'email', 'address'];
    fields.forEach(field => {
        const input = document.getElementById(field);
        const error = document.getElementById(`${field}-error`);
        if (input && error) {
            input.classList.remove('is-invalid');
            error.textContent = '';
        }
    });
}

async function OnClickSaveClient() {
    // Получаем значения полей
    const lastName = document.getElementById('lastName').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const middleName = document.getElementById('middleName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    // Сбрасываем все ошибки перед новой проверкой
    resetClientForm();

    let isValid = true;

    // Валидация фамилии (обязательное поле, без цифр и спецсимволов)
    if (!lastName) {
        showError('lastName', 'Пожалуйста, введите фамилию');
        isValid = false;
    } else if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(lastName)) {
        showError('lastName', 'Фамилия не должна содержать цифры или специальные символы');
        isValid = false;
    }

    // Валидация имени (обязательное поле, без цифр и спецсимволов)
    if (!firstName) {
        showError('firstName', 'Пожалуйста, введите имя');
        isValid = false;
    } else if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(firstName)) {
        showError('firstName', 'Имя не должно содержать цифры или специальные символы');
        isValid = false;
    }

    // Валидация отчества (обязательное поле, без цифр и спецсимволов)
    if (!middleName) {
        showError('middleName', 'Пожалуйста, введите отчество');
        isValid = false;
    } else if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(middleName)) {
        showError('middleName', 'Отчество не должно содержать цифры или специальные символы');
        isValid = false;
    }

    // Валидация телефона (обязательное поле, только цифры и допустимые символы)
    if (!phone) {
        showError('phone', 'Пожалуйста, введите телефон');
        isValid = false;
    } else if (/[a-zA-Zа-яА-Я]/.test(phone)) {
        showError('phone', 'Телефон не должен содержать буквы');
        isValid = false;
    } else if (!/^[\d\s\-\+\(\)]+$/.test(phone)) {
        showError('phone', 'Телефон содержит недопустимые символы');
        isValid = false;
    }

    // Валидация email (обязательное поле, проверка формата)
    if (!email) {
        showError('email', 'Пожалуйста, введите email');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Пожалуйста, введите корректный email (например, user@example.com)');
        isValid = false;
    }

    // Валидация адреса (обязательное поле, без дополнительных проверок)
    if (!address) {
        showError('address', 'Пожалуйста, введите адрес');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const managerId = 1; // ID менеджера, который добавляет клиента

    try {
        const response = await fetch('/client/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lastName,
                firstName,
                middleName,
                phone,
                email,
                address,
                managerId
            })
        });

        const data = await response.json();

        if (data.success) {
            // Закрываем модальное окно
            const modal = bootstrap.Modal.getInstance(document.getElementById('createClientModal'));
            modal.hide();

            // Обновляем страницу
            window.location.reload();
        } else {
            console.log('Невозможно добавить клиента:', data.message);
            alert('Невозможно добавить клиента: ' + data.message);
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
        alert('Ошибка сети: ' + error.message);
    }
}

function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);

    if (input && error) {
        input.classList.add('is-invalid');
        error.textContent = message;
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    // Более гибкая проверка номера телефона
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(phone));
}

function goBack() {
    if (window.location.pathname.includes('/client/') || window.location.pathname.includes('/carcas')) {
        // Если пользователь на странице каркаса, возвращаем его на страницу карточки клиента
        const clientId = window.location.pathname.split('/')[2];
        window.location.href = `/client/${clientId}`;
    } else if (window.location.pathname === '/client') {
        localStorage.removeItem('user');
        window.location.href = '/login';
    } else {
        window.history.back();
    }
}

function openClientCard(clientId) {
    window.location.href = `/client/${clientId}`;
}

function onLoadClientCard() {
    const name = document.getElementById('name');
    const status = document.getElementById('user-status');

    const localUser = localStorage.getItem('user');
    if (!localUser) {
        window.location.href = '/login';
    } else {
        const user = JSON.parse(localUser);
        name.innerHTML = `${user.first_name} ${user.last_name}`;
        status.innerText = user.status;
    }
}