/**
 * @typedef {string} UsuarioNome Nome do usuário
 * @typedef {string} UsuarioEmail E-mail profissional do usuário
 * @typedef {string} UsuarioCargo Cargo que o usuário ocupa
 * @typedef {{nome: UsuarioNome, email: UsuarioEmail, cargo: UsuarioCargo}} Usuario
 */

/** 
 * Elemento de tabela que exibe o ID, nome, email e cargo de cada usuário
 * @type {HTMLTableElement?} 
 */
const tabelaUsuariosEl = document.querySelector('#tabelaUsuarios');

const modalFooterEl = document.getElementById('usuarioFormModalFooter');
const modalBtnSubmitEl = document.getElementById('btnModalSubmit');

/** 
 * Elemento de formulário para cadastrar, editar ou visualizar os dados do usuário
 * @type {HTMLFormElement?} 
 */
const usuarioFormEl = document.querySelector('#usuarioForm');
const usuarioFormTituloEl = document.getElementById('formTitle');

/** 
 * Elemento de campo de formulário para o nome do usuário
 * @type {HTMLInputElement?} 
 */
const usuarioNomeInputEl = document.querySelector('input#nomeInput');

/** 
 * Elemento de campo de formulário para o email do usuário
 * @type {HTMLInputElement?} 
 */
const usuarioEmailInputEl = document.querySelector('input#emailInput');

/** 
 * Elemento de campo de formulário para o cargo do usuário
 * @type {HTMLInputElement?} 
 */
const usuarioCargoInputEl = document.querySelector('input#cargoInput');

/** Nome utilizado para o item do Local Storage que armazena os usuários do site */
const LSUsersItemName = 'usuarios';

let isEdit = false, editId;

/**
 * Usuários armazenados no Local Storage 
 * @returns {Usuario[]} Array de usuários
 */
let getLSUsers = () => {
    let userProfile = localStorage.getItem(LSUsersItemName);
    return userProfile ? JSON.parse(userProfile) : [];
}

if (getLSUsers().length == 0) cadastrarUsuariosPadrao();

recarregarTabelaDeUsuarios();


/**
 * Envia os dados do formulário de usuário e cadastra ou edita o usuário no Local Storage
 * @returns {void}
 */
function enviarDadosUsuario() {
    console.log('1')
    /**
     * Informações do usuário inseridas no formulário
     * @type {Usuario}
     */
    const info = {
        nome: usuarioNomeInputEl ? usuarioNomeInputEl.value : '',
        email: usuarioEmailInputEl ? usuarioEmailInputEl.value : '',
        cargo: usuarioCargoInputEl ? usuarioCargoInputEl.value : ''
    };

    if (info.nome === '' || info.email === '' || info.cargo === '') {
        alert('Dados inválidos');
        if (usuarioFormEl) usuarioFormEl.reset();
        return;
    }

    console.log(info)

    const usersData = getLSUsers();
    console.log(usersData)
    console.log(isEdit)

    if (!isEdit) {
        usersData.push(info);
        if (usuarioFormEl) usuarioFormEl.reset();
    } else usersData[editId] = info;

    console.log(usersData)

    localStorage.setItem(LSUsersItemName, JSON.stringify(usersData));

    recarregarTabelaDeUsuarios();
}


/**
 * Função que recarrega e atualiza a tabela de usuários
 */
function recarregarTabelaDeUsuarios() {
    if (tabelaUsuariosEl) {
        document.querySelectorAll('.userDetails').forEach(info => info.remove());
        getLSUsers().forEach((element, index) => {
            let usuarioLinha = `<tr class="userDetails">
                                <th class="align-middle" scope="row">${index + 1}</th>
                                <td class="align-middle">${element.nome}</td>
                                <td class="align-middle">${element.email}</td>
                                <td class="align-middle">${element.cargo}</td>
                                
                                <td class="align-middle text-center">
                                    <button onclick="configurarEdicaoDeUsuario(${index})" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#usuarioFormModal">
                                        <img src="./assets/icons/pen.svg" alt="Editar">
                                    </button>
                                </td>
                                <td class="align-middle text-center">
                                    <button onclick="deletarUsuario(${index})" type="button" class="btn">
                                        <img src="./assets/icons/trash.svg" alt="Deletar">
                                    </button>
                                </td>
                                <td class="align-middle text-center">
                                    <button onclick="configurarVisualizacaoDeUsuario(${index})" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#usuarioFormModal">
                                        <img src="./assets/icons/eye.svg" alt="Visualizar">
                                    </button>
                                </td>
                            </tr>`;
            tabelaUsuariosEl.innerHTML += usuarioLinha;
        })
    }
}


/**
 * Função que configura o modal para o cadastro de um novo usuário
 */
