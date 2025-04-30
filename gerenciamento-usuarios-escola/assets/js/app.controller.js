// @ts-nocheck

window.app.controller('AppController', function ($scope, UsuarioService) {
    $scope.greetings = 'Bem-vindo ao sistema de cadastro escolar';
    $scope.isGreetingsVisible = true;

    $scope.closeGreetings = () => {
        $scope.isGreetingsVisible = false;
    };

    $scope.usuario = {
        nome: 'Gabriel Eringer',
        tipo: 'Professor'
    };

    $scope.isProfessor = $scope.usuario.tipo == 'Professor';

    $scope.usuarioInput = {
        nome: '',
        email: '',
        tipo: ''
    }

    $scope.toggleModal = () => {
        $scope.isModalActive = !$scope.isModalActive;
    };

    $scope.adicionarUsuario = () => {
        UsuarioService.adicionar({ nome: $scope.usuarioInput.nome, email: $scope.usuarioInput.email, tipo: $scope.usuarioInput.tipo, dataCadastro: new Date() });

        $scope.usuarioInput.nome = '';
        $scope.usuarioInput.email = '';
        $scope.usuarioInput.tipo = '';

        $scope.usuarios = UsuarioService.listar();
        $scope.toggleModal();
    }
});