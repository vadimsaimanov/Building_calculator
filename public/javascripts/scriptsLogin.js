async function OnClicklogin() {
    const login = document.getElementById('user_name').value;
    const password = document.getElementById('user_pass').value;

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
            console.log('Ошибка авторизации:', data.message);
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
    }
}