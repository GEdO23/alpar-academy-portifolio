/**
 * @typedef {string} UsuarioNome Nome do usuário
 * @typedef {string} UsuarioEmail E-mail profissional do usuário
 * @typedef {string} UsuarioCargo Cargo que o usuário ocupa
 * @typedef {{nome: UsuarioNome, email: UsuarioEmail, cargo: UsuarioCargo}} Usuario
 */

class UserService {
    /** 
     * Elemento de tabela que exibe o ID, nome, email e cargo de cada usuário
     * @type {HTMLTableElement?} 
     */
    #tabelaEl;
    #modalFooterEl;
    #modalBtnSubmitEl;

    /** 
     * Elemento de formulário para cadastrar, editar ou visualizar os dados do usuário
     * @type {HTMLFormElement?} 
     */
    #formEl;
    #formTituloEl;

    /** 
     * Elemento de campo de formulário para o nome do usuário
     * @type {HTMLInputElement?} 
     */
    #nomeInputEl;

    /** 
     * Elemento de campo de formulário para o email do usuário
     * @type {HTMLInputElement?} 
     */
    #emailInputEl;

    /** 
     * Elemento de campo de formulário para o cargo do usuário
     * @type {HTMLInputElement?} 
     */
    #cargoInputEl;

    /** Nome utilizado para o item do Local Storage que armazena os usuários do site */
    #localStorageItemName = 'usuarios';
    #isEdit = false;
    #editId;

