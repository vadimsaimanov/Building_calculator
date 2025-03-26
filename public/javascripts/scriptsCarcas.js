document.addEventListener("DOMContentLoaded", function () {
    // const name = document.getElementById('name');
    // const status = document.getElementById('user-status');
    //
    // // Загрузка данных пользователя
    // const localUser = localStorage.getItem('user');
    // if (!localUser) {
    //     window.location.href = '/login';
    // } else {
    //     const user = JSON.parse(localUser);
    //     name.innerHTML = `${user.first_name} ${user.last_name}`;
    //     status.innerText = user.status;
    // }
    //
    // // Загрузка сохраненного адреса
    // const savedAddress = localStorage.getItem('savedAddress');
    // if (savedAddress) {
    //     document.getElementById('addressInput').value = savedAddress;
    // }

    // Обработчик для изменения количества этажей
    // const floorCountSelect = document.getElementById("floorCount");
    // const floorsContainer = document.getElementById("floors-container");
    // floorCountSelect.addEventListener("change", function () {
    //     const selectedFloorCount = parseInt(floorCountSelect.value);
    //     updateFloorHeader(selectedFloorCount);
    //     updateFloors(selectedFloorCount);
    // });

    // Функция для обновления заголовка этажей


    // Функция для получения суффикса этажей





    // Назначение обработчиков событий
    // document.querySelectorAll('.toggle-icon').forEach(icon => {
    //     icon.addEventListener('click', function () {
    //         const sectionId = this.getAttribute('onclick').replace("toggleSection('", "").replace("')", "");
    //         toggleSection(sectionId);
    //     });
    // });

    // document.getElementById('floorCount').addEventListener('change', function () {
    //     const selectedFloorCount = parseInt(this.value);
    //     updateFloorHeader(selectedFloorCount);
    //     updateFloors(selectedFloorCount);
    // });

    // Назначение обработчиков для кнопок добавления
    // document.getElementById('addWindowButton').addEventListener('click', addWindow);
    // document.getElementById('addExternalDoorButton').addEventListener('click', addExternalDoor);
    // document.getElementById('addInternalDoorButton').addEventListener('click', addInternalDoor);

    // Назначение обработчиков для кнопок "Сохранить" и "Очистить расчет"
    // document.getElementById('saveAddressButton').addEventListener('click', saveAddress);
    // document.getElementById('clearCalculationButton').addEventListener('click', clearCalculation);

    // Назначение обработчика для кнопки "Рассчитать"
    // document.getElementById('calculateButton').addEventListener('click', calculateAndSave);
});

function getFloorSuffix(count) {
    if (count === 1) {
        return "";
    } else if (count >= 2 && count <= 4) {
        return "а";
    } else {
        return "ов";
    }
}
function updateFloorHeader(count) {
    const floorHeader = document.getElementById('floorHeader');
    floorHeader.innerText = `${count} этаж${getFloorSuffix(count)}`;
}
function onFloorCountChange(value) {
    const section = document.getElementById('calculation-div');
    if (!isNaN(value)) {
        const selectedFloorCount = parseInt(value);
        updateFloorHeader(selectedFloorCount);
        updateFloors(selectedFloorCount);

        if (section.classList.contains('hidden')) {
            section.classList.remove('hidden');
        }

    } else {
        if (!section.classList.contains('hidden')) {
            section.classList.add('hidden');
        }
        updateFloors(0);
        const floorHeader = document.getElementById('floorHeader');
        floorHeader.innerText = ``;
    }

}

