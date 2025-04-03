// scriptsCarcas.js - полный рабочий код с валидацией

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация при загрузке страницы
    setupValidation();
    setupAutoSave();
});

// ==================== ВАЛИДАЦИЯ ====================

/**
 * Настраивает валидацию для всех полей ввода
 */
function setupValidation() {
    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
    });
}

/**
 * Валидирует поле ввода в зависимости от его типа
 */
function validateField(input) {
    const fieldId = input.id;
    const value = input.value.trim();
    const errorElement = document.getElementById(`${fieldId}-error`);

    input.classList.remove('is-invalid');
    if (errorElement) errorElement.textContent = '';

    if (fieldId.includes('Height') || fieldId.includes('Perimeter') ||
        fieldId.includes('Area') || fieldId.includes('Length')) {
        validateNumericField(input, value);
    } else if (fieldId.includes('count')) {
        validateCountField(input, value);
    }
}

/**
 * Валидация числовых полей (высота, периметр, площадь и т.д.)
 */
function validateNumericField(input, value) {
    if (!value) return;

    if (!/^\d*\.?\d+$/.test(value)) {
        showError(input.id, 'Введите корректное число');
    } else if (parseFloat(value) <= 0) {
        showError(input.id, 'Значение должно быть больше 0');
    } else if (parseFloat(value) > 1000) {
        showError(input.id, 'Значение слишком большое');
        input.value = '1000';
    }
}

/**
 * Валидация полей с количеством (целые числа)
 */
function validateCountField(input, value) {
    if (!value) return;

    if (!/^\d+$/.test(value)) {
        showError(input.id, 'Введите целое число');
    } else if (parseInt(value) <= 0) {
        showError(input.id, 'Количество должно быть больше 0');
    }
}

/**
 * Фильтрация ввода для числовых полей
 */
function validateNumericInput(input, allowDecimal = true, maxValue = null) {
    let value = input.value;
    let newValue = value.replace(/[^\d.]/g, '');

    if (!allowDecimal) {
        newValue = newValue.replace(/\./g, '');
    } else {
        const dotIndex = newValue.indexOf('.');
        if (dotIndex !== -1) {
            newValue = newValue.substring(0, dotIndex + 1) +
                newValue.substring(dotIndex + 1).replace(/\./g, '');
        }
    }

    if (maxValue !== null && newValue && parseFloat(newValue) > maxValue) {
        newValue = maxValue.toString();
    }

    input.value = newValue;
}

/**
 * Проверка количества этажей (максимум 2)
 */
function validateFloorCount(input) {
    const value = parseInt(input.value);
    if (value > 2) {
        input.value = '2';
        showError('floorCount', 'Максимальное количество этажей - 2');
    } else {
        hideError('floorCount');
    }
}

/**
 * Показывает сообщение об ошибке
 */
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(`${inputId}-error`);

    if (input) input.classList.add('is-invalid');
    if (error) {
        error.textContent = message;
    } else if (input) {
        const errorElement = document.createElement('div');
        errorElement.id = `${inputId}-error`;
        errorElement.className = 'invalid-feedback';
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
    }
}

/**
 * Скрывает сообщение об ошибке
 */
function hideError(inputId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(`${inputId}-error`);
    if (input) input.classList.remove('is-invalid');
    if (error) error.textContent = '';
}

/**
 * Сбрасывает все ошибки
 */
function resetErrors() {
    document.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(el => {
        el.textContent = '';
    });
}

// ==================== АВТОСОХРАНЕНИЕ ====================

/**
 * Настраивает автосохранение при изменении полей
 */
function setupAutoSave() {
    document.querySelectorAll("input, select").forEach((element) => {
        element.addEventListener("input", () => {
            const floorsData = collectFormData();
            if (floorsData) saveFloorsToLocalStorage(floorsData);
        });
    });
}

/**
 * Сохраняет данные в localStorage
 */
function saveFloorsToLocalStorage(floorsData) {
    localStorage.setItem("floorsData", JSON.stringify(floorsData));
}

/**
 * Загружает данные из localStorage
 */
function loadFloorsFromLocalStorage() {
    const storedData = localStorage.getItem("floorsData");
    return storedData ? JSON.parse(storedData) : null;
}

// ==================== РАБОТА С ЭТАЖАМИ ====================

/**
 * Возвращает правильное окончание для слова "этаж"
 */
function getFloorSuffix(count) {
    if (count === 1) return "";
    if (count >= 2 && count <= 4) return "а";
    return "ов";
}

