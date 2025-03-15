async function OnClickSaveClient() {
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    const managerId = 1; // ID менеджера, который добавляет клиента
                                 // Получите ID менеджера из какого-либо источника, например, из sessionStorage или localStorage

    try {
        const response = await fetch('/client/add', {
            method: 'POST',  // Используем POST для передачи данных безопасно
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lastName, firstName, middleName, phone, email, address, managerId})  // Передаем данные в формате JSON
        });

        const data = await response.json();  // Получаем ответ от сервера в формате JSON

        if (data.success) {
            console.log('Клиент успешно добавлен:', data.user);
        } else {
            console.log('Невозможно добавить клиента:', data.message);
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
    }
}

// Функция для возврата на предыдущую страницу
// function goBack() {
//     if (window.location.pathname === '/client/') {
//         localStorage.removeItem('user');
//         window.location.href = '/login/';
//     } else {
//         window.history.back();
//     }
// }
function goBack() {
    if (window.location.pathname.includes('/client/') || window.location.pathname.includes('/carcas')) {
        // Если пользователь на странице каркаса, возвращаем его на страницу карточки клиента
        const clientId = window.location.pathname.split('/')[2]; // Извлекаем clientId из URL
        window.location.href = `/client/${clientId}`;
    } else if (window.location.pathname === '/client') {
        localStorage.removeItem('user');
        window.location.href = '/login';
    } else {
        window.history.back();
    }
}
// Функция для перехода на страницу карточки клиента
function openClientCard(clientId) {
    window.location.href = `/client/${clientId}`;
}

function onLoadClientCard(){
    const name = document.getElementById('name')
    const status = document.getElementById('user-status')

    const localUser = localStorage.getItem('user');
    if (!localUser) {
        // Если данных нет, перенаправляем пользователя на страницу входа
        window.location.href = '/login';
    } else {
        const user = JSON.parse(localUser);

        name.innerHTML = `${user.first_name} ${user.last_name}`;
        status.innerText = user.status;
    }
}
// Функция для сохранения клиента
async function OnClickSaveClient() {
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const managerId = 1; // ID менеджера

    try {
        const response = await fetch('/client/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lastName, firstName, middleName, phone, email, address, managerId })
        });

        const data = await response.json();

        if (data.success) {
            console.log('Клиент успешно добавлен:', data.client);
            window.location.reload(); // Обновляем страницу
        } else {
            console.log('Невозможно добавить клиента:', data.message);
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
    }
}

// Функция для перехода на страницу каркаса
function openCarcasPage(clientId) {
    window.location.href = `/client/${clientId}/carcas`;
}