// Функция для раскрытия/скрытия блоков
function toggleSection(id) {
    const section = document.getElementById(id);
    if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
    } else {
        section.classList.add('hidden');
    }
}
// Функция для обновления полей этажей
function updateFloors(count) {
    const floorsContainer = document.getElementById("floors-container");
    // Удаляем все существующие этажи
    while (floorsContainer.firstChild) {
        floorsContainer.removeChild(floorsContainer.firstChild);
    }

    // Добавляем новые этажи
    for (let i = 0; i < count; i++) {
        const floorData = document.createElement('div');
        floorData.classList.add('floor-data');
        floorData.innerHTML = `
        <h2>Этаж ${i + 1}</h2>
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


        <div class="add-calculation">
            <i class="bi bi-plus-circle toggle-icon" onclick="toggleSection('outerWallsCover-${i}')"></i>
            <span class="toggle-text">Учесть обшивку внешних стен</span>
            <div id="outerWallsCover-${i}" class="hidden">
                <div class="form-group">
                    <label for="osb-${i}">ОСБ</label>
                    <select class="form-control" id="osb-${i}">
                        <option>9 мм</option>
                        <option>10 мм</option>
                        <option>15 мм</option>
                        <option>18 мм</option>
                    </select>
                    <span class="unit">мм</span>
                </div>
                <div class="form-group">
                    <label for="vaporBarrier-${i}">Парогидроизоляция</label>
                    <select class="form-control" id="vaporBarrier-${i}">
                        <option>Ондутис</option>
                        <option>Пароизоляция Axton (b)</option>
                        <option>Пароизоляционная пленка Ютафол Н 96 Сильвер</option>
                        <option>Пароизоляция В</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="windProtection-${i}">Ветрозащита</label>
                    <select class="form-control" id="windProtection-${i}">
                        <option>Ветро-влагозащитная мембрана Brane А</option>
                        <option>Паропроницаемая ветро-влагозащита A Optima</option>
                        <option>Гидро-ветрозащита Тип А</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="insulation-${i}">Утеплитель</label>
                    <select class="form-control" id="insulation-${i}">
                        <option>Кнауф ТеплоКнауф 100 мм</option>
                        <option>Технониколь 100 мм</option>
                        <option>Эковер 100 мм</option>
                        <option>Эковер 150 мм</option>
                        <option>Эковер 200 мм</option>
                        <option>Фасад 200 мм</option>
                        <option>Эковер 250 мм</option>
                    </select>
                </div>
            </div>
        </div>
        <br>

        <div class="add-calculation">
            <i class="bi bi-plus-circle toggle-icon" onclick="toggleSection('innerWalls-${i}')"></i>
            <span class="toggle-text">Добавить расчет обшивки внутренних стен</span>
            <div id="innerWalls-${i}" class="hidden">
                <div class="form-group">
                    <label for="innerOsb-${i}">ОСБ</label>
                    <select class="form-control" id="innerOsb-${i}">
                        <option>9 мм</option>
                        <option>10 мм</option>
                        <option>15 мм</option>
                        <option>18 мм</option>
                    </select>
                    <span class="unit">мм</span>
                </div>
            </div>
        </div>
        <br>

        <div class="add-calculation">
            <i class="bi bi-plus-circle toggle-icon" onclick="toggleSection('windowsDoors-${i}')"></i>
            <span class="toggle-text">Учесть двери и окна</span>
            <div id="windowsDoors-${i}" class="hidden">
                <!-- окна, двери внешние и внутренние -->
                <div class="subsection">
                    <h5>Оконные проемы</h5>
                    <div id="windowsContainer-${i}"></div>
                    <button type="button" class="btn btn-secondary" onclick="addWindow(${i})">+ Добавить окно</button>
                </div>
                <div class="subsection">
                    <h5>Дверные проемы внешние</h5>
                    <div id="externalDoorsContainer-${i}"></div>
                    <button type="button" class="btn btn-secondary" onclick="addExternalDoor(${i})">+ Добавить дверь</button>
                </div>
                <div class="subsection">
                    <h5>Дверные проемы внутренние</h5>
                    <div id="internalDoorsContainer-${i}"></div>
                    <button type="button" class="btn btn-secondary" onclick="addInternalDoor(${i})">+ Добавить дверь</button>
                </div>
            </div>
        </div>
        <br>

        <div class="add-calculation">
            <i class="bi bi-plus-circle toggle-icon" onclick="toggleSection('overlaps-${i}')"></i>
            <span class="toggle-text">Добавить расчет перекрытий</span>
            <div id="overlaps-${i}" class="hidden">
                <div class="form-group">
                    <label for="floorThickness-${i}">Толщина перекрытия</label>
                    <select class="form-control" id="floorThickness-${i}">
                        <option>200</option>
                        <option>250</option>
                    </select>
                    <span class="unit">мм</span>
                </div>
                <div class="form-group">
                    <label for="floorOsb-${i}">ОСБ</label>
                    <select class="form-control" id="floorOsb-${i}">
                        <option>9 мм</option>
                        <option>10 мм</option>
                        <option>15 мм</option>
                        <option>18 мм</option>
                    </select>
                    <span class="unit">мм</span>
                </div>
                <div class="form-group">
                    <label for="floorVaporBarrier-${i}">Парогидроизоляция</label>
                    <select class="form-control" id="floorVaporBarrier-${i}">
                        <option>Ондутис</option>
                        <option>Пароизоляция Axton (b)</option>
                        <option>Пароизоляционная пленка Ютафол Н 96 Сильвер</option>
                        <option>Пароизоляция В</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="floorWindProtection-${i}">Ветрозащита</label>
                    <select class="form-control" id="floorWindProtection-${i}">
                        <option>Ветро-влагозащитная мембрана Brane А</option>
                        <option>Паропроницаемая ветро-влагозащита A Optima</option>
                        <option>Гидро-ветрозащита Тип А</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="floorInsulation-${i}">Утеплитель</label>
                    <select class="form-control" id="floorInsulation-${i}">
                        <option>Кнауф ТеплоКнауф 100 мм</option>
                        <option>Технониколь 100 мм</option>
                        <option>Эковер 100 мм</option>
                        <option>Эковер 150 мм</option>
                        <option>Эковер 200 мм</option>
                        <option>Фасад 200 мм</option>
                        <option>Эковер 250 мм</option>
                    </select>
                </div>
            </div>
        </div>
        <br>
    `;
        // const btnCalculate = document.createElement('button');
        // btnCalculate.classList.add('btn', 'btn-primary');
        // btnCalculate.type = 'button';
        // btnCalculate.textContent = 'Рассчитать';
        // btnCalculate.onclick = calculateAndSave();
        // floorsContainer.appendChild(btnCalculate);
        //
        floorsContainer.appendChild(floorData);
    }

}