/**
 * Обновляет заголовок с количеством этажей
 */
function updateFloorHeader(count) {
    const floorHeader = document.getElementById('floorHeader');
    if (floorHeader) floorHeader.innerText = `${count} этаж${getFloorSuffix(count)}`;
}

/**
 * Обработчик изменения количества этажей
 */
function onFloorCountChange(value) {
    const section = document.getElementById('calculation-div');
    if (!isNaN(value)) {
        const selectedFloorCount = parseInt(value);
        updateFloorHeader(selectedFloorCount);
        updateFloors(selectedFloorCount);
        if (section) section.classList.remove('hidden');
    } else {
        if (section) section.classList.add('hidden');
        updateFloors(0);
        updateFloorHeader('');
    }
}

/**
 * Переключает видимость секции
 */
function toggleSection(id) {
    const section = document.getElementById(id);
    if (section) section.classList.toggle('hidden');
}

/**
 * Обновляет поля для этажей
 */
function updateFloors(count) {
    const floorsContainer = document.getElementById("floors-container");
    if (!floorsContainer) return;

    while (floorsContainer.firstChild) {
        floorsContainer.removeChild(floorsContainer.firstChild);
    }

    for (let i = 0; i < count; i++) {
        const floorData = document.createElement('div');
        floorData.classList.add('floor-data');
        floorData.innerHTML = getFloorHtml(i);
        floorsContainer.appendChild(floorData);
        updateInsulationOptions(i);
    }
    setupAutoSave();
}

/**
 * Генерирует HTML для этажа
 */
function getFloorHtml(floorIndex) {
    return `
    <h2>Этаж ${floorIndex + 1}</h2>
    <div class="form-group">
        <label for="floorHeight-${floorIndex}">Высота этажа</label>
        <input type="text" class="form-control" id="floorHeight-${floorIndex}" 
               placeholder="Введите высоту" oninput="validateNumericInput(this, true, 10)">
        <span class="unit">м</span>
        <div class="invalid-feedback" id="floorHeight-${floorIndex}-error"></div>
    </div>
    <div class="form-group">
        <label for="wallPerimeter-${floorIndex}">Периметр внешних стен</label>
        <input type="text" class="form-control" id="wallPerimeter-${floorIndex}" 
               placeholder="Введите периметр" oninput="validateNumericInput(this, true, 100)">
        <span class="unit">м</span>
        <div class="invalid-feedback" id="wallPerimeter-${floorIndex}-error"></div>
    </div>
    <div class="form-group">
        <label for="baseArea-${floorIndex}">Площадь основания</label>
        <input type="text" class="form-control" id="baseArea-${floorIndex}" 
               placeholder="Введите площадь" oninput="validateNumericInput(this, true, 500)">
        <span class="unit">м²</span>
        <div class="invalid-feedback" id="baseArea-${floorIndex}-error"></div>
    </div>
    <div class="form-group">
        <label for="wallThickness-${floorIndex}">Толщина внешних стен</label>
        <select class="form-control" id="wallThickness-${floorIndex}" onchange="updateInsulationOptions(${floorIndex})">
            <option>100</option>
            <option>150</option>
            <option>200</option>
            <option>250</option>
        </select>
        <span class="unit">мм</span>
    </div>
    <div class="form-group">
        <label for="innerWallLength-${floorIndex}">Длина внутренних стен</label>
        <input type="text" class="form-control" id="innerWallLength-${floorIndex}" 
               placeholder="Введите длину" oninput="validateNumericInput(this, true, 100)">
        <span class="unit">м</span>
        <div class="invalid-feedback" id="innerWallLength-${floorIndex}-error"></div>
    </div>
    <div class="form-group">
        <label for="innerWallThickness-${floorIndex}">Толщина внутренних стен</label>
        <select class="form-control" id="innerWallThickness-${floorIndex}">
            <option>100</option>
            <option>150</option>
            <option>200</option>
            <option>250</option>
        </select>
        <span class="unit">мм</span>
    </div>

    <!-- Блоки обшивки, окон, дверей и перекрытий -->
    ${getAdditionalSectionsHtml(floorIndex)}
    `;
}

/**
 * Генерирует HTML для дополнительных секций этажа
 */
