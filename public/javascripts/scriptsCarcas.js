function onLoadCarcas(){
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
async function onSaveClick(clientId, calculationId, operation) {
    const amountFloor = document.getElementById('floorCount').value
    const floorHeight = document.getElementById('floorHeight').value
    const perimeterExtWalls = document.getElementById('wallPerimeter').value
    const baseArea = document.getElementById('baseArea').value
    const externalWallsThickness = document.getElementById('wallThickness').value
    const internalWallLength = document.getElementById('innerWallLength').value
    const internalWallThickness = document.getElementById('innerWallThickness').value

    const OSBExternalWall = document.getElementById('osb').value
    const steamWaterProofingExternalWall = document.getElementById('vaporBarrier').value
    const windscreenExternalWall = document.getElementById('windProtection').value
    const insulationExternalWall = document.getElementById('insulation').value

    const OSBInternalWall = document.getElementById('innerOsb').value

    const overlapThickness = document.getElementById('floorThickness').value
    const OSBThickness = document.getElementById('floorOsb').value
    const steamWaterProofingThickness = document.getElementById('floorVaporBarrier').value
    const windscreenThickness = document.getElementById('floorWindProtection').value
    const insulationThickness = document.getElementById('floorInsulation').value

    try {
        const response = await fetch('carcas/'+operation, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amountFloor, floorHeight,
                perimeterExtWalls, baseArea, externalWallsThickness,
                internalWallThickness, internalWallLength, OSBExternalWall,
                steamWaterProofingExternalWall, windscreenExternalWall,
                insulationExternalWall, overlapThickness, OSBThickness,
                steamWaterProofingThickness, windscreenThickness, insulationThickness,
                OSBInternalWall})
        });

        const data = await response.json();

        if (data.success) {
            // ДЕЙСТВИЕ ПРИ УСПЕШНОМ ДОБАВЛЕНИИ СТРУКТУРЫ

        } else {
            console.log('Ошибка при добавлении данных:', data.message);
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
    }
}