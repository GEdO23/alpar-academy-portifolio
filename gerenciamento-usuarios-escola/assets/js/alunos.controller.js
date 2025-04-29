// @ts-nocheck

window.app.controller('ListaDeAlunosController', function ($scope, UsuarioService) {
    $scope.filtro = '';
    $scope.filtroTipo = '';
    $scope.usuarios = UsuarioService.listar();

    $scope.adicionarUsuario = () => {
        const nome = $scope.novoUsuarioNome;
        const tipo = $scope.novoUsuarioTipo;
        if (!nome || !tipo) {
            throw new Error("Novo usuário precisa obrigatoriamente ter um nome e um tipo");
        }

        UsuarioService.adicionar({ nome, tipo, dataCadastro: new Date() });

        $scope.usuarios = UsuarioService.listar();
    }

    $scope.removerUsuario = (usuario) => {
        const index = $scope.usuarios.findIndex(u => u.nome === usuario.nome && u.tipo === usuario.tipo);
        UsuarioService.remover(index);

        $scope.usuarios = UsuarioService.listar();
    }
})