// Функция для добавления окна
function addWindow(floorIndex) {
    const container = document.getElementById(`windowsContainer-${floorIndex}`);
    const windowId = `window-${floorIndex}-${container.children.length}`;

    const windowBlock = document.createElement('div');
    windowBlock.classList.add('window-group');
    windowBlock.innerHTML = `
        <label for="${windowId}-width">Ширина окна (м)</label>
        <input type="text" class="form-control" name="windowWidth" id="${windowId}-width" placeholder="Введите ширину">
        <label for="${windowId}-height">Высота окна (м)</label>
        <input type="text" class="form-control" name="windowHeight" id="${windowId}-height" placeholder="Введите высоту">
        <label for="${windowId}-count">Количество (шт)</label>
        <input type="text" class="form-control" name="windowCount" id="${windowId}-count" placeholder="Введите количество">
        <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">Удалить окно</button>
    `;

    container.appendChild(windowBlock);
}

// Функция для добавления внешней двери
function addExternalDoor(floorIndex) {
    const container = document.getElementById(`externalDoorsContainer-${floorIndex}`);
    const doorId = `external-door-${floorIndex}-${container.children.length}`;

    const doorBlock = document.createElement('div');
    doorBlock.classList.add('door-group');
    doorBlock.innerHTML = `
        <label for="${doorId}-width">Ширина двери (м)</label>
        <input type="text" class="form-control" name="extDoorWidth" id="${doorId}-width" placeholder="Введите ширину">
        <label for="${doorId}-height">Высота двери (м)</label>
        <input type="text" class="form-control" name="extDoorHeight" id="${doorId}-height" placeholder="Введите высоту">
        <label for="${doorId}-count">Количество (шт)</label>
        <input type="text" class="form-control" name="extDoorCount" id="${doorId}-count" placeholder="Введите количество">
        <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">Удалить дверь</button>
    `;

    container.appendChild(doorBlock);
}

// Функция для добавления внутренней двери
function addInternalDoor(floorIndex) {
    const container = document.getElementById(`internalDoorsContainer-${floorIndex}`);
    const doorId = `internal-door-${floorIndex}-${container.children.length}`;

    const doorBlock = document.createElement('div');
    doorBlock.classList.add('door-group');
    doorBlock.innerHTML = `
        <label for="${doorId}-width">Ширина двери (м)</label>
        <input type="text" class="form-control" name="intDoorWidth" id="${doorId}-width" placeholder="Введите ширину">
        <label for="${doorId}-height">Высота двери (м)</label>
        <input type="text" class="form-control" name="intDoorHeight" id="${doorId}-height" placeholder="Введите высоту">
        <label for="${doorId}-count">Количество (шт)</label>
        <input type="text" class="form-control" name="intDoorCount" id="${doorId}-count" placeholder="Введите количество">
        <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()">Удалить дверь</button>
    `;

    container.appendChild(doorBlock);
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
    // // Сброс адреса
    // document.getElementById('addressInput').value = '';
    // localStorage.removeItem('savedAddress');
    //
    // // Сброс количества этажей
    // const floorCountSelect = document.getElementById('floorCount');
    // floorCountSelect.value = 1;
    // updateFloors(1);
    //
    // // Сброс остальных полей
    // document.getElementById('osb').value = '9 мм';
    // document.getElementById('vaporBarrier').value = 'Ондутис';
    // document.getElementById('windProtection').value = 'Ветро-влагозащитная мембрана Brane А';
    // document.getElementById('insulation').value = 'Кнауф ТеплоКнауф 100 мм';
    // document.getElementById('innerOsb').value = '9 мм';
    // document.getElementById('floorThickness').value = '200';
    // document.getElementById('floorOsb').value = '9 мм';
    // document.getElementById('floorVaporBarrier').value = 'Ондутис';
    // document.getElementById('floorWindProtection').value = 'Ветро-влагозащитная мембрана Brane А';
    // document.getElementById('floorInsulation').value = 'Кнауф ТеплоКнауф 100 мм';
    //
    // // Очистка окон и дверей
    // document.getElementById('windowsContainer').innerHTML = '';
    // document.getElementById('externalDoorsContainer').innerHTML = '';
    // document.getElementById('internalDoorsContainer').innerHTML = '';

    alert('Все данные сброшены до значений по умолчанию.');
}
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
function onLoadCarcas(countFloor) {
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

    const savedAddress = localStorage.getItem('savedAddress');
    if (savedAddress) {
        document.getElementById('addressInput').value = savedAddress;
    }

    document.querySelectorAll('.toggle-icon').forEach(icon => {
        icon.addEventListener('click', function () {
            const sectionId = this.getAttribute('onclick').replace("toggleSection('", "").replace("')", "");
            toggleSection(sectionId);
        });
    });


    onFloorCountChange()
    //
    // if (countFloor === undefined) {
    //     onFloorCountChange('1');
    // } else
    //     onFloorCountChange(countFloor);
}

