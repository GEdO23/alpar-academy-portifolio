// @ts-nocheck

const app = angular.module('app', []);

app.controller('AppController', function ($scope) {
    $scope.greetings = 'Bem-vindo ao sistema de cadastro escolar';
});

app.controller('ListaDeAlunosController', function ($scope) {
    $scope.filtro = '';
    $scope.filtroTipo = '';

    $scope.usuarios = [
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
    ]
})