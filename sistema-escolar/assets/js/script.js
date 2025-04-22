class Usuario {
    /** @type {string} */
    #nome;
    /** @type {string} */
    #email;
    /** @type {string} */
    #senha;

    /**
     * @param {string} nome
     * @param {string} email
     * @param {string} senha
     */
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    get nome() { return this.#nome; }
    set nome(nome) { this.#nome = nome; }

    get email() { return this.#email; }
    set email(email) { this.#email = email; }

    get senha() { return this.#senha; }
    set senha(senha) { this.#senha = senha; }

    /**
     * Retorna o nome e o e-mail do usuário.
     * @returns {{nome: string, email: string}}
     */
    exibirPerfil() {
        return { nome: this.nome, email: this.email };
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
        super(nome, email, senha);
        this.turma = turma;
    }

    get turma() { return this.#turma; }
    set turma(turma) { this.#turma = turma; }

    /**
     * Retorna o nome, o e-mail e turma do aluno.
     * @returns {{nome: string, email: string, turma: string}}
     */
    exibirPerfil() {
        return { nome: this.nome, email: this.email, turma: this.turma };
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
        super(nome, email, senha);
        this.materias = materias;
    }

    get materias() { return this.#materias; }
    set materias(materias) { this.#materias = materias; }

    /**
     * Retorna o nome, o e-mail e matérias do professor.
     * @returns {{nome: string, email: string, materias: string[]}}
     */
    exibirPerfil() {
        return { nome: this.nome, email: this.email, materias: this.materias };
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
        const senhaSpanErr = document.querySelector('#err-senha');
        const senha = senhaInputEl?.value;

        if (senha != usuarioEncontrado.senha) {
            if (senhaSpanErr) senhaSpanErr.innerHTML = "E-mail/senha incorretos";
            throw new Error('E-mail/senha incorretos');
        }

        const usuario = usuarioEncontrado.exibirPerfil();
        localStorage.setItem('usuario', JSON.stringify(usuario));

        window.location.href = "./dados/";
    }
}


const sistemaEscolar = new SistemaEscolar();
sistemaEscolar.cadastrar(new Aluno('Gabriel Eringer', 'gabriel.eringer@alpar.com.br', 'abc123', 'ADS'));
sistemaEscolar.cadastrar(new Professor('Felipe Lima', 'felipe.lima@alpar.com.br', '123abc', ['ADS']));

const btnLoginEl = document.getElementById('btn-login');
btnLoginEl?.addEventListener('click', () => sistemaEscolar.login());