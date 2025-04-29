// @ts-nocheck

window.app.controller('ListaDeAlunosController', function ($scope, UsuarioService) {
    $scope.isModalActive = false;
    $scope.filtro = '';
    $scope.filtroTipo = '';
    $scope.usuarios = UsuarioService.listar();
    $scope.isFilterListVisible = true;

    $scope.toggleFilterList = () => {
        $scope.isFilterListVisible = !$scope.isFilterListVisible;
    }

    $scope.removerUsuario = (usuario) => {
        const index = $scope.usuarios.findIndex(u => u.nome === usuario.nome && u.tipo === usuario.tipo);
        UsuarioService.remover(index);

        $scope.usuarios = UsuarioService.listar();
    }
})