// window.addEventListener("beforeunload", (event) => {
//     event.preventDefault(); // Некоторые браузеры требуют этого вызова
//     event.returnValue = "Все несохранённые данные будут утеряны!"; // Сообщение пользователю
// });
function setupAutoSave() {
    document.querySelectorAll("input, select").forEach((element) => {
        element.addEventListener("input", () => {
            const floorsData = collectFormData();
            saveFloorsToLocalStorage(floorsData);
            console.log('saved');
        });
    });
}
function saveFloorsToLocalStorage(floorsData) {
    localStorage.setItem("floorsData", JSON.stringify(floorsData));
}
function loadFloorsFromLocalStorage() {
    const storedData = localStorage.getItem("floorsData");
    return storedData ? JSON.parse(storedData) : null;
}


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
            <select class="form-control" id="wallThickness-${i}" onchange="updateInsulationOptions(${i})">
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
            <select class="form-control" id="innerWallThickness-${i}" onchange="updateInsulationOptions(${i})">
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
                        <option>9</option>
                        <option>10</option>
                        <option>15</option>
                        <option>18</option>
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
                        <option>9</option>
                        <option>10</option>
                        <option>15</option>
                        <option>18</option>
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
                    <select class="form-control" id="floorThickness-${i}" onchange="updateInsulationOptions(${i})">
                        <option>200</option>
                        <option>250</option>
                    </select>
                    <span class="unit">мм</span>
                </div>
                <div class="form-group">
                    <label for="floorOsb-${i}">ОСБ</label>
                    <select class="form-control" id="floorOsb-${i}">
                        <option>9</option>
                        <option>10</option>
                        <option>15</option>
                        <option>18</option>
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
                        <option>Эковер 200 мм</option>
                        <option>Фасад 200 мм</option>
                        <option>Эковер 250 мм</option>
                    </select>
                </div>
            </div>
        </div>
        <br>
    `;
        floorsContainer.appendChild(floorData);
        updateInsulationOptions(i);
    }
    setupAutoSave();

}

// Функция для обновления списка утеплителей в зависимости от толщины стены
function updateInsulationOptions(floorIndex) {
    const wallThickness = document.getElementById(`wallThickness-${floorIndex}`).value;
    const overlapThickness = document.getElementById(`floorThickness-${floorIndex}`).value;

    const insulationSelect = document.getElementById(`insulation-${floorIndex}`);
    insulationSelect.innerHTML = ''; // Очищаем предыдущие опции

    const insulationOverlapSelect = document.getElementById(`floorInsulation-${floorIndex}`);
    insulationOverlapSelect.innerHTML = ''; // Очищаем предыдущие опции

    const insulationWallOptions = insulation[wallThickness]
    const insulationOverlapOptions = insulation[overlapThickness]


    // Функция для добавления опций в `select`
    const addOptions = (select, options) => {
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.name; // Предполагаем, что `name` есть в объекте утеплителя
            optionElement.textContent = option.name;
            select.appendChild(optionElement);
        });
    };

    addOptions(insulationSelect, insulationWallOptions);
    addOptions(insulationOverlapSelect, insulationOverlapOptions);
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
    document.getElementById('addressInput').value = '';
    let floorCount = 1;
    const floorCountElement = document.getElementById('floorCount').value;
    if (!isNaN(parseInt(floorCountElement)))
        floorCount = floorCountElement;

    const floorsData = [];

    for (let i = 0; i < floorCount; i++) {
        floorsData.push({
            id: null,  // Пока без ID, он будет присвоен при сохранении
            calculation_id: null, // Тоже пока пустой
            amount_floor: floorCount,
            floor_number: i + 1,
            floor_height: '',
            perimeter_of_external_walls: '',
            base_area: '',
            external_wall_thickness: 200,
            internal_wall_length: '',
            internal_wall_thickness: 100,
            OSB_external_wall: "",
            steam_waterproofing_external_wall: "",
            windscreen_extern_wall: "",
            insulation_external_wall: "",
            overlap_thickness: "",
            OSB_thickness: "",
            steam_waterproofing_thickness: "",
            windscreen_thickness: "",
            insulation_thickness: "",
            OSB_internal_wall: "",
            windows: [],
            externalDoors: [],
            internalDoors: [],
            options: {
                isInternalWallSheeting: false,
                isExternalWallSheeting: false,
                isOverlaps: false
            }
        });
    }

    loadFloorsSavedToDB(floorsData)
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
function onLoadCarcas(floorsDBData) {
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

    //console.log(loadFloorsFromLocalStorage())
    console.log(floorsDBData);
    if(floorsDBData !== null && floorsDBData.length > 0) {
        loadFloorsSavedToDB(floorsDBData, false);
    } else if (localStorage.getItem('floorsData') !== null) {
        loadFloorsSavedToDB(loadFloorsFromLocalStorage().floors)
    }

    //onFloorCountChange()
    //
    // if (countFloor === undefined) {
    //     onFloorCountChange('1');
    // } else
    //     onFloorCountChange(countFloor);
}
function roundNumber(value, decimals = 2) {
    return parseFloat(value.toFixed(decimals));
}

function populateWindowsAndDoors(floorData) {
    floorData.forEach((floor, i) => {
        if (floor.windows.length > 0 || floor.externalDoors.length > 0 || floor.internalDoors.length > 0) {
            document.getElementById(`windowsDoors-${i}`).classList.remove('hidden');
        }

        // Заполняем окна
        floor.windows.forEach((window) => {
            addWindow(i); // Создаем блок
            const index = document.getElementById(`windowsContainer-${i}`).children.length - 1;
            document.getElementById(`window-${i}-${index}-width`).value = roundNumber(window.width);
            document.getElementById(`window-${i}-${index}-height`).value = roundNumber(window.height);
            document.getElementById(`window-${i}-${index}-count`).value = window.amount;
        });

        // Заполняем внешние двери
        floor.externalDoors.forEach((door) => {
            addExternalDoor(i); // Создаем блок
            const index = document.getElementById(`externalDoorsContainer-${i}`).children.length - 1;
            document.getElementById(`external-door-${i}-${index}-width`).value = roundNumber(door.width);
            document.getElementById(`external-door-${i}-${index}-height`).value = roundNumber(door.height);
            document.getElementById(`external-door-${i}-${index}-count`).value = door.amount;
        });

        // Заполняем внутренние двери
        floor.internalDoors.forEach((door) => {
            addInternalDoor(i); // Создаем блок
            const index = document.getElementById(`internalDoorsContainer-${i}`).children.length - 1;
            document.getElementById(`internal-door-${i}-${index}-width`).value = roundNumber(door.width);
            document.getElementById(`internal-door-${i}-${index}-height`).value = roundNumber(door.height);
            document.getElementById(`internal-door-${i}-${index}-count`).value = door.amount;
        });
    });
}

function loadFloorsSavedToDB(floorData, savedToLocalStorage = true) {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    console.log(floorData)

    if (floorData.length === 0) return;

    if(!savedToLocalStorage)
        document.getElementById('calculate-btn').innerText = 'Обновить и рассчитать';
    onFloorCountChange(floorData.length);
    const select = document.getElementById('floorCount');

    if(select) select.value = floorData.length;

    for (let i = 0; i < floorData.length; i++) {
        // Селекторы для внешних стен
        const selectOSBExternal = document.getElementById(`osb-${i}`)
        const selectVaporBarrierExternal = document.getElementById(`vaporBarrier-${i}`)
        const selectWindProtectionExternal = document.getElementById(`windProtection-${i}`)
        const selectInsulationExternal = document.getElementById(`insulation-${i}`)

        // Селекторы для перекрытий
        const selectFloorThickness = document.getElementById(`floorThickness-${i}`)
        const selectFloorOSB = document.getElementById(`floorOsb-${i}`)
        const selectFloorVaporBarrier = document.getElementById(`floorVaporBarrier-${i}`)
        const selectFloorWindProtection = document.getElementById(`floorWindProtection-${i}`)
        const selectFloorInsulation = document.getElementById(`floorInsulation-${i}`)

        // Основные параметры этажа
        document.getElementById(`floorHeight-${i}`).value = floorData[i].floor_height;
        document.getElementById(`wallPerimeter-${i}`).value = floorData[i].perimeter_of_external_walls;
        document.getElementById(`baseArea-${i}`).value = floorData[i].base_area;
        document.getElementById(`wallThickness-${i}`).value = floorData[i].external_wall_thickness;
        document.getElementById(`innerWallLength-${i}`).value = floorData[i].internal_wall_length;
        document.getElementById(`innerWallThickness-${i}`).value = floorData[i].internal_wall_thickness;

        updateInsulationOptions(i)
        // Обшивка внешних стен
        if (floorData[i].options.isExternalWallSheeting) {
            document.getElementById(`outerWallsCover-${i}`).classList.remove('hidden');
             if(selectOSBExternal) selectOSBExternal.value = floorData[i].OSB_external_wall;
             if(selectVaporBarrierExternal) selectVaporBarrierExternal.value = floorData[i].steam_waterproofing_external_wall;
             if(selectWindProtectionExternal) selectWindProtectionExternal.value = floorData[i].windscreen_extern_wall;
             if(selectInsulationExternal) selectInsulationExternal.value = floorData[i].insulation_external_wall;
        }
        // Обшивка внутренних стен
        if (floorData[i].options.isInternalWallSheeting){
            document.getElementById(`innerWalls-${i}`).classList.remove('hidden');
            const selectOSBInternal = document.getElementById(`innerOsb-${i}`)
            if(selectOSBInternal) selectOSBInternal.value = floorData[i].OSB_internal_wall;
        }
        // Окна и двери
        if (floorData[i].windows.length > 0 || floorData[i].externalDoors.length > 0 || floorData[i].internalDoors.length > 0){
            document.getElementById(`windowsDoors-${i}`).classList.remove('hidden');

        }

        // Перекрытия
        if (floorData[i].options.isOverlaps){
            document.getElementById(`overlaps-${i}`).classList.remove('hidden');
            if(selectFloorThickness) selectFloorThickness.value = floorData[i].overlap_thickness;
            updateInsulationOptions(i)
            if(selectFloorOSB) selectFloorOSB.value = floorData[i].OSB_thickness;
            if(selectFloorVaporBarrier) selectFloorVaporBarrier.value = floorData[i].steam_waterproofing_thickness;
            if(selectFloorWindProtection) selectFloorWindProtection.value = floorData[i].windscreen_thickness;
            if(selectFloorInsulation) selectFloorInsulation.value = floorData[i].insulation_thickness;
        }
    }
    populateWindowsAndDoors(floorData)

}

function collectFormData() {
    const floors = [];
    const floorCount = parseInt(document.getElementById('floorCount').value);

    for (let i = 0; i < floorCount; i++) {
        // Окна
        const windows = Array.from(document.querySelectorAll(`#windowsContainer-${i} .window-group`)).map(group => ({
            id: null, // Если нужно, можно добавлять ID
            type: "window",
            width: parseFloat(group.querySelector('input[name="windowWidth"]').value),
            height: parseFloat(group.querySelector('input[name="windowHeight"]').value),
            amount: parseInt(group.querySelector('input[name="windowCount"]').value)
        }));

        // Внешние двери
        const externalDoors = Array.from(document.querySelectorAll(`#externalDoorsContainer-${i} .door-group`)).map(group => ({
            id: null,
            type: "externalDoor",
            width: parseFloat(group.querySelector('input[name="extDoorWidth"]').value),
            height: parseFloat(group.querySelector('input[name="extDoorHeight"]').value),
            amount: parseInt(group.querySelector('input[name="extDoorCount"]').value)
        }));

        // Внутренние двери
        const internalDoors = Array.from(document.querySelectorAll(`#internalDoorsContainer-${i} .door-group`)).map(group => ({
            id: null,
            type: "internalDoor",
            width: parseFloat(group.querySelector('input[name="intDoorWidth"]').value),
            height: parseFloat(group.querySelector('input[name="intDoorHeight"]').value),
            amount: parseInt(group.querySelector('input[name="intDoorCount"]').value)
        }));

        // Проверка видимости блоков
        const isExternalWallSheeting = !document.getElementById(`outerWallsCover-${i}`).classList.contains('hidden');
        const isInternalWallSheeting = !document.getElementById(`innerWalls-${i}`).classList.contains('hidden');
        const isOverlaps = !document.getElementById(`overlaps-${i}`).classList.contains('hidden');

        // Данные по этажу
        const floorData = {
            id: null,  // Если ID нужен, можно добавить логику
            calculation_id: null, // Аналогично с calculation_id
            amount_floor: floorCount,
            floor_number: i + 1,
            floor_height: parseFloat(document.getElementById(`floorHeight-${i}`).value),
            perimeter_of_external_walls: parseFloat(document.getElementById(`wallPerimeter-${i}`).value),
            base_area: parseFloat(document.getElementById(`baseArea-${i}`).value),
            external_wall_thickness: parseInt(document.getElementById(`wallThickness-${i}`).value),
            internal_wall_length: parseFloat(document.getElementById(`innerWallLength-${i}`).value),
            internal_wall_thickness: parseInt(document.getElementById(`innerWallThickness-${i}`).value),

            // Обшивка наружных стен
            OSB_external_wall: isExternalWallSheeting ? document.getElementById(`osb-${i}`).value : null,
            steam_waterproofing_external_wall: isExternalWallSheeting ? document.getElementById(`vaporBarrier-${i}`).value : null,
            windscreen_extern_wall: isExternalWallSheeting ? document.getElementById(`windProtection-${i}`).value : null,
            insulation_external_wall: isExternalWallSheeting ? document.getElementById(`insulation-${i}`).value : null,

            // Перекрытия
            overlap_thickness: isOverlaps ? parseInt(document.getElementById(`floorThickness-${i}`)?.value) || null : null,
            OSB_thickness: isOverlaps ? document.getElementById(`floorOsb-${i}`)?.value || null : null,
            steam_waterproofing_thickness: isOverlaps ? document.getElementById(`floorVaporBarrier-${i}`)?.value || null : null,
            windscreen_thickness: isOverlaps ? document.getElementById(`floorWindProtection-${i}`)?.value || null : null,
            insulation_thickness: isOverlaps ? document.getElementById(`floorInsulation-${i}`)?.value || null : null,

            // Обшивка внутренних стен
            OSB_internal_wall: isInternalWallSheeting ? document.getElementById(`innerOsb-${i}`)?.value || null : null,

            // Окна и двери
            windows: windows,
            externalDoors: externalDoors,
            internalDoors: internalDoors,

            // Опции
            options: {
                isInternalWallSheeting: isInternalWallSheeting,
                isExternalWallSheeting: isExternalWallSheeting,
                isOverlaps: isOverlaps
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
    let query = "saveCarcasData";
    //if (floorData.length !== 0) query = "updateCarcasData"
    try {
        const response = await fetch(query, {
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
