// Функция для возврата на предыдущую страницу
function goBack() {
    if (window.location.pathname.includes('/carcas')) {
        // Если пользователь на странице каркаса, возвращаем его на страницу карточки клиента
        const clientId = window.location.pathname.split('/')[2]; // Извлекаем clientId из URL
        window.location.href = `/client/${clientId}`;
    } else if (window.location.pathname.includes('/client/')) {
        // Если пользователь на странице карточки клиента, возвращаем его на страницу клиентов
        window.location.href = '/client';
    } else if (window.location.pathname === '/client') {
        localStorage.removeItem('user');
        window.location.href = '/login';
    } else {
        window.history.back();
    }
}

// Функция для загрузки данных пользователя при открытии карточки клиента
function onLoadClientCard() {
    const name = document.getElementById('name');
    const status = document.getElementById('user-status');

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

// Функция для перехода на страницу каркаса
async function openCarcasPage(clientId) {
    try {
        const response = await fetch(`${clientId}/calculation/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clientId })
        });

        const data = await response.json();

        if (data.success) {
            console.log('Расчет успешно добавлен:', data);

            // Правильный доступ к insertId
            const calculationId = data.result.insertId;

            window.location.href = `/client/${clientId}/${calculationId}/carcas`;
        } else {
            console.log('Невозможно добавить клиента:', data.message);
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
    }
}
// function openCalculationPage(clientId, calculationId) {
//     // Здесь вы можете добавить код для открытия новой страницы с расчетом
//     console.log("Открыть страницу расчета:", calculationId);
//     window.location.href = clientId+"/"+calculationId+"/carcas";
// }
// // Функция для открытия страницы расчета
// function openCalculationPage(clientId, calculationId) {
//     console.log("Открыть страницу расчета:", calculationId);
//     window.location.href = `/client/${clientId}/${calculationId}/calculation`;
// }