function configurarCadastroDeUsuario() {
    if (usuarioFormTituloEl) usuarioFormTituloEl.innerText = 'Cadastrar usuário';
    if (modalBtnSubmitEl) modalBtnSubmitEl.innerText = 'Cadastrar'
    if (modalFooterEl) modalFooterEl.hidden = false;

    if (usuarioFormEl) usuarioFormEl.reset();

    if (usuarioNomeInputEl) {
        usuarioNomeInputEl.readOnly = false;
        usuarioNomeInputEl.classList.remove('form-control-plaintext');
    }

    if (usuarioEmailInputEl) {
        usuarioEmailInputEl.readOnly = false;
        usuarioEmailInputEl.classList.remove('form-control-plaintext');
    }

    if (usuarioCargoInputEl) {
        usuarioCargoInputEl.readOnly = false;
        usuarioCargoInputEl.classList.remove('form-control-plaintext');
    }
}


/**
 * Função que configura o modal para editar o usuário selecionado
 * @param {number} id ID do usuário
 */
function configurarEdicaoDeUsuario(id) {
    if (usuarioFormTituloEl) usuarioFormTituloEl.innerText = 'Editar usuário';
    if (modalBtnSubmitEl) modalBtnSubmitEl.innerText = 'Atualizar';
    if (modalFooterEl) modalFooterEl.hidden = false;

    isEdit = true;
    editId = id;

    /**
     * Usuário cujas informações serão atualizadas
     * @type Usuario
     */
    let usuario = getLSUsers()[id];

    if (usuarioNomeInputEl) {
        usuarioNomeInputEl.value = usuario.nome;
        usuarioNomeInputEl.readOnly = false;
        usuarioNomeInputEl.classList.remove('form-control-plaintext');
    }

    if (usuarioEmailInputEl) {
        usuarioEmailInputEl.value = usuario.email;
        usuarioEmailInputEl.readOnly = false;
        usuarioEmailInputEl.classList.remove('form-control-plaintext');
    }

    if (usuarioCargoInputEl) {
        usuarioCargoInputEl.value = usuario.cargo;
        usuarioCargoInputEl.readOnly = false;
        usuarioCargoInputEl.classList.remove('form-control-plaintext');
    }
}


/**
 * Função que deleta o usuário do Local Storage
 * @param {number} id ID do usuário
 */
function deletarUsuario(id) {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
        const newData = getLSUsers().filter((_, i) => i != id);
        localStorage.setItem(LSUsersItemName, JSON.stringify(newData))
        recarregarTabelaDeUsuarios();
    }
}


/**
 * Função que configura o modal para exibir somente os dados do usuário
 * @param {number} id ID do usuário
 */
function configurarVisualizacaoDeUsuario(id) {
    if (usuarioFormTituloEl) usuarioFormTituloEl.innerText = 'Dados do usuário';
    if (modalFooterEl) modalFooterEl.hidden = true;

    /**
     * Usuário cujos dados serão visualizados
     * @type Usuario
     */
    let usuario = getLSUsers()[id];

    if (usuarioNomeInputEl) {
        usuarioNomeInputEl.value = usuario.nome;
        usuarioNomeInputEl.readOnly = true;
        usuarioNomeInputEl.classList.add('form-control-plaintext');
    }

    if (usuarioEmailInputEl) {
        usuarioEmailInputEl.value = usuario.email;
        usuarioEmailInputEl.readOnly = true;
        usuarioEmailInputEl.classList.add('form-control-plaintext');
    }

    if (usuarioCargoInputEl) {
        usuarioCargoInputEl.value = usuario.cargo;
        usuarioCargoInputEl.readOnly = true;
        usuarioCargoInputEl.classList.add('form-control-plaintext');
    }
}


/**
 * Função que cadastra por padrão alguns usuários a tabela de usuários.
 * 
 * Quando não tiver nenhum usuário cadastrado no Local Storage, esta função será chamada, dessa forma a tabela nunca ficará vazia.
 */
function cadastrarUsuariosPadrao() {
    /**
     * @type Usuario[]
     */
    const defaultUsers = [
        {
            nome: 'Gabriel Eringer',
            email: 'gabriel.eringer@alpar.com.br',
            cargo: 'Desenvolvedor(a)'
        },
        {
            nome: 'Cintia Oliveira',
            email: 'cintia.oliveira@alpar.com.br',
            cargo: 'Coordenador(a) de treinamento'
        },
        {
            nome: 'Thaís Lima David',
            email: 'thais.lima@alpar.com.br',
            cargo: 'Analista de Desenvolvimento Humano e Organizacional'
        }
    ]

    const data = getLSUsers();

    defaultUsers.forEach(usuario => data.push(usuario))

    document.querySelectorAll('.userDetails').forEach(info => info.remove());
    localStorage.setItem(LSUsersItemName, JSON.stringify(data))
}