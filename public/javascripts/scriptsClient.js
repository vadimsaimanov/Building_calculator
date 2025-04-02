document.addEventListener('DOMContentLoaded', function() {
    const createClientModal = document.getElementById('createClientModal');
    if (createClientModal) {
        createClientModal.addEventListener('show.bs.modal', function() {
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

function validateSaveClient() {
    const lastName = document.getElementById('lastName').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const middleName = document.getElementById('middleName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    resetClientForm();

    let isValid = true;

    // Валидация фамилии
    if (!lastName) {
        showError('lastName', 'Пожалуйста, введите фамилию');
        isValid = false;
    } else if (lastName.length < 2 || lastName.length > 50) {
        showError('lastName', 'Фамилия должна быть от 2 до 50 символов');
        isValid = false;
    } else if (/[0-9!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/.test(lastName.replace(/-/g, ''))) {
        showError('lastName', 'Фамилия содержит недопустимые символы');
        isValid = false;
    }

    // Валидация имени
    if (!firstName) {
        showError('firstName', 'Пожалуйста, введите имя');
        isValid = false;
    } else if (firstName.length < 2 || firstName.length > 50) {
        showError('firstName', 'Имя должно быть от 2 до 50 символов');
        isValid = false;
    } else if (/[0-9!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/.test(firstName.replace(/-/g, ''))) {
        showError('firstName', 'Имя содержит недопустимые символы');
        isValid = false;
    }

    // Валидация отчества
    if (!middleName) {
        showError('middleName', 'Пожалуйста, введите отчество');
        isValid = false;
    } else if (middleName.length < 2 || middleName.length > 50) {
        showError('middleName', 'Отчество должно быть от 2 до 50 символов');
        isValid = false;
    } else if (/[0-9!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/.test(middleName.replace(/-/g, ''))) {
        showError('middleName', 'Отчество содержит недопустимые символы');
        isValid = false;
    }

    // Валидация телефона
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phone) {
        showError('phone', 'Пожалуйста, введите телефон');
        isValid = false;
    } else if (cleanPhone.length < 10 || cleanPhone.length > 15) {
        showError('phone', 'Телефон должен содержать от 10 до 15 цифр');
        isValid = false;
    } else if (!/^[\d\s\-\+\(\)]+$/.test(phone)) {
        showError('phone', 'Телефон содержит недопустимые символы');
        isValid = false;
    }

    // Валидация email
    if (!email) {
        showError('email', 'Пожалуйста, введите email');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Пожалуйста, введите корректный email');
        isValid = false;
    }

    // Валидация адреса
    if (!address) {
        showError('address', 'Пожалуйста, введите адрес');
        isValid = false;
    }

    return {isValid, data: {lastName, firstName, middleName, cleanPhone, email, address}};
}
async function OnClickSaveClient() {


    const valid = validateSaveClient();
    const isValid = valid.isValid;
    const dataValid = valid.data;
    const user = JSON.parse(localStorage.getItem("user"));

    if (!isValid) {
        return;
    }
    try {
        const response = await fetch('/client/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lastName: dataValid.lastName,
                firstName: dataValid.firstName,
                middleName: dataValid.middleName,
                phone: dataValid.cleanPhone,
                email: dataValid.email,
                address: dataValid.address,
                managerId: user.id
            })
        });

        const data = await response.json();

        if (data.success) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('createClientModal'));
            modal.hide();
            window.location.reload();
        } else {
            alert('Невозможно добавить клиента: ' + data.message);
        }
    } catch (error) {
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

function goBack() {
    if (window.location.pathname.includes('/client/') || window.location.pathname.includes('/carcas')) {
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

function onLoadClient() {
    const name = document.getElementById('name');
    const status = document.getElementById('user-status');

    const localUser = localStorage.getItem('user');
    if (!localUser) {
        window.location.href = '/login';
    } else {
        const user = JSON.parse(localUser);
        console.log(user);
        name.innerHTML = `${user.first_name} ${user.last_name}`;
        status.innerText = user.status;
    }
}