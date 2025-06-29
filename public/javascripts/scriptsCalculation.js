document.addEventListener("DOMContentLoaded", function() {
    // Обработчик события для изменения текста кнопки "Статус"
    // document.getElementById('statusButton').addEventListener('click', function() {
    //     this.textContent = 'Актуализировать';
    // });

    // Пример использования функции для изменения текста элемента
    const calculations = document.querySelectorAll(".calculation");
    calculations.forEach(calculation => {
        const status = calculation.querySelector(".calculation-status").textContent;
        if (status === "Заключен договор") {
            const trashIcon = calculation.querySelector(".bi-trash");
            if (trashIcon) {
                trashIcon.style.display = "none";
            }
        }
    });

    // Обработчик события для изменения количества этажей
    const floorCountSelect = document.getElementById("floorCount");
    if (floorCountSelect) {
        const floorHeading = document.querySelector(".source-data-container h3");
        floorCountSelect.addEventListener("change", function() {
            const selectedFloorCount = floorCountSelect.value;
            floorHeading.textContent = `${selectedFloorCount} этаж${getFloorSuffix(selectedFloorCount)}`;
        });
    }

    function getFloorSuffix(count) {
        if (count === "1") {
            return "";
        } else if (count >= "2" && count <= "4") {
            return "а";
        } else {
            return "ов";
        }
    }

});

function goBackClientCard(){
    const pathParts = window.location.pathname.split("/"); // Разбиваем URL на части
    const clientId = pathParts[2]; // Получаем clientId (он находится на 2-м месте в массиве)

    if (clientId) {
        window.location.href = window.location.origin +`/client/${clientId}`;
    }
}
function onClickEdit(){
    const currentUrl = window.location.href; // Текущий URL
    const newUrl = currentUrl.replace(/\/result$/, ""); // Убираем `/carcas/result`
    window.location.href = newUrl; // Перенаправляем пользователя
    localStorage.removeItem("floorsData");
}

async function actualize(){
    try {
        const response = await fetch('result/actualize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        });

        const result = await response.json();

        if (result.success) {

            alert('Расчет актуализирован успешно!');
            window.location.reload();
        } else {
            console.log('Невозможно актуализировать расчет: ', result.message);
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
    }
}
function changeBtn(calculationStatus){
    const docButton = document.getElementById("document-div");
    const statusButton = document.getElementById("status-div");
    const actualizeButton = document.getElementById("actualize-div");
    const documentGet = document.getElementById("document-get-div");

    if (calculationStatus === "Не актуален") {
        actualizeButton.classList.remove("hidden");
    } else if (calculationStatus === "Актуален") {
        docButton.classList.remove("hidden");
    } else if (calculationStatus === "Заключен договор") {
        documentGet.classList.remove("hidden");
    }
    statusButton.classList.add("hidden");
}
async function getDocument(clientId, calculationId) {
    try{
        const button = event.target;
        button.disabled = true;
        button.innerHTML = 'Создание договора...';
        const response = await fetch(`/api/result/getDocument/${clientId}/${calculationId}`);
        if (!response.ok) {
            throw new Error('Ошибка при получении файла');
        } else {
            button.disabled = false;
            button.innerHTML = 'Скачать договор';
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "contract.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Ошибка загрузки:', error);
    }

}
function OnClickEditClient(){
    const lastName = document.getElementById("lastName");
    const firstName = document.getElementById("firstName");
    const middleName = document.getElementById("middleName");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const saveClientBtn = document.getElementById("save-client-btn");
    saveClientBtn.classList.remove('hidden');
    event.target.classList.add('hidden');
    const fields = [lastName, firstName, middleName, phone, email, address];

    fields.forEach(field => {
      field.readOnly = false;
      field.classList.remove('readonly');
    })

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
        showError('email', 'Пожалуйста, введите корректный email (только латинские символы)');
        isValid = false;
    }

    // Валидация адреса
    if (!address) {
        showError('address', 'Пожалуйста, введите адрес');
        isValid = false;
    }

    return {isValid, data: {lastName, firstName, middleName, cleanPhone, email, address}};
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
    // Проверка на кириллицу и другие недопустимые символы
    if (/[а-яА-Я]/.test(email)) {
        return false;
    }

    // Стандартная проверка формата email
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(String(email).toLowerCase());
}
async function OnClickSaveEditClient(clientId) {
    const valid = validateSaveClient();
    const dataValid = valid.data;
    console.log(valid);
    const user = JSON.parse(localStorage.getItem("user"));
    if (!valid.isValid) {
        return;
    }

    try {
        const checkResponse = await fetch('/client/check-exists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientId,
                phone: dataValid.cleanPhone,
                email: dataValid.email
            })
        });

        const checkData = await checkResponse.json();

        console.log(checkData);
        if (checkData.exists) {
            if (checkData.field === 'phone') {
                showError('phone', 'Клиент с таким телефоном уже существует');
            } else if (checkData.field === 'email') {
                showError('email', 'Клиент с таким email уже существует');
            }
            return;
        }

        const response = await fetch(`/client/${clientId}/update`, {
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
            window.location.reload();
        } else {
            alert('Невозможно добавить клиента: ' + data.message);
        }
    } catch (error) {
        alert('Ошибка сети: ' + error.message);
    }
}
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
async function documentSetStatus(clientId, calculationId){
    try{
        const response = await fetch('result/setDocumentStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        });
        const result = await response.json();
        if (result.success) {

            alert('Статус документа успешно изменен!');
            window.location.reload();
        } else {
            console.log('Невозможно изменить статус документа:', result.message);
        }
    } catch (error) {
        console.error('Ошибка загрузки:', error);
    }
}

function openCalculationPage(clientId, calculationId) {
    // Здесь вы можете добавить код для открытия новой страницы с расчетом
    console.log("Открыть страницу расчета:", calculationId);
    window.location.href = clientId+"/"+calculationId+"/carcas";
}

document.addEventListener("DOMContentLoaded", function() {
    const clientInfo = document.querySelector(".client-info");
    const createClientModal = new bootstrap.Modal(document.getElementById("createClientModal"));

    clientInfo.addEventListener("click", function(event) {
        event.preventDefault(); // Предотвращаем переход по ссылке, если это ссылка
        createClientModal.show();
    });
});
function onClickGetDocument() {
    const createDocumentModal = new bootstrap.Modal(document.getElementById("createDocumentModal"));
    createDocumentModal.show();
}