    constructor() {
        if (this.#getUsersFromLocalStorage().length == 0) this.cadastrarUsuariosPadrao();

        this.#tabelaEl = document.querySelector('#tabelaUsuarios');
        this.#modalFooterEl = document.getElementById('usuarioFormModalFooter');
        this.#modalBtnSubmitEl = document.getElementById('btnModalSubmit');

        this.#formEl = document.querySelector('#usuarioForm');
        this.#formTituloEl = document.getElementById('formTitle');

        this.#nomeInputEl = document.querySelector('input#nomeInput');
        this.#emailInputEl = document.querySelector('input#emailInput');
        this.#cargoInputEl = document.querySelector('input#cargoInput');
    }

    /**
     * Usuários armazenados no Local Storage 
     * @returns {Usuario[]} Array de usuários
     */
    #getUsersFromLocalStorage = () => {
        let userProfile = localStorage.getItem(this.#localStorageItemName);
        return userProfile ? JSON.parse(userProfile) : [];
    }

    /**
     * Envia os dados do formulário de usuário e cadastra ou edita o usuário no Local Storage
     * @returns {void}
     */
    enviarDadosUsuario() {
        console.log('1')
        /**
         * Informações do usuário inseridas no formulário
         * @type {Usuario}
         */
        const info = {
            nome: this.#nomeInputEl ? this.#nomeInputEl.value : '',
            email: this.#emailInputEl ? this.#emailInputEl.value : '',
            cargo: this.#cargoInputEl ? this.#cargoInputEl.value : ''
        };

        if (info.nome === '' || info.email === '' || info.cargo === '') {
            alert('Dados inválidos');
            if (this.#formEl) this.#formEl.reset();
            return;
        }

        console.log(info)

        const usersData = this.#getUsersFromLocalStorage();
        console.log(usersData)
        console.log(this.#isEdit)

        if (!this.#isEdit) {
            usersData.push(info);
            if (this.#formEl) this.#formEl.reset();
        } else usersData[this.#editId] = info;

        console.log(usersData)

        localStorage.setItem(this.#localStorageItemName, JSON.stringify(usersData));

        this.recarregarTabelaDeUsuarios();
    }


    /**
     * Função que recarrega e atualiza a tabela de usuários
     */
    recarregarTabelaDeUsuarios() {
        document.querySelectorAll('.userDetails').forEach(info => info.remove());
        this.#getUsersFromLocalStorage().forEach((element, index) => {
            let usuarioLinha = `<tr class="userDetails">
                                <th class="align-middle" scope="row">${index + 1}</th>
                                <td class="align-middle">${element.nome}</td>
                                <td class="align-middle">${element.email}</td>
                                <td class="align-middle">${element.cargo}</td>
                                
                                <td class="align-middle text-center">
                                    <button onclick="userService.configurarEdicaoDeUsuario(${index})" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#usuarioFormModal">
                                        <img src="./assets/icons/pen.svg" alt="Editar">
                                    </button>
                                </td>
                                <td class="align-middle text-center">
                                    <button onclick="userService.deletarUsuario(${index})" type="button" class="btn">
                                        <img src="./assets/icons/trash.svg" alt="Deletar">
                                    </button>
                                </td>
                                <td class="align-middle text-center">
                                    <button onclick="userService.configurarVisualizacaoDeUsuario(${index})" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#usuarioFormModal">
                                        <img src="./assets/icons/eye.svg" alt="Visualizar">
                                    </button>
                                </td>
                            </tr>`;
            if (this.#tabelaEl) this.#tabelaEl.innerHTML += usuarioLinha;
        })
    }


    /**
     * Função que configura o modal para o cadastro de um novo usuário
     */
    configurarCadastroDeUsuario() {
        if (this.#formTituloEl) this.#formTituloEl.innerText = 'Cadastrar usuário';
        if (this.#modalBtnSubmitEl) this.#modalBtnSubmitEl.innerText = 'Cadastrar'
        if (this.#modalFooterEl) this.#modalFooterEl.hidden = false;

        if (this.#formEl) this.#formEl.reset();

        if (this.#nomeInputEl) {
            this.#nomeInputEl.readOnly = false;
            this.#nomeInputEl.classList.remove('form-control-plaintext');
        }

        if (this.#emailInputEl) {
            this.#emailInputEl.readOnly = false;
            this.#emailInputEl.classList.remove('form-control-plaintext');
        }

        if (this.#cargoInputEl) {
            this.#cargoInputEl.readOnly = false;
            this.#cargoInputEl.classList.remove('form-control-plaintext');
        }
    }


    /**
     * Função que configura o modal para editar o usuário selecionado
     * @param {number} id ID do usuário
     */
    configurarEdicaoDeUsuario(id) {
        if (this.#formTituloEl) this.#formTituloEl.innerText = 'Editar usuário';
        if (this.#modalBtnSubmitEl) this.#modalBtnSubmitEl.innerText = 'Atualizar';
        if (this.#modalFooterEl) this.#modalFooterEl.hidden = false;

        this.#isEdit = true;
        this.#editId = id;

        /**
         * Usuário cujas informações serão atualizadas
         * @type Usuario
         */
        let usuario = this.#getUsersFromLocalStorage()[id];

        if (this.#nomeInputEl) {
            this.#nomeInputEl.value = usuario.nome;
            this.#nomeInputEl.readOnly = false;
            this.#nomeInputEl.classList.remove('form-control-plaintext');
        }

        if (this.#emailInputEl) {
            this.#emailInputEl.value = usuario.email;
            this.#emailInputEl.readOnly = false;
            this.#emailInputEl.classList.remove('form-control-plaintext');
        }

        if (this.#cargoInputEl) {
            this.#cargoInputEl.value = usuario.cargo;
            this.#cargoInputEl.readOnly = false;
            this.#cargoInputEl.classList.remove('form-control-plaintext');
        }
    }


    /**
     * Função que deleta o usuário do Local Storage
     * @param {number} id ID do usuário
     */
    deletarUsuario(id) {
        if (confirm('Tem certeza que deseja deletar este usuário?')) {
            const newData = this.#getUsersFromLocalStorage().filter((_, i) => i != id);
            localStorage.setItem(this.#localStorageItemName, JSON.stringify(newData))
            this.recarregarTabelaDeUsuarios();
        }
    }


    /**
     * Função que configura o modal para exibir somente os dados do usuário
     * @param {number} id ID do usuário
     */
    configurarVisualizacaoDeUsuario(id) {
        if (this.#formTituloEl) this.#formTituloEl.innerText = 'Dados do usuário';
        if (this.#modalFooterEl) this.#modalFooterEl.hidden = true;

        /**
         * Usuário cujos dados serão visualizados
         * @type Usuario
         */
        let usuario = this.#getUsersFromLocalStorage()[id];

        if (this.#nomeInputEl) {
            this.#nomeInputEl.value = usuario.nome;
            this.#nomeInputEl.readOnly = true;
            this.#nomeInputEl.classList.add('form-control-plaintext');
        }

        if (this.#emailInputEl) {
            this.#emailInputEl.value = usuario.email;
            this.#emailInputEl.readOnly = true;
            this.#emailInputEl.classList.add('form-control-plaintext');
        }

        if (this.#cargoInputEl) {
            this.#cargoInputEl.value = usuario.cargo;
            this.#cargoInputEl.readOnly = true;
            this.#cargoInputEl.classList.add('form-control-plaintext');
        }
    }


    /**
     * Função que cadastra por padrão alguns usuários a tabela de usuários.
     * 
     * Quando não tiver nenhum usuário cadastrado no Local Storage, esta função será chamada, dessa forma a tabela nunca ficará vazia.
     */
    cadastrarUsuariosPadrao() {
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

        const data = this.#getUsersFromLocalStorage();

        defaultUsers.forEach(usuario => data.push(usuario))

        document.querySelectorAll('.userDetails').forEach(info => info.remove());
        localStorage.setItem(this.#localStorageItemName, JSON.stringify(data))
    }
}

(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

const userService = new UserService();
userService.recarregarTabelaDeUsuarios();

function selectWebServices() {
    /** @type {HTMLSelectElement?} */
    const contatoAssuntoInput = document.querySelector('#contatoAssuntoInput')
    if (contatoAssuntoInput) contatoAssuntoInput.value = 'trabalhe-conosco-web';
}

function selectMobileServices() {
    /** @type {HTMLSelectElement?} */
    const contatoAssuntoInput = document.querySelector('#contatoAssuntoInput')
    if (contatoAssuntoInput) contatoAssuntoInput.value = 'trabalhe-conosco-mobile';
}

function selectUXUIServices() {
    /** @type {HTMLSelectElement?} */
    const contatoAssuntoInput = document.querySelector('#contatoAssuntoInput')
    if (contatoAssuntoInput) contatoAssuntoInput.value = 'trabalhe-conosco-uxui';
}