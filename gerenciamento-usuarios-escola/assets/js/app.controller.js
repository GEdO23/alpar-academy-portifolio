// @ts-nocheck

window.app.controller('AppController', function ($scope, $timeout, UsuarioService) {
    $scope.greetings = 'Bem-vindo ao sistema de cadastro escolar';
    $scope.isGreetingsVisible = true;
    $scope.isSuccessMessageVisible = false;
    $scope.greetingsAnimation = true;

    $scope.closeGreetings = () => {
        $scope.greetingsAnimation = false;

        $timeout(() => {
            $scope.isGreetingsVisible = false;
        }, 1000);
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
        $scope.successAnimation = true;
        $scope.success = message;
    };

    $scope.hideSuccessMessage = () => {
        $scope.successAnimation = false;

        $timeout(() => {
            $scope.isSuccessMessageVisible = false;
        }, 1000);
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