function getAdditionalSectionsHtml(floorIndex) {
    return `
    <div class="add-calculation">
        <i class="bi bi-plus-circle toggle-icon" onclick="toggleSection('outerWallsCover-${floorIndex}')"></i>
        <span class="toggle-text">Учесть обшивку внешних стен</span>
        <div id="outerWallsCover-${floorIndex}" class="hidden">
            <div class="form-group">
                <label for="osb-${floorIndex}">ОСБ</label>
                <select class="form-control" id="osb-${floorIndex}">
                    <option>9</option>
                    <option>10</option>
                    <option>15</option>
                    <option>18</option>
                </select>
                <span class="unit">мм</span>
            </div>
            <div class="form-group">
                <label for="vaporBarrier-${floorIndex}">Парогидроизоляция</label>
                <select class="form-control" id="vaporBarrier-${floorIndex}">
                    <option>Ондутис</option>
                    <option>Пароизоляция Axton (b)</option>
                    <option>Пароизоляционная пленка Ютафол Н 96 Сильвер</option>
                    <option>Пароизоляция В</option>
                </select>
            </div>
            <div class="form-group">
                <label for="windProtection-${floorIndex}">Ветрозащита</label>
                <select class="form-control" id="windProtection-${floorIndex}">
                    <option>Ветро-влагозащитная мембрана Brane А</option>
                    <option>Паропроницаемая ветро-влагозащита A Optima</option>
                    <option>Гидро-ветрозащита Тип А</option>
                </select>
            </div>
            <div class="form-group">
                <label for="insulation-${floorIndex}">Утеплитель</label>
                <select class="form-control" id="insulation-${floorIndex}">
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
        <i class="bi bi-plus-circle toggle-icon" onclick="toggleSection('innerWalls-${floorIndex}')"></i>
        <span class="toggle-text">Добавить расчет обшивки внутренних стен</span>
        <div id="innerWalls-${floorIndex}" class="hidden">
            <div class="form-group">
                <label for="innerOsb-${floorIndex}">ОСБ</label>
                <select class="form-control" id="innerOsb-${floorIndex}">
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
        <i class="bi bi-plus-circle toggle-icon" onclick="toggleSection('windowsDoors-${floorIndex}')"></i>
        <span class="toggle-text">Учесть двери и окна</span>
        <div id="windowsDoors-${floorIndex}" class="hidden">
            <div class="subsection">
                <h5>Оконные проемы</h5>
                <div id="windowsContainer-${floorIndex}"></div>
                <button type="button" class="btn btn-secondary" onclick="addWindow(${floorIndex})">+ Добавить окно</button>
            </div>
            <div class="subsection">
                <h5>Дверные проемы внешние</h5>
                <div id="externalDoorsContainer-${floorIndex}"></div>
                <button type="button" class="btn btn-secondary" onclick="addExternalDoor(${floorIndex})">+ Добавить дверь</button>
            </div>
            <div class="subsection">
                <h5>Дверные проемы внутренние</h5>
                <div id="internalDoorsContainer-${floorIndex}"></div>
                <button type="button" class="btn btn-secondary" onclick="addInternalDoor(${floorIndex})">+ Добавить дверь</button>
            </div>
        </div>
    </div>
    <br>

    <div class="add-calculation">
        <i class="bi bi-plus-circle toggle-icon" onclick="toggleSection('overlaps-${floorIndex}')"></i>
        <span class="toggle-text">Добавить расчет перекрытий</span>
        <div id="overlaps-${floorIndex}" class="hidden">
            <div class="form-group">
                <label for="floorThickness-${floorIndex}">Толщина перекрытия</label>
                <select class="form-control" id="floorThickness-${floorIndex}" onchange="updateInsulationOptions(${floorIndex})">
                    <option>200</option>
                    <option>250</option>
                </select>
                <span class="unit">мм</span>
            </div>
            <div class="form-group">
                <label for="floorOsb-${floorIndex}">ОСБ</label>
                <select class="form-control" id="floorOsb-${floorIndex}">
                    <option>9</option>
                    <option>10</option>
                    <option>15</option>
                    <option>18</option>
                </select>
                <span class="unit">мм</span>
            </div>
            <div class="form-group">
                <label for="floorVaporBarrier-${floorIndex}">Парогидроизоляция</label>
                <select class="form-control" id="floorVaporBarrier-${floorIndex}">
                    <option>Ондутис</option>
                    <option>Пароизоляция Axton (b)</option>
                    <option>Пароизоляционная пленка Ютафол Н 96 Сильвер</option>
                    <option>Пароизоляция В</option>
                </select>
            </div>
            <div class="form-group">
                <label for="floorWindProtection-${floorIndex}">Ветрозащита</label>
                <select class="form-control" id="floorWindProtection-${floorIndex}">
                    <option>Ветро-влагозащитная мембрана Brane А</option>
                    <option>Паропроницаемая ветро-влагозащита A Optima</option>
                    <option>Гидро-ветрозащита Тип А</option>
                </select>
            </div>
            <div class="form-group">
                <label for="floorInsulation-${floorIndex}">Утеплитель</label>
                <select class="form-control" id="floorInsulation-${floorIndex}">
                    <option>Эковер 200 мм</option>
                    <option>Фасад 200 мм</option>
                    <option>Эковер 250 мм</option>
                </select>
            </div>
        </div>
    </div>
    <br>
    `;
}

