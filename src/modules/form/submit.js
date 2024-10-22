import dayjs from "dayjs";

import { scheduleNew } from "../../services/schedule-new.js";
import { schedulesDay } from "../schedules/load.js"

const form = document.querySelector("form");
const selectedDate = document.getElementById("date");
const clientName = document.getElementById("client");

// Date atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

// Carrega a data atual:
selectedDate.value = inputToday;

// Define a data mínima:
selectedDate.min = inputToday;

form.onsubmit = async (event) => {
    event.preventDefault();

    try {
        // Obtém o nome do cliente:
        const name = clientName.value.trim();

        if (!name)
            return alert("Informe o nome do cliente!");

        // Obtém o horário selecionado:
        const hourSelected = document.querySelector(".hour-selected");

        if (!hourSelected)
            return alert("Selecione o horário!");

        // Obtém somente a hora:
        const [ hour ] = hourSelected.innerHTML.split(":");

        // Insere a hora na data:
        const when = dayjs(selectedDate.value).add(hour, "hour");
        
        // Gera um ID:
        const id = new Date().getTime();

        // Faz o agendamento:
        await scheduleNew({
            id,
            name,
            when
        });

        // Revarrega os agendamentos:
        await schedulesDay();

        // Limpa o input de nome do cliente:
        clientName.value = "";
    } catch (error) {
        
    }
}