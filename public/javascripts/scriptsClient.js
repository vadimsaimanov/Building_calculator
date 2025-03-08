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