// ==================== ОКНА И ДВЕРИ ====================

/**
 * Добавляет блок окна
 */
function addWindow(floorIndex) {
    const container = document.getElementById(`windowsContainer-${floorIndex}`);
    if (!container) return;

    const windowId = `window-${floorIndex}-${container.children.length}`;
    const windowBlock = document.createElement('div');
    windowBlock.classList.add('window-group');
    windowBlock.innerHTML = `
    <div class="form-group">
        <label for="${windowId}-width">Ширина окна (м)</label>
        <input type="text" class="form-control" name="windowWidth" id="${windowId}-width" 
               placeholder="Введите ширину" oninput="validateNumericInput(this, true, 5)">
        <div class="invalid-feedback" id="${windowId}-width-error"></div>
    </div>
    <div class="form-group">
        <label for="${windowId}-height">Высота окна (м)</label>
        <input type="text" class="form-control" name="windowHeight" id="${windowId}-height" 
               placeholder="Введите высоту" oninput="validateNumericInput(this, true, 5)">
        <div class="invalid-feedback" id="${windowId}-height-error"></div>
    </div>
    <div class="form-group">
        <label for="${windowId}-count">Количество (шт)</label>
        <input type="text" class="form-control" name="windowCount" id="${windowId}-count" 
               placeholder="Введите количество" oninput="validateIntegerInput(this)">
        <div class="invalid-feedback" id="${windowId}-count-error"></div>
    </div>
    <div class="form-group">
        <button type="button" class="btn btn-danger delete-btn" 
                onclick="this.parentElement.parentElement.remove()">Удалить окно</button>
    </div>
    `;
    container.appendChild(windowBlock);
}

/**
 * Добавляет блок внешней двери
 */
function addExternalDoor(floorIndex) {
    const container = document.getElementById(`externalDoorsContainer-${floorIndex}`);
    if (!container) return;

    const doorId = `external-door-${floorIndex}-${container.children.length}`;
    const doorBlock = document.createElement('div');
    doorBlock.classList.add('door-group');
    doorBlock.innerHTML = `
    <div class="form-group">
        <label for="${doorId}-width">Ширина двери (м)</label>
        <input type="text" class="form-control" name="extDoorWidth" id="${doorId}-width" 
               placeholder="Введите ширину" oninput="validateNumericInput(this, true, 5)">
        <div class="invalid-feedback" id="${doorId}-width-error"></div>
    </div>
    <div class="form-group">
        <label for="${doorId}-height">Высота двери (м)</label>
        <input type="text" class="form-control" name="extDoorHeight" id="${doorId}-height" 
               placeholder="Введите высоту" oninput="validateNumericInput(this, true, 5)">
        <div class="invalid-feedback" id="${doorId}-height-error"></div>
    </div>
    <div class="form-group">
        <label for="${doorId}-count">Количество (шт)</label>
        <input type="text" class="form-control" name="extDoorCount" id="${doorId}-count" 
               placeholder="Введите количество" oninput="validateIntegerInput(this)">
        <div class="invalid-feedback" id="${doorId}-count-error"></div>
    </div>
    <div class="form-group">
        <button type="button" class="btn btn-danger delete-btn" 
                onclick="this.parentElement.parentElement.remove()">Удалить дверь</button>
    </div>
    `;
    container.appendChild(doorBlock);
}

/**
 * Добавляет блок внутренней двери
 */
