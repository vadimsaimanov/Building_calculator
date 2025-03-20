document.addEventListener("DOMContentLoaded", function () {
    const name = document.getElementById('name');
    const status = document.getElementById('user-status');

    // Загрузка данных пользователя
    const localUser = localStorage.getItem('user');
    if (!localUser) {
        window.location.href = '/login';
    } else {
        const user = JSON.parse(localUser);
        name.innerHTML = `${user.first_name} ${user.last_name}`;
        status.innerText = user.status;
    }

    // Загрузка сохраненного адреса
    const savedAddress = localStorage.getItem('savedAddress');
    if (savedAddress) {
        document.getElementById('addressInput').value = savedAddress;
    }

    // Обработчик для изменения количества этажей
    const floorCountSelect = document.getElementById("floorCount");
    const floorsContainer = document.getElementById("floors-container");
    floorCountSelect.addEventListener("change", function () {
        const selectedFloorCount = parseInt(floorCountSelect.value);
        updateFloorHeader(selectedFloorCount);
        updateFloors(selectedFloorCount);
    });

    // Функция для обновления заголовка этажей
    function updateFloorHeader(count) {
        const floorHeader = document.getElementById('floorHeader');
        floorHeader.innerText = `${count} этаж${getFloorSuffix(count)}`;
    }

    // Функция для получения суффикса этажей
    function getFloorSuffix(count) {
        if (count === 1) {
            return "";
        } else if (count >= 2 && count <= 4) {
            return "а";
        } else {
            return "ов";
        }
    }

    // Функция для обновления полей этажей
    function updateFloors(count) {
        // Удаляем все существующие этажи
        while (floorsContainer.firstChild) {
            floorsContainer.removeChild(floorsContainer.firstChild);
        }

        // Добавляем новые этажи
        for (let i = 0; i < count; i++) {
            const floorData = document.createElement('div');
            floorData.classList.add('floor-data');
            floorData.innerHTML = `
                <h5>Этаж ${i + 1}</h5>
                <div class="form-group">
                    <label for="floorHeight-${i}">Высота этажа</label>
                    <input type="text" class="form-control" id="floorHeight-${i}" value="3" placeholder="Введите высоту">
                    <span class="unit">м</span>
                </div>
                <div class="form-group">
                    <label for="wallPerimeter-${i}">Периметр внешних стен</label>
                    <input type="text" class="form-control" id="wallPerimeter-${i}" value="30" placeholder="Введите периметр">
                    <span class="unit">м</span>
                </div>
                <div class="form-group">
                    <label for="baseArea-${i}">Площадь основания</label>
                    <input type="text" class="form-control" id="baseArea-${i}" value="56" placeholder="Введите площадь">
                    <span class="unit">м²</span>
                </div>
                <div class="form-group">
                    <label for="wallThickness-${i}">Толщина внешних стен</label>
                    <select class="form-control" id="wallThickness-${i}">
                        <option>100</option>
                        <option>150</option>
                        <option>200</option>
                        <option>250</option>
                    </select>
                    <span class="unit">мм</span>
                </div>
                <div class="form-group">
                    <label for="innerWallLength-${i}">Длина внутренних стен</label>
                    <input type="text" class="form-control" id="innerWallLength-${i}" value="15" placeholder="Введите длину">
                    <span class="unit">м</span>
                </div>
                <div class="form-group">
                    <label for="innerWallThickness-${i}">Толщина внутренних стен</label>
                    <select class="form-control" id="innerWallThickness-${i}">
                        <option>100</option>
                        <option>150</option>
                        <option>200</option>
                        <option>250</option>
                    </select>
                    <span class="unit">мм</span>
                </div>
            `;
            floorsContainer.appendChild(floorData);
        }
    }

    // Функция для раскрытия/скрытия блоков
    function toggleSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.toggle('hidden');
        }
    }

    // Функция для добавления нового окна
    function addWindow() {
        const container = document.getElementById('windowsContainer');
        if (container) {
            const newWindow = document.createElement('div');
            newWindow.classList.add('window-group');
            newWindow.innerHTML = `
                <div class="form-group">
                    <label for="windowHeight">Высота</label>
                    <input type="text" class="form-control" value="1.5" placeholder="Введите высоту">
                    <span class="unit">м</span>
                </div>
                <div class="form-group">
                    <label for="windowWidth">Ширина</label>
                    <input type="text" class="form-control" value="1.5" placeholder="Введите ширину">
                    <span class="unit">м</span>
                </div>
                <div class="form-group">
                    <label for="windowCount">Количество</label>
                    <input type="text" class="form-control" value="1" placeholder="Введите количество">
                    <span class="unit">шт</span>
                </div>
            `;
            container.appendChild(newWindow);
        }
    }

    // Функция для добавления новой внешней двери
    function addExternalDoor() {
        const container = document.getElementById('externalDoorsContainer');
        if (container) {
            const newDoor = document.createElement('div');
            newDoor.classList.add('door-group');
            newDoor.innerHTML = `
                <div class="form-group">
                    <label for="doorHeight">Высота</label>
                    <input type="text" class="form-control" value="2.1" placeholder="Введите высоту">
                    <span class="unit">м</span>
                </div>
                <div class="form-group">
                    <label for="doorWidth">Ширина</label>
                    <input type="text" class="form-control" value="1" placeholder="Введите ширину">
                    <span class="unit">м</span>
                </div>
                <div class="form-group">
                    <label for="doorCount">Количество</label>
                    <input type="text" class="form-control" value="1" placeholder="Введите количество">
                    <span class="unit">шт</span>
                </div>
            `;
            container.appendChild(newDoor);
        }
    }

    // Функция для добавления новой внутренней двери
    function addInternalDoor() {
        const container = document.getElementById('internalDoorsContainer');
        if (container) {
            const newDoor = document.createElement('div');
            newDoor.classList.add('door-group');
            newDoor.innerHTML = `
                <div class="form-group">
                    <label for="innerDoorHeight">Высота</label>
                    <input type="text" class="form-control" value="2" placeholder="Введите высоту">
                    <span class="unit">м</span>
                </div>
                <div class="form-group">
                    <label for="innerDoorWidth">Ширина</label>
                    <input type="text" class="form-control" value="0.8" placeholder="Введите ширину">
                    <span class="unit">м</span>
                </div>
                <div class="form-group">
                    <label for="innerDoorCount">Количество</label>
                    <input type="text" class="form-control" value="1" placeholder="Введите количество">
                    <span class="unit">шт</span>
                </div>
            `;
            container.appendChild(newDoor);
        }
    }

    // Функция для сохранения адреса
    async function saveAddress() {
        const address = document.getElementById('addressInput').value;
        if (address) {
            //localStorage.setItem('savedAddress', address);
            try {
                const response = await fetch('updateAddress', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({address})
                });

                const data = await response.json();

                if (data.success) {

                    alert('Адрес сохранен!');
                    window.location.reload(); // Обновляем страницу
                } else {
                    console.log('Невозможно добавить клиента:', data.message);
                }
            } catch (error) {
                console.error('Ошибка сети:', error);
            }


        } else {
            alert('Введите адрес перед сохранением.');
        }
    }

    // Функция для сброса данных до дефолтных
    function clearCalculation() {
        // Сброс адреса
        document.getElementById('addressInput').value = '';
        localStorage.removeItem('savedAddress');

        // Сброс количества этажей
        const floorCountSelect = document.getElementById('floorCount');
        floorCountSelect.value = 1;
        updateFloors(1);

        // Сброс остальных полей
        document.getElementById('osb').value = '9 мм';
        document.getElementById('vaporBarrier').value = 'Ондутис';
        document.getElementById('windProtection').value = 'Ветро-влагозащитная мембрана Brane А';
        document.getElementById('insulation').value = 'Кнауф ТеплоКнауф 100 мм';
        document.getElementById('innerOsb').value = '9 мм';
        document.getElementById('floorThickness').value = '200';
        document.getElementById('floorOsb').value = '9 мм';
        document.getElementById('floorVaporBarrier').value = 'Ондутис';
        document.getElementById('floorWindProtection').value = 'Ветро-влагозащитная мембрана Brane А';
        document.getElementById('floorInsulation').value = 'Кнауф ТеплоКнауф 100 мм';

        // Очистка окон и дверей
        document.getElementById('windowsContainer').innerHTML = '';
        document.getElementById('externalDoorsContainer').innerHTML = '';
        document.getElementById('internalDoorsContainer').innerHTML = '';

        alert('Все данные сброшены до значений по умолчанию.');
    }

    // Функция для сохранения данных при нажатии на "Рассчитать"
    function calculateAndSave() {
        const floorsData = [];
        document.querySelectorAll('.floor-data').forEach(floor => {
            const floorHeight = floor.querySelector('input[id^="floorHeight-"]').value;
            const wallPerimeter = floor.querySelector('input[id^="wallPerimeter-"]').value;
            const baseArea = floor.querySelector('input[id^="baseArea-"]').value;
            const wallThickness = floor.querySelector('select[id^="wallThickness-"]').value;
            const innerWallLength = floor.querySelector('input[id^="innerWallLength-"]').value;
            const innerWallThickness = floor.querySelector('select[id^="innerWallThickness-"]').value;

            floorsData.push({
                floorHeight,
                wallPerimeter,
                baseArea,
                wallThickness,
                innerWallLength,
                innerWallThickness
            });
        });

        const OSBExternalWall = document.getElementById('osb').value;
        const steamWaterProofingExternalWall = document.getElementById('vaporBarrier').value;
        const windscreenExternalWall = document.getElementById('windProtection').value;
        const insulationExternalWall = document.getElementById('insulation').value;

        const OSBInternalWall = document.getElementById('innerOsb').value;

        const overlapThickness = document.getElementById('floorThickness').value;
        const OSBThickness = document.getElementById('floorOsb').value;
        const steamWaterProofingThickness = document.getElementById('floorVaporBarrier').value;
        const windscreenThickness = document.getElementById('floorWindProtection').value;
        const insulationThickness = document.getElementById('floorInsulation').value;

        // Сохранение данных в localStorage
        const calculationData = {
            floorsData,
            OSBExternalWall,
            steamWaterProofingExternalWall,
            windscreenExternalWall,
            insulationExternalWall,
            OSBInternalWall,
            overlapThickness,
            OSBThickness,
            steamWaterProofingThickness,
            windscreenThickness,
            insulationThickness
        };
        localStorage.setItem('calculationData', JSON.stringify(calculationData));

        alert('Данные сохранены и отправлены на расчет!');
        window.location.href = `/client/${window.location.pathname.split('/')[2]}/calculation`;
    }

    // Назначение обработчиков событий
    document.querySelectorAll('.toggle-icon').forEach(icon => {
        icon.addEventListener('click', function () {
            const sectionId = this.getAttribute('onclick').replace("toggleSection('", "").replace("')", "");
            toggleSection(sectionId);
        });
    });

    document.getElementById('floorCount').addEventListener('change', function () {
        const selectedFloorCount = parseInt(this.value);
        updateFloorHeader(selectedFloorCount);
        updateFloors(selectedFloorCount);
    });

    // Назначение обработчиков для кнопок добавления
    document.getElementById('addWindowButton').addEventListener('click', addWindow);
    document.getElementById('addExternalDoorButton').addEventListener('click', addExternalDoor);
    document.getElementById('addInternalDoorButton').addEventListener('click', addInternalDoor);

    // Назначение обработчиков для кнопок "Сохранить" и "Очистить расчет"
    document.getElementById('saveAddressButton').addEventListener('click', saveAddress);
    document.getElementById('clearCalculationButton').addEventListener('click', clearCalculation);

    // Назначение обработчика для кнопки "Рассчитать"
    document.getElementById('calculateButton').addEventListener('click', calculateAndSave);
});

// Функция для возврата на предыдущую страницу
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

// Функция для загрузки данных пользователя при открытии страницы каркаса
function onLoadCarcas() {
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