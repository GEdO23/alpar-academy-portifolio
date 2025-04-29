// @ts-nocheck

window.app.controller('ListaDeAlunosController', function ($scope, UsuarioService) {
    $scope.isModalActive = false;
    $scope.filtro = '';
    $scope.filtroTipo = '';
    $scope.usuarios = UsuarioService.listar();
    $scope.usuarioInput = {
        nome: '',
        tipo: ''
    }

    $scope.toggleModal = () => {
        $scope.isModalActive = !$scope.isModalActive;
    };

    $scope.adicionarUsuario = () => {
        const nome = $scope.usuarioInput.nome;
        const tipo = $scope.usuarioInput.tipo;
        if (!nome || !tipo) {
            throw new Error("Novo usuário precisa obrigatoriamente ter um nome e um tipo");
        }

        UsuarioService.adicionar({ nome, tipo, dataCadastro: new Date() });

        $scope.usuarioInput.nome = '';
        $scope.usuarioInput.tipo = '';

        $scope.usuarios = UsuarioService.listar();
    }

    $scope.removerUsuario = (usuario) => {
        const index = $scope.usuarios.findIndex(u => u.nome === usuario.nome && u.tipo === usuario.tipo);
        UsuarioService.remover(index);

        $scope.usuarios = UsuarioService.listar();
    }
})