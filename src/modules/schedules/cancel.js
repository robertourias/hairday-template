import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"

const periods = document.querySelectorAll(".period");

// Gera evento click para cada agendamento:
periods.forEach(period => {
    // Captura o evento de clique no agendamento:
    period.addEventListener("click", async event => {
        if (event.target.classList.contains("cancel-icon")) {
            // Obtém a "li" pai do elemento clicado:
            const item = event.target.closest("li");

            // Obtém o id (data-id) do agendamento para remover:
            const { id } = item.dataset;
            
            // Verifica se há um id:
            if (id) {
                // Confirma se o usuário quer mesmo cancelar:
                const isConfirm = confirm("Tem certeza que deseja cancelar o agenamento?");

                if (isConfirm) {
                    // Faz requisição na API para cancelar o agendamento:
                    await scheduleCancel({ id });

                    // Recarrega os agendamentos:
                    await schedulesDay();
                }
            }
        }
    })
})