function collectFormData() {
    const floors = [];
    const floorCount = parseInt(document.getElementById('floorCount').value);

    for (let i = 0; i < floorCount; i++) {
        const windows = Array.from(document.querySelectorAll(`#windowsContainer-${i} .window-group`)).map(group => ({
            height: parseFloat(group.querySelector('input[name="windowHeight"]').value),
            width: parseFloat(group.querySelector('input[name="windowWidth"]').value),
            count: parseInt(group.querySelector('input[name="windowCount"]').value)
        }));
        windows.forEach(window => {
            console.log(`Ширина: ${window.width}, Высота: ${window.height}, Количество: ${window.count}`);
        });

        const externalDoors = Array.from(document.querySelectorAll(`#externalDoorsContainer-${i} .door-group`)).map(group => ({
            height: parseFloat(group.querySelector('input[name="extDoorHeight"]').value),
            width: parseFloat(group.querySelector('input[name="extDoorWidth"]').value),
            count: parseInt(group.querySelector('input[name="extDoorCount"]').value)
        }));

        const internalDoors = Array.from(document.querySelectorAll(`#internalDoorsContainer-${i} .door-group`)).map(group => ({
            height: parseFloat(group.querySelector('input[name="intDoorHeight"]').value),
            width: parseFloat(group.querySelector('input[name="intDoorWidth"]').value),
            count: parseInt(group.querySelector('input[name="intDoorCount"]').value)
        }));

        const floorData = {
            floorNumber: i + 1,
            height: parseFloat(document.getElementById(`floorHeight-${i}`).value),
            perimeter: parseFloat(document.getElementById(`wallPerimeter-${i}`).value),
            baseArea: parseFloat(document.getElementById(`baseArea-${i}`).value),
            wallThickness: parseInt(document.getElementById(`wallThickness-${i}`).value),
            innerWallLength: parseFloat(document.getElementById(`innerWallLength-${i}`).value),
            innerWallThickness: parseInt(document.getElementById(`innerWallThickness-${i}`).value),
            externalWallSheathing: {
                osb: document.getElementById(`osb-${i}`).value,
                vaporBarrier: document.getElementById(`vaporBarrier-${i}`).value,
                windProtection: document.getElementById(`windProtection-${i}`).value,
                insulation: document.getElementById(`insulation-${i}`).value
            },
            innerWallSheathing: {
                osb: document.getElementById(`innerOsb-${i}`)?.value || null
            },
            windows: windows,
            externalDoors: externalDoors,
            internalDoors: internalDoors,
            overlaps: {
                floorThickness: parseInt(document.getElementById(`floorThickness-${i}`)?.value) || null,
                osb: document.getElementById(`floorOsb-${i}`)?.value || null,
                vaporBarrier: document.getElementById(`floorVaporBarrier-${i}`)?.value || null,
                windProtection: document.getElementById(`floorWindProtection-${i}`)?.value || null,
                insulation: document.getElementById(`floorInsulation-${i}`)?.value || null
            }
        };

        floors.push(floorData);
    }

    return {
        address: document.getElementById('addressInput').value,
        floors: floors
    };
}


async function calculateAndSave(clientId) {
    const data = collectFormData();
    try {
        const response = await fetch('saveCarcasData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {

            alert('Данные сохранены!');
            window.location.href = `/client/${clientId}/${result.calculationId}/carcas/result`;
        } else {
            console.log('Невозможно добавить расчет:', result.message);
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
    }


    // .then(response => response.json())
    // .then(result => {
    //     alert('Данные успешно отправлены!');
    // })
    // .catch(error => {
    //     console.error('Ошибка отправки данных:', error);
    //     alert('Произошла ошибка при отправке данных');
    // });
}
