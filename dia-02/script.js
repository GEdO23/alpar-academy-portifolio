
/**
 * @typedef {{"inicio": string, "fim": string}} periodo
 * @typedef {{"manha": periodo, "tarde": periodo?, "isAberto": boolean }} periodoDiario
 * @typedef {{
 *  "segunda": periodoDiario, 
 *  "terca": periodoDiario,
 *  "quarta": periodoDiario,
 *  "quinta": periodoDiario,
 *  "sexta": periodoDiario,
 *  "sabado": periodoDiario,
 *  "domingoEFeriados": periodoDiario
 * }} horarios 
 * 
 * @typedef {{"horarios": horarios}} dbJson
 * @typedef {{"tdManha": HTMLTableCellElement, "tdTarde": HTMLTableCellElement?}} tableData
 */

async function fetchData() {
    const url = "http://127.0.0.1:5500/dia-02/db.json"
    await fetch(url)
        .then((resp) => resp.json())
        .then(
            /**
             * @param {dbJson} json 
             */
            (json) => assignHorarios(json.horarios)
        )
}

/**
 * @param {horarios} horarios 
 */
function assignHorarios(horarios) {
    const trManha = document.querySelector('#trHorariosManha')
    const trTarde = document.querySelector('#trHorariosTarde')

    if (!trManha || !trTarde) return

    /**
     * @param {periodoDiario} periodo
     * @returns {tableData}
     */
    function getTableData(periodo) {
        const tdManha = document.createElement('td')
        const tdTarde = document.createElement('td')

        if (!periodo.isAberto) {
            tdManha.innerHTML = "Fechado"
            tdManha.rowSpan = 2
            return { tdManha, "tdTarde": null }
        }

        tdManha.innerHTML = `${periodo.manha.inicio}<br>${periodo.manha.fim}`

        if (periodo.tarde) {
            tdTarde.innerHTML = `${periodo.tarde.inicio}<br>${periodo.tarde.fim}`
            return { tdManha, tdTarde }
        } else {
            tdManha.rowSpan = 2
            return { tdManha, "tdTarde": null }
        }
    }

    /**
     * @param {Element} trManha 
     * @param {Element} trTarde 
     * @param {tableData} td 
     */
    function appendHorariosDoDia(trManha, trTarde, td) {
        trManha.appendChild(td.tdManha)
        if (td.tdTarde) trTarde.appendChild(td.tdTarde)
    }

    appendHorariosDoDia(trManha, trTarde, getTableData(horarios.segunda))
    appendHorariosDoDia(trManha, trTarde, getTableData(horarios.terca))
    appendHorariosDoDia(trManha, trTarde, getTableData(horarios.quarta))
    appendHorariosDoDia(trManha, trTarde, getTableData(horarios.quinta))
    appendHorariosDoDia(trManha, trTarde, getTableData(horarios.sexta))
    appendHorariosDoDia(trManha, trTarde, getTableData(horarios.sabado))
    appendHorariosDoDia(trManha, trTarde, getTableData(horarios.domingoEFeriados))
}

fetchData()