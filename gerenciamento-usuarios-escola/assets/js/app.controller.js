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
        $scope.toggleModal();
    }
});