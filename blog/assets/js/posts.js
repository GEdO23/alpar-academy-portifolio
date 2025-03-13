/**
 * @file Adiciona posts da Alpar Rocket Blog dinamicamente com JavaScript
 * @author Gabriel Eringer de Oliveira <gabriel.eringer.23@gmail.com>
 * @module blog/posts
 */

/**
 * @typedef {Object} Post Objeto que representa um post do blog.
 * @property {string} id Identificador único do post.
 * @property {string} title Título principal do post.
 * @property {string} content Conteúdo do post em formato HTML (uma string longa com várias seções HTML).
 */

/**
 * @typedef {Object} PostJson Estrutura de dados JSON para representar um post do blog.
 * @property {string} id Identificador único do post.
 * @property {string} title Título principal do post.
 * @property {string[]} content Lista de strings, onde cada string é uma parte do conteúdo do post em formato HTML
 */

/**
 * Adiciona um post ao conteúdo principal da página.
 * 
 * Esta função insere dinamicamente o conteúdo de um post HTML na página, com base nas propriedades de `id`, `title` e `content` do objeto `post`.
 * 
 * @param {Post} post - O post a ser adicionado à página.
 * @returns {void}
 * @example
 * const post = {
 *  id: '1',
 *  title: 'Titulo do post',
 *  content: `
 *      <!-- Conteúdo do post em formato HTML -->
 *  `,
 * };
 * addPost(post);
 */
function addPost(post) {
    const pageContentEl = document.querySelector('main#content');

    const articleEl = document.createElement('article');
    articleEl.setAttribute('data-post', post.id);
    articleEl.className = 'post';

    const headerEl = document.createElement('header');
    const titleEl = document.createElement('h2');
    titleEl.innerHTML = post.title;
    headerEl.appendChild(titleEl);

    const postContentEl = document.createElement('section');
    postContentEl.innerHTML = post.content;

    articleEl.appendChild(headerEl);
    articleEl.appendChild(postContentEl);
    pageContentEl?.appendChild(articleEl);
}

/**
 * Busca e renderiza posts dinamicamente a partir de um arquivo JSON.
 * 
 * Esta função carrega os posts do arquivo `posts.json`, processa e os exibe na página através da função `addPost`. 
 * 
 * Cada post inclui um título e conteúdo em formato HTML.
 * 
 * @async
 * @returns {Promise<void>}
 * @throws {Error} Caso ocorra algum erro durante a requisição ou processamento dos dados.
 * @example
 * fetchAndRenderPosts();
 */
async function fetchAndRenderPosts() {
    fetch('./assets/db/posts.json')
        .then((response) => response.json())
        .then((data) => data.posts)
        .then(
            /**
             * @param {PostJson[]} postsList Lista de posts a serem exibidos.
             */
            (postsList) => postsList.map(post => {
                try {
                    return {
                        id: post.id,
                        title: post.title,
                        content: post.content.reduce((a, b) => a += b)
                    }
                } catch (e) {
                    console.error(e);
                    return {
                        id: post.id,
                        title: post.title,
                        content: "<p>Erro ao carregar conteúdo...</p>"
                    }
                }
            })
        )
        .then(posts => posts.forEach(addPost));
}

fetchAndRenderPosts()