function addInternalDoor(floorIndex) {
    const container = document.getElementById(`internalDoorsContainer-${floorIndex}`);
    if (!container) return;

    const doorId = `internal-door-${floorIndex}-${container.children.length}`;
    const doorBlock = document.createElement('div');
    doorBlock.classList.add('door-group');
    doorBlock.innerHTML = `
    <div class="form-group">
        <label for="${doorId}-width">Ширина двери (м)</label>
        <input type="text" class="form-control" name="intDoorWidth" id="${doorId}-width" 
               placeholder="Введите ширину" oninput="validateNumericInput(this, true, 5)">
        <div class="invalid-feedback" id="${doorId}-width-error"></div>
    </div>
    <div class="form-group">
        <label for="${doorId}-height">Высота двери (м)</label>
        <input type="text" class="form-control" name="intDoorHeight" id="${doorId}-height" 
               placeholder="Введите высоту" oninput="validateNumericInput(this, true, 5)">
        <div class="invalid-feedback" id="${doorId}-height-error"></div>
    </div>
    <div class="form-group">
        <label for="${doorId}-count">Количество (шт)</label>
        <input type="text" class="form-control" name="intDoorCount" id="${doorId}-count" 
               placeholder="Введите количество" oninput="validateIntegerInput(this)">
        <div class="invalid-feedback" id="${doorId}-count-error"></div>
    </div>
    <div class="form-group">
        <button type="button" class="btn btn-danger delete-btn" 
                onclick="this.parentElement.parentElement.remove()">Удалить дверь</button>
    </div>
    `;
    container.appendChild(doorBlock);
}

// ==================== УТЕПЛИТЕЛИ ====================

/**
 * Обновляет варианты утеплителей в зависимости от толщины стены/перекрытия
 */
function updateInsulationOptions(floorIndex) {
    const wallThickness = document.getElementById(`wallThickness-${floorIndex}`).value;
    const overlapThickness = document.getElementById(`floorThickness-${floorIndex}`)?.value || '200';

    const insulationSelect = document.getElementById(`insulation-${floorIndex}`);
    const insulationOverlapSelect = document.getElementById(`floorInsulation-${floorIndex}`);

    if (insulationSelect) {
        insulationSelect.innerHTML = '';
        const insulationWallOptions = insulation[wallThickness] || [];
        insulationWallOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.name;
            optionElement.textContent = option.name;
            insulationSelect.appendChild(optionElement);
        });
    }

    if (insulationOverlapSelect) {
        insulationOverlapSelect.innerHTML = '';
        const insulationOverlapOptions = insulation[overlapThickness] || [];
        insulationOverlapOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.name;
            optionElement.textContent = option.name;
            insulationOverlapSelect.appendChild(optionElement);
        });
    }
}

// ==================== СОХРАНЕНИЕ АДРЕСА ====================

/**
 * Сохраняет адрес объекта
 */
async function saveAddress() {
    const address = document.getElementById('addressInput').value.trim();
    if (!address) {
        showError('addressInput', 'Введите адрес объекта');
        return;
    }

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
            window.location.reload();
        } else {
            console.log('Ошибка при сохранении адреса:', data.message);
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
    }
}

// ==================== СБРОС ДАННЫХ ====================

/**
 * Сбрасывает все данные к значениям по умолчанию
 */
function clearCalculation() {
    if (!confirm('Вы уверены, что хотите сбросить все данные?')) return;

    document.getElementById('addressInput').value = '';
    const floorCount = document.getElementById('floorCount').value || 1;

    const floorsData = [];
    for (let i = 0; i < floorCount; i++) {
        floorsData.push({
            floor_number: i + 1,
            floor_height: '',
            perimeter_of_external_walls: '',
            base_area: '',
            external_wall_thickness: 200,
            internal_wall_length: '',
            internal_wall_thickness: 100,
            windows: [],
            externalDoors: [],
            internalDoors: []
        });
    }

    loadFloorsSavedToDB(floorsData);
    alert('Все данные сброшены до значений по умолчанию.');
}

// ==================== НАВИГАЦИЯ ====================

/**
 * Возвращает на предыдущую страницу
 */
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

// ==================== ЗАГРУЗКА ДАННЫХ ====================

/**
 * Загружает данные при открытии страницы
 */
function onLoadCarcas(floorsDBData) {
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

    if (floorsDBData !== null && floorsDBData.length > 0) {
        loadFloorsSavedToDB(floorsDBData, false);
    } else if (localStorage.getItem('floorsData') !== null) {
        loadFloorsSavedToDB(loadFloorsFromLocalStorage().floors);
    }
}

/**
 * Округляет число до указанного количества знаков после запятой
 */
function roundNumber(value, decimals = 2) {
    return parseFloat(value.toFixed(decimals));
}

/**
 * Заполняет окна и двери из сохраненных данных
 */
