// @ts-nocheck

const app = angular.module('app', []);

app.controller('AppController', function ($scope) {
    $scope.greetings = 'Bem-vindo ao sistema de cadastro escolar';

    $scope.usuario = {
        nome: 'João Alvares',
        tipo: 'Professor'
    };

    $scope.isProfessor = $scope.usuario.tipo == 'Professor';
});