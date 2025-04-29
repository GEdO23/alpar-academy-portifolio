// @ts-nocheck

window.app.service('UsuarioService', function () {
    const usuarios = [];

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