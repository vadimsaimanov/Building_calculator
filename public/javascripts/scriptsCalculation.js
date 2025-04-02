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

    if (calculationStatus === "Не актуален") {
        actualizeButton.classList.remove("hidden");
    } else if (calculationStatus === "Актуален") {
        docButton.classList.remove("hidden");
    }
    statusButton.classList.add("hidden");
}
async function getDocument(clientId, calculationId) {
    try{
        const response = await fetch(`/api/result/getDocument/${clientId}/${calculationId}`);
        if (!response.ok) {
            throw new Error('Ошибка при получении файла');
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
function OnClickEdit(){
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
async function OnClickSaveEditClient(clientId) {
    const valid = validateSaveClient();
    const dataValid = valid.data;
    const user = JSON.parse(localStorage.getItem("user"));
    if (!valid.isValid) {
        return;
    }

    try {
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

    const getDocBtn = document.getElementById('get-document-btn');
    const createDocumentModal = new bootstrap.Modal(document.getElementById("createDocumentModal"));

    getDocBtn.addEventListener("click", function(event) {
        event.preventDefault(); // Предотвращаем переход по ссылке, если это ссылка
        createDocumentModal.show();
    });
});