function populateWindowsAndDoors(floorData) {
    floorData.forEach((floor, i) => {
        if (floor.windows.length > 0 || floor.externalDoors.length > 0 || floor.internalDoors.length > 0) {
            const section = document.getElementById(`windowsDoors-${i}`);
            if (section) section.classList.remove('hidden');
        }

        floor.windows.forEach((window) => {
            addWindow(i);
            const index = document.getElementById(`windowsContainer-${i}`).children.length - 1;
            document.getElementById(`window-${i}-${index}-width`).value = roundNumber(window.width);
            document.getElementById(`window-${i}-${index}-height`).value = roundNumber(window.height);
            document.getElementById(`window-${i}-${index}-count`).value = window.amount;
        });

        floor.externalDoors.forEach((door) => {
            addExternalDoor(i);
            const index = document.getElementById(`externalDoorsContainer-${i}`).children.length - 1;
            document.getElementById(`external-door-${i}-${index}-width`).value = roundNumber(door.width);
            document.getElementById(`external-door-${i}-${index}-height`).value = roundNumber(door.height);
            document.getElementById(`external-door-${i}-${index}-count`).value = door.amount;
        });

        floor.internalDoors.forEach((door) => {
            addInternalDoor(i);
            const index = document.getElementById(`internalDoorsContainer-${i}`).children.length - 1;
            document.getElementById(`internal-door-${i}-${index}-width`).value = roundNumber(door.width);
            document.getElementById(`internal-door-${i}-${index}-height`).value = roundNumber(door.height);
            document.getElementById(`internal-door-${i}-${index}-count`).value = door.amount;
        });
    });
}

/**
 * Загружает сохраненные данные этажей
 */
function loadFloorsSavedToDB(floorData, savedToLocalStorage = true) {
    if (floorData.length === 0) return;

    if (!savedToLocalStorage) {
        const btn = document.getElementById('calculate-btn');
        if (btn) btn.innerText = 'Обновить и рассчитать';
    }

    onFloorCountChange(floorData.length);
    const select = document.getElementById('floorCount');
    if (select) select.value = floorData.length;

    for (let i = 0; i < floorData.length; i++) {
        // Основные параметры
        setValue(`floorHeight-${i}`, floorData[i].floor_height);
        setValue(`wallPerimeter-${i}`, floorData[i].perimeter_of_external_walls);
        setValue(`baseArea-${i}`, floorData[i].base_area);
        setValue(`wallThickness-${i}`, floorData[i].external_wall_thickness);
        setValue(`innerWallLength-${i}`, floorData[i].internal_wall_length);
        setValue(`innerWallThickness-${i}`, floorData[i].internal_wall_thickness);

        updateInsulationOptions(i);

        // Обшивка внешних стен
        if (floorData[i].options?.isExternalWallSheeting) {
            toggleSectionVisibility(`outerWallsCover-${i}`, true);
            setValue(`osb-${i}`, floorData[i].OSB_external_wall);
            setValue(`vaporBarrier-${i}`, floorData[i].steam_waterproofing_external_wall);
            setValue(`windProtection-${i}`, floorData[i].windscreen_extern_wall);
            setValue(`insulation-${i}`, floorData[i].insulation_external_wall);
        }

        // Обшивка внутренних стен
        if (floorData[i].options?.isInternalWallSheeting) {
            toggleSectionVisibility(`innerWalls-${i}`, true);
            setValue(`innerOsb-${i}`, floorData[i].OSB_internal_wall);
        }

        // Перекрытия
        if (floorData[i].options?.isOverlaps) {
            toggleSectionVisibility(`overlaps-${i}`, true);
            setValue(`floorThickness-${i}`, floorData[i].overlap_thickness);
            updateInsulationOptions(i);
            setValue(`floorOsb-${i}`, floorData[i].OSB_thickness);
            setValue(`floorVaporBarrier-${i}`, floorData[i].steam_waterproofing_thickness);
            setValue(`floorWindProtection-${i}`, floorData[i].windscreen_thickness);
            setValue(`floorInsulation-${i}`, floorData[i].insulation_thickness);
        }
    }
    populateWindowsAndDoors(floorData);
}

/**
 * Устанавливает значение элемента
 */
function setValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (element && value !== undefined && value !== null) {
        element.value = value;
    }
}

/**
 * Переключает видимость секции
 */
function toggleSectionVisibility(sectionId, show) {
    const section = document.getElementById(sectionId);
    if (section) {
        if (show) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    }
}

