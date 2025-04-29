// @ts-nocheck

window.app.service('UsuarioService', function () {
    const usuarios = [
        {
            nome: 'João Alvares',
            tipo: 'Professor',
            dataCadastro: new Date()
        },
        {
            nome: 'Pedro Silva',
            tipo: 'Aluno',
            dataCadastro: new Date()
        },
        {
            nome: 'Renata dos Campos',
            tipo: 'Aluno',
            dataCadastro: new Date().setMonth('05')
        },
        {
            nome: 'Maurício Oliveira',
            tipo: 'Professor',
            dataCadastro: new Date()
        },
        {
            nome: 'Maria Isabela',
            tipo: 'Aluno',
            dataCadastro: new Date()
        }
    ];

    return {
        listar() {
            return usuarios;
        },
        adicionar(usuario) {
            usuarios.push(usuario);
        },
        remover(index) {
            usuarios.splice(index, 1);
        }
    }
})