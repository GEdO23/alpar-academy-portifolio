const formEl = document.getElementById('myForm');
const formTitleEl = document.getElementById('formTitle');
const nomeInputEl = document.getElementById('nomeInput');
const emailInputEl = document.getElementById('emailInput');
const cargoInputEl = document.getElementById('cargoInput');
const btnCadastrarNovoUsuario = document.getElementById('btnCadastrarNovoUsuario');
const dataEl = document.getElementById('data');
const modalFooter = document.querySelector('.modal-footer');
const btnModalSubmitEl = document.getElementById('btnModalSubmit');
let isEdit = false, editId;

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];

if (getData.length == 0) {
    registerDefaultUsers();
}
showInfo();

btnCadastrarNovoUsuario.addEventListener('click', (e) => {
    formTitleEl.innerText = "Cadastrar usuário";
    btnModalSubmitEl.innerText = 'Cadastrar'

    formEl.reset();

    modalFooter.hidden = false;

    nomeInputEl.readOnly = false;
    emailInputEl.readOnly = false;
    cargoInputEl.readOnly = false;

    nomeInputEl.classList.remove('form-control-plaintext');
    emailInputEl.classList.remove('form-control-plaintext');
    cargoInputEl.classList.remove('form-control-plaintext');
})

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const info = {
        nome: nomeInputEl.value,
        email: emailInputEl.value,
        cargo: cargoInputEl.value
    };

    if (!isEdit) {
        getData.push(info);
        formEl.reset();
    } else {
        getData[editId] = info
    }

    localStorage.setItem('userProfile', JSON.stringify(getData));

    showInfo();
})

function showInfo() {
    document.querySelectorAll('.userDetails').forEach(info => info.remove());
    getData.forEach((element, index) => {
        let createElement = `<tr class="userDetails">
                            <th class="align-middle" scope="row">${index + 1}</th>
                            <td class="align-middle">${element.nome}</td>
                            <td class="align-middle">${element.email}</td>
                            <td class="align-middle">${element.cargo}</td>
                            
                            <td class="align-middle text-center"><button type="button" class="btn" data-bs-toggle="modal"
                    data-bs-target="#userForm" onclick="editInfo(${index})"><img src="./assets/icons/pen.svg" alt="Editar"></button></td>
                            <td class="align-middle text-center"><button type="button" class="btn" onclick="deleteInfo(${index})"><img src="./assets/icons/trash.svg" alt="Deletar"></button></td>
                            <td class="align-middle text-center"><button type="button" class="btn" data-bs-toggle="modal"
                    data-bs-target="#userForm" onclick="viewInfo(${index})"><img src="./assets/icons/eye.svg" alt="Visualizar"></button></td>
                        </tr>`;
        dataEl.innerHTML += createElement;
    })
}

function editInfo(index) {
    formTitleEl.innerText = "Editar usuário";
    btnModalSubmitEl.innerText = 'Atualizar'

    isEdit = true
    editId = index

    modalFooter.hidden = false;

    let usuario = getData[index];
    nomeInputEl.value = usuario.nome;
    emailInputEl.value = usuario.email;
    cargoInputEl.value = usuario.cargo;

    nomeInputEl.readOnly = false;
    emailInputEl.readOnly = false;
    cargoInputEl.readOnly = false;

    nomeInputEl.classList.remove('form-control-plaintext');
    emailInputEl.classList.remove('form-control-plaintext');
    cargoInputEl.classList.remove('form-control-plaintext');
}

function deleteInfo(index) {
    if (confirm("Tem certeza que deseja deletar este usuário?")) {
        getData.splice(index, 1);
        localStorage.setItem('userProfile', JSON.stringify(getData))
        showInfo();
    }
}

function viewInfo(index) {
    formTitleEl.innerText = "Dados do usuário";

    modalFooter.hidden = true;

    let usuario = getData[index];
    nomeInputEl.value = usuario.nome;
    emailInputEl.value = usuario.email;
    cargoInputEl.value = usuario.cargo;

    nomeInputEl.readOnly = true;
    emailInputEl.readOnly = true;
    cargoInputEl.readOnly = true;

    nomeInputEl.classList.add('form-control-plaintext');
    emailInputEl.classList.add('form-control-plaintext');
    cargoInputEl.classList.add('form-control-plaintext');
}

function registerDefaultUsers() {
    getData.push({
        nome: 'Gabriel Eringer',
        email: 'gabriel.eringer@alpar.com.br',
        cargo: 'Desenvolvedor(a)'
    });
    getData.push({
        nome: 'Cintia Oliveira',
        email: 'cintia.oliveira@alpar.com.br',
        cargo: 'Coordenador(a) de treinamento'
    });
    getData.push({
        nome: 'Thaís Lima David',
        email: 'thais.lima@alpar.com.br',
        cargo: 'Analista de Desenvolvimento Humano e Organizacional'
    });

    if (getData.length > 0) {
        document.querySelectorAll('.userDetails').forEach(info => info.remove());
        localStorage.setItem('userProfile', JSON.stringify(getData))
    }
}