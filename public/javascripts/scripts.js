document.addEventListener("DOMContentLoaded", function() {
    // Обработчик события для изменения текста кнопки "Статус"
    document.getElementById('statusButton').addEventListener('click', function() {
        this.textContent = 'Актуализировать';
    });

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

function openCalculationPage(calculationId) {
    // Здесь вы можете добавить код для открытия новой страницы с расчетом
    console.log("Открыть страницу расчета:", calculationId);
}



document.addEventListener("DOMContentLoaded", function() {
    const clientInfo = document.querySelector(".client-info");
    const createClientModal = new bootstrap.Modal(document.getElementById("createClientModal"));

    clientInfo.addEventListener("click", function(event) {
        event.preventDefault(); // Предотвращаем переход по ссылке, если это ссылка
        createClientModal.show();
    });
});