// ==================== СОБИРАЕМ ДАННЫЕ ФОРМЫ ====================

/**
 * Собирает все данные формы
 */
function collectFormData() {
    const floors = [];
    const floorCount = parseInt(document.getElementById('floorCount').value) || 0;

    for (let i = 0; i < floorCount; i++) {
        const windows = collectWindowData(i);
        const externalDoors = collectDoorData(i, 'external');
        const internalDoors = collectDoorData(i, 'internal');

        const floorData = {
            floor_number: i + 1,
            floor_height: getFloatValue(`floorHeight-${i}`),
            perimeter_of_external_walls: getFloatValue(`wallPerimeter-${i}`),
            base_area: getFloatValue(`baseArea-${i}`),
            external_wall_thickness: getIntValue(`wallThickness-${i}`),
            internal_wall_length: getFloatValue(`innerWallLength-${i}`),
            internal_wall_thickness: getIntValue(`innerWallThickness-${i}`),
            windows: windows,
            externalDoors: externalDoors,
            internalDoors: internalDoors,
            options: {
                isExternalWallSheeting: isSectionVisible(`outerWallsCover-${i}`),
                isInternalWallSheeting: isSectionVisible(`innerWalls-${i}`),
                isOverlaps: isSectionVisible(`overlaps-${i}`)
            }
        };

        // Добавляем данные обшивки, если секция видима
        if (floorData.options.isExternalWallSheeting) {
            floorData.OSB_external_wall = getValue(`osb-${i}`);
            floorData.steam_waterproofing_external_wall = getValue(`vaporBarrier-${i}`);
            floorData.windscreen_extern_wall = getValue(`windProtection-${i}`);
            floorData.insulation_external_wall = getValue(`insulation-${i}`);
        }

        // Добавляем данные перекрытий, если секция видима
        if (floorData.options.isOverlaps) {
            floorData.overlap_thickness = getIntValue(`floorThickness-${i}`);
            floorData.OSB_thickness = getValue(`floorOsb-${i}`);
            floorData.steam_waterproofing_thickness = getValue(`floorVaporBarrier-${i}`);
            floorData.windscreen_thickness = getValue(`floorWindProtection-${i}`);
            floorData.insulation_thickness = getValue(`floorInsulation-${i}`);
        }

        // Добавляем данные обшивки внутренних стен, если секция видима
        if (floorData.options.isInternalWallSheeting) {
            floorData.OSB_internal_wall = getValue(`innerOsb-${i}`);
        }

        floors.push(floorData);
    }

    return {
        address: document.getElementById('addressInput').value.trim(),
        floors: floors
    };
}

/**
 * Собирает данные окон для этажа
 */
function collectWindowData(floorIndex) {
    const windows = [];
    const container = document.getElementById(`windowsContainer-${floorIndex}`);
    if (!container) return windows;

    const windowGroups = container.querySelectorAll('.window-group');
    windowGroups.forEach((group, index) => {
        windows.push({
            width: getFloatValue(`window-${floorIndex}-${index}-width`),
            height: getFloatValue(`window-${floorIndex}-${index}-height`),
            amount: getIntValue(`window-${floorIndex}-${index}-count`)
        });
    });

    return windows;
}

/**
 * Собирает данные дверей для этажа
 */
function collectDoorData(floorIndex, type) {
    const doors = [];
    const container = document.getElementById(`${type}DoorsContainer-${floorIndex}`);
    if (!container) return doors;

    const doorGroups = container.querySelectorAll('.door-group');
    const prefix = type === 'external' ? 'extDoor' : 'intDoor';

    doorGroups.forEach((group, index) => {
        doors.push({
            width: getFloatValue(`${type}-door-${floorIndex}-${index}-width`),
            height: getFloatValue(`${type}-door-${floorIndex}-${index}-height`),
            amount: getIntValue(`${type}-door-${floorIndex}-${index}-count`)
        });
    });

    return doors;
}

/**
 * Проверяет, видима ли секция
 */
function isSectionVisible(sectionId) {
    const section = document.getElementById(sectionId);
    return section && !section.classList.contains('hidden');
}

/**
 * Получает значение поля как число с плавающей точкой
 */
function getFloatValue(elementId) {
    const value = document.getElementById(elementId)?.value;
    return value ? parseFloat(value) : 0;
}

/**
 * Получает значение поля как целое число
 */
function getIntValue(elementId) {
    const value = document.getElementById(elementId)?.value;
    return value ? parseInt(value) : 0;
}

