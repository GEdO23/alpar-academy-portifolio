// @ts-nocheck

window.app.service('UsuarioService', function () {
    const usuarios = [
        {
            nome: 'João Alvares',
            email: 'joao.alvares@alpar.com.br',
            tipo: 'Professor',
            dataCadastro: new Date()
        },
        {
            nome: 'Pedro Silva',
            email: 'pedro.silva@alpar.com.br',
            tipo: 'Aluno',
            dataCadastro: new Date()
        },
        {
            nome: 'Renata dos Campos',
            email: 'renata.campos@alpar.com.br',
            tipo: 'Aluno',
            dataCadastro: new Date()
        },
        {
            nome: 'Maurício Oliveira',
            email: 'mauricio.oliveira@alpar.com.br',
            tipo: 'Professor',
            dataCadastro: new Date()
        },
        {
            nome: 'Maria Isabela',
            email: 'maria.isabela@alpar.com.br',
            tipo: 'Aluno',
            dataCadastro: new Date()
        }
    ];

    function delay(ms) {
    }

    return {
        listar() {
            return usuarios;
        },
        adicionar(usuario) {
            usuarios.push(usuario);
        },
        remover(index) {
            usuarios.splice(index, 1);
        },
        salvar(usuario) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, 2500);
                this.adicionar(usuario);
            });
        }
    }
})