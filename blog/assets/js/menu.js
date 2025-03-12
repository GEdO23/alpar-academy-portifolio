/**
 * @file Controla o elemento de menu da Alpar Rocket Blog dinamicamente com JavaScript
 * @author Gabriel Eringer de Oliveira <gabriel.eringer.23@gmail.com>
 * @module blog/menu
 */

/**
 * O elemento HTML do menu a ser exibido na tela.
 * 
 * Contém os links de redirecionamento do blog
 * 
 * @type {HTMLElement | null}
 */
const menuEl = document.querySelector('#menu')

/**
 * O elemento HTML correspondente ao botão de menu que se encontra no header da página.
 * 
 * É com este botão que se é possível interagir com o menu, ou seja, exibir ou ocultar o menu.
 * 
 * @type {HTMLElement | null}
 */
const menuButtonEl = document.querySelector('#header .menu-button');

if (menuEl && menuButtonEl) {
    menuButtonEl.onclick = () => {
        menuEl.classList.toggle('active');
        menuButtonEl.classList.toggle('active');
    };
} else {
    console.error(
        'Não foi possível encontrar o menu ou o botão de menu.',
        'Verifique o código e corrija o erro.'
    );
}