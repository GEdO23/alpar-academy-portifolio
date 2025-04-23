class Usuario {
    /** @type {string} */
    #nome;
    /** @type {string} */
    #email;
    /** @type {string} */
    #senha;
    /** @type {'ALUNO' | 'PROFESSOR'} */
    #tipo;

    /**
     * @param {string} nome
     * @param {string} email
     * @param {string} senha
     * @param {'ALUNO' | 'PROFESSOR'} tipo
     */
    constructor(nome, email, senha, tipo) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.#tipo = tipo;
    }

    get nome() { return this.#nome; }
    set nome(nome) { this.#nome = nome; }

    get email() { return this.#email; }
    set email(email) { this.#email = email; }

    get senha() { return this.#senha; }
    set senha(senha) { this.#senha = senha; }

    get tipo() { return this.#tipo; }

    /**
     * Retorna o nome e o e-mail do usuário.
     * @returns {{nome: string, email: string, tipo: string}}
     */
    exibirPerfil() {
        return { nome: this.nome, email: this.email, tipo: this.tipo };
    }
}


class Aluno extends Usuario {
    /** @type {string} */
    #turma;

    /**
     * @param {string} nome
     * @param {string} email
     * @param {string} senha
     * @param {string} turma
     */
    constructor(nome, email, senha, turma) {
        super(nome, email, senha, 'ALUNO');
        this.turma = turma;
    }

    get turma() { return this.#turma; }
    set turma(turma) { this.#turma = turma; }

    /**
     * Retorna o nome, o e-mail e turma do aluno.
     * @returns {{nome: string, email: string, tipo: string, turma: string}}
     */
    exibirPerfil() {
        return { nome: this.nome, email: this.email, tipo: this.tipo, turma: this.turma };
    }
}


class Professor extends Usuario {
    /** @type {string[]} */
    #materias;

    /**
     * @param {string} nome
     * @param {string} email
     * @param {string} senha
     * @param {string[]} materias
     */
    constructor(nome, email, senha, materias) {
        super(nome, email, senha, 'PROFESSOR');
        this.materias = materias;
    }

    get materias() { return this.#materias; }
    set materias(materias) { this.#materias = materias; }

    /**
     * Retorna o nome, o e-mail e matérias do professor.
     * @returns {{nome: string, email: string, tipo: string, materias: string[]}}
     */
    exibirPerfil() {
        return { nome: this.nome, email: this.email, tipo: this.tipo, materias: this.materias };
    }
}


class SistemaEscolar {
    /** @type {Usuario[]} */
    #usuarios;

    constructor() {
        this.#usuarios = [];
    }

    /**
     * Cadastra um usuário no sistema.
     * @param {Usuario} usuario 
     */
    cadastrar(usuario) {
        this.#usuarios.push(usuario);
    }

    /** Realiza login na conta de um usuário. */
    login() {
        /** @type {HTMLInputElement?} */
        const emailInputEl = document.querySelector('input#in-email');
        const email = emailInputEl?.value;

        const usuarioEncontrado = this.#usuarios.find(u => u.email == email);
        if (!usuarioEncontrado) throw new Error('Usuário não encontrado');

        /** @type {HTMLInputElement?} */
        const senhaInputEl = document.querySelector('input#in-senha');
        const senha = senhaInputEl?.value;

        if (senha != usuarioEncontrado.senha) {
            const alert = document.getElementById('login-error-alert');
            if (alert) alert.classList.remove('d-none');
            throw new Error('E-mail/senha incorretos');
        };

        const usuario = usuarioEncontrado.exibirPerfil();
        localStorage.setItem('usuario', JSON.stringify(usuario));

        window.location.href = "./dados/";
    }
}


const sistemaEscolar = new SistemaEscolar();
sistemaEscolar.cadastrar(new Aluno('Gabriel Eringer', 'gabriel.eringer@alpar.com.br', 'abc123', 'ADS'));
sistemaEscolar.cadastrar(new Professor('Felipe Lima', 'felipe.lima@alpar.com.br', '123abc', ['ADS']));

const form = document.getElementById('login-form');
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    sistemaEscolar.login();
});