/**
 * Получает значение поля как строку
 */
function getValue(elementId) {
    return document.getElementById(elementId)?.value || '';
}

// ==================== СОХРАНЕНИЕ И РАСЧЕТ ====================

/**
 * Сохраняет данные и выполняет расчет
 */
async function calculateAndSave(clientId) {
    if (!validateCarcasForm()) {
        scrollToFirstError();
        return;
    }

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
            alert('Данные сохранены успешно!');
            window.location.href = `/client/${clientId}/${result.calculationId}/carcas/result`;
        } else {
            alert('Ошибка при сохранении: ' + result.message);
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
        alert('Произошла ошибка при отправке данных');
    }
}

/**
 * Прокручивает страницу к первой ошибке
 */
function scrollToFirstError() {
    const firstError = document.querySelector('.is-invalid');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Валидация всей формы каркаса
 */
function validateCarcasForm() {
    resetErrors();
    let isValid = true;

    // Проверка адреса
    if (!validateRequiredField('addressInput', 'Введите адрес объекта')) {
        isValid = false;
    }

    // Проверка количества этажей
    const floorCount = document.getElementById('floorCount').value;
    if (!floorCount || floorCount === 'Выберете количество этажей') {
        showError('floorCount', 'Выберите количество этажей');
        isValid = false;
    } else if (parseInt(floorCount) > 2) {
        showError('floorCount', 'Максимальное количество этажей - 2');
        isValid = false;
    }

    // Проверка данных для каждого этажа
    const floorCountNum = parseInt(floorCount) || 0;
    for (let i = 0; i < floorCountNum; i++) {
        if (!validateFloorData(i)) {
            isValid = false;
        }
    }

    return isValid;
}

/**
 * Проверка обязательного поля
 */
function validateRequiredField(fieldId, errorMessage) {
    const input = document.getElementById(fieldId);
    if (!input || !input.value.trim()) {
        showError(fieldId, errorMessage);
        return false;
    }
    return true;
}

/**
 * Проверка данных этажа
 */
function validateFloorData(floorIndex) {
    let isValid = true;
    const requiredFields = [
        `floorHeight-${floorIndex}`,
        `wallPerimeter-${floorIndex}`,
        `baseArea-${floorIndex}`,
        `innerWallLength-${floorIndex}`
    ];

    requiredFields.forEach(field => {
        if (!validateRequiredField(field, 'Это поле обязательно для заполнения')) {
            isValid = false;
        } else if (isNaN(getFloatValue(field))) {
            showError(field, 'Введите числовое значение');
            isValid = false;
        } else if (getFloatValue(field) <= 0) {
            showError(field, 'Значение должно быть больше 0');
            isValid = false;
        }
    });

    // Проверка окон
    if (!validateWindowGroups(floorIndex)) {
        isValid = false;
    }

    // Проверка дверей
    if (!validateDoorGroups(floorIndex, 'external')) {
        isValid = false;
    }
    if (!validateDoorGroups(floorIndex, 'internal')) {
        isValid = false;
    }

    return isValid;
}

/**
 * Проверка групп окон
 */
function validateWindowGroups(floorIndex) {
    const container = document.getElementById(`windowsContainer-${floorIndex}`);
    if (!container) return true;

    let isValid = true;
    const windows = container.querySelectorAll('.window-group');

    windows.forEach((window, index) => {
        const fields = [
            `window-${floorIndex}-${index}-width`,
            `window-${floorIndex}-${index}-height`,
            `window-${floorIndex}-${index}-count`
        ];

        fields.forEach(field => {
            if (!validateRequiredField(field, 'Заполните все параметры окна')) {
                isValid = false;
            }
        });
    });

    return isValid;
}

/**
 * Проверка групп дверей
 */
function validateDoorGroups(floorIndex, type) {
    const container = document.getElementById(`${type}DoorsContainer-${floorIndex}`);
    if (!container) return true;

    let isValid = true;
    const doors = container.querySelectorAll('.door-group');

    doors.forEach((door, index) => {
        const fields = [
            `${type}-door-${floorIndex}-${index}-width`,
            `${type}-door-${floorIndex}-${index}-height`,
            `${type}-door-${floorIndex}-${index}-count`
        ];

        fields.forEach(field => {
            if (!validateRequiredField(field, `Заполните все параметры ${type === 'external' ? 'внешней' : 'внутренней'} двери`)) {
                isValid = false;
            }
        });
    });

    return isValid;
}