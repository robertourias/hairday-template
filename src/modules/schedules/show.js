import dayjs from "dayjs";

// Seleciona as sessões manhã, tarde e noite:
const periodMorning = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodNight = document.getElementById("period-night");

export function schedulesShow({ dailySchedules }){
    try {
        // Limpa os agendamentos:
        periodMorning.innerHTML = "";
        periodAfternoon.innerHTML = "";
        periodNight.innerHTML = "";

        // Renderiza os agendamentos por período:
        dailySchedules.forEach(schedule => {
            const item = document.createElement("li");
            const time = document.createElement("strong");
            const name = document.createElement("span");

            // Adiciona o id do agendamento:
            item.setAttribute("data-id", schedule.id);

            // Adiciona a hora (formatada) do agendamento:
            time.textContent = dayjs(schedule.when).format("HH:mm");

            // Adiciona o nome do cliente agendado:
            name.textContent = schedule.name;

            // Cria o ícone de cancelar o agendamento:
            const cancelIcon = document.createElement("img");
            cancelIcon.classList.add("cancel-icon");
            cancelIcon.setAttribute("src", "./src/assets/cancel.svg");
            cancelIcon.setAttribute("alt", "Cancelar");

            // Adiciona a hora, o nome e o ícone no agendamento:
            item.append(time, name, cancelIcon);

            // Obtém somente a hora:
            const hour = dayjs(schedule.when).hour();
            
            // Renderiza o agendamento no período correto:
            if (hour <= 12)
                periodMorning.appendChild(item);
            else if (hour > 12 && hour <= 18)
                periodAfternoon.appendChild(item);
            else
                periodNight.appendChild(item);
        });
    } catch (error) {
        console.log(error);
        alert("Não foi possível exibir os agendamentos.")
    }
}