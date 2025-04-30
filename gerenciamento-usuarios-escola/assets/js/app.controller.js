// @ts-nocheck

window.app.controller('AppController', function ($scope, UsuarioService) {
    $scope.greetings = 'Bem-vindo ao sistema de cadastro escolar';
    $scope.isGreetingsVisible = true;
    $scope.isSuccessMessageVisible = false;

    $scope.closeGreetings = () => {
        $scope.isGreetingsVisible = false;
    };

    $scope.usuario = {
        nome: 'Gabriel Eringer',
        tipo: 'Professor'
    };

    $scope.isProfessor = $scope.usuario.tipo == 'Professor';

    $scope.activateModal = () => {
        $scope.isModalActive = true;
    };

    $scope.deactivateModal = () => {
        $scope.isModalActive = false;
    };

    $scope.showSuccessMessage = (message) => {
        $scope.isSuccessMessageVisible = true;
        $scope.success = message;
    };

    $scope.hideSuccessMessage = () => {
        $scope.isSuccessMessageVisible = false;
    };

    $scope.isLoading = false;

    $scope.usuarioInput = {
        nome: '',
        email: '',
        tipo: ''
    }

    createUser = () => {
        return {
            nome: $scope.usuarioInput.nome,
            email: $scope.usuarioInput.email,
            tipo: $scope.usuarioInput.tipo,
            dataCadastro: new Date()
        };
    }

    $scope.adicionarUsuario = async function (form) {
        const usuario = createUser();

        $scope.isLoading = true;
        await UsuarioService.salvar(usuario);

        $scope.usuarios = UsuarioService.listar();
        $scope.resetForm(form);
        $scope.deactivateModal();
        $scope.showSuccessMessage(`${usuario.tipo} adicionado com sucesso!`);
        $scope.$apply();
    }

    $scope.resetForm = (form) => {
        $scope.usuarioInput.nome = '';
        $scope.usuarioInput.email = '';
        $scope.usuarioInput.tipo = '';
        $scope.isLoading = false;
        form.$setPristine();
        form.$setUntouched();
    }

});