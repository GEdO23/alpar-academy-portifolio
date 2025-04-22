const dados = localStorage.getItem('usuario');
if (!dados) throw new Error('Dados não encontrados');

const usuario = JSON.parse(dados);

console.log(usuario);

const usuarioTipoEl = document.querySelectorAll('.usuario-tipo');
const usuarioDadosEl = document.querySelector('#usuario-dados');
const usuarioNomeEl = document.querySelectorAll('.usuario-nome');
const usuarioEmailEl = document.querySelectorAll('.usuario-email');

usuarioTipoEl.forEach(el => el.innerHTML = usuario.materias ? "Professor" : "Aluno");
usuarioNomeEl.forEach(el => el.innerHTML = usuario.nome);
usuarioEmailEl.forEach(el => el.innerHTML = usuario.email);

if (usuarioDadosEl) {
    if (usuario.materias) {
        const materiasTituloEl = document.createElement('h2');
        materiasTituloEl.innerHTML = "Matérias";

        const materiasListEl = document.createElement('ul');
        usuario.materias.forEach(mat => {
            const materiaEl = document.createElement('li');
            materiaEl.innerHTML = mat;
            materiaEl.classList.add('usuario-materia');
            materiasListEl.appendChild(materiaEl);
        })
        usuarioDadosEl.appendChild(materiasTituloEl);
        usuarioDadosEl.appendChild(materiasListEl);
    }

    if (usuario.turma) {
        const turmaEl = document.createElement('p');
        turmaEl.innerHTML = "Turma: ";

        const turmaSpanEl = document.createElement('span');
        turmaSpanEl.innerHTML = usuario.turma;
        turmaSpanEl.classList.add('usuario-turma');

        turmaEl.appendChild(turmaSpanEl);
        usuarioDadosEl.appendChild(turmaEl);
    }
}