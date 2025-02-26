
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
 * @typedef {{"nome": string, "ingredientes": Array.<string>}} cardapioItem
 * @typedef {{
 *  "bebidas": Array.<cardapioItem>, 
 *  "salgados": Array.<cardapioItem>, 
 *  "doces": Array.<cardapioItem>
 * }} cardapio
 * 
 * @typedef {{"horarios": horarios, "cardapio": cardapio}} dbJson
 * @typedef {{"tdManha": HTMLTableCellElement, "tdTarde": HTMLTableCellElement?}} tableData
 */

async function fetchData() {
    const url = "http://127.0.0.1:5500/cafeteria/assets/database/db.json"
    await fetch(url)
        .then((resp) => resp.json())
        .then(
            /**
             * @param {dbJson} json 
             */
            (json) => {
                setDataHorarios(json.horarios)
                setDataCardapio(json.cardapio)
            }
        )
}

/**
 * @param {horarios} horarios 
 */
function setDataHorarios(horarios) {
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

/**
 * @param {cardapio} cardapio 
 */
function setDataCardapio(cardapio) {
    /**
    * @param {Element} orderedList 
    * @param {Array.<cardapioItem>} cardapioItem 
    */
    function setDataCardapioItem(orderedList, cardapioItem) {
        for (let i = 0; i < cardapioItem.length; i++) {
            const item = cardapioItem[i]
            const li = document.createElement('li')
            const nome = document.createElement('p')
            const ingredientes = document.createElement('ul')

            nome.innerHTML = item.nome
            item.ingredientes.forEach((v) => {
                const ingrediente = document.createElement('li')
                ingrediente.innerHTML = v
                ingredientes.appendChild(ingrediente)
            })

            li.appendChild(nome)
            li.appendChild(ingredientes)
            orderedList.appendChild(li)
        }
    }


    const olBebidas = document.querySelector('[data-cardapio-category="bebidas"]')
    const olSalgados = document.querySelector('[data-cardapio-category="salgados"]')
    const olDoces = document.querySelector('[data-cardapio-category="doces"]')

    if (olBebidas) {
        olBebidas.innerHTML = ""
        setDataCardapioItem(olBebidas, cardapio.bebidas)
    }
    if (olSalgados) {
        olSalgados.innerHTML = ""
        setDataCardapioItem(olSalgados, cardapio.salgados)
    }
    if (olDoces) {
        olDoces.innerHTML = ""
        setDataCardapioItem(olDoces, cardapio.doces)
    }
}

fetchData()