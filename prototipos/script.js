// @ts-nocheck

const numList = [1, 2, 3, 4];


/**
 * Chama uma função de retorno de chamada definida para cada elemento de um array e retorna um array que contém os resultados.
 * @param {(valor: any, indice: number, lista: any[]) => any[]} callbackfn Uma função que aceita até três argumentos. O método meuMap chama a função callbackfn uma vez para cada elemento do array.
 * @returns {any[]}
 */
Array.prototype.meuMap = function meuMap(callbackfn) {
    const novaLista = [];
    for (let i = 0; i < this.length; i++) {
        const elemento = this[i];
        novaLista.push(callbackfn(elemento, i, this));
    }
    return novaLista;
}


console.log('MAP');
console.log(numList.map(x => x * 2));
console.log(numList.meuMap(x => x * 2));


/**
 * Retorna os elementos de uma matriz que atendem à condição especificada em uma função de retorno de chamada.
 * @param {(valor: any, indice: number, lista: any[]) => any[]} predicado Uma função que aceita até três argumentos. O método meuFilter chama a função predicate uma vez para cada elemento do array.
 * @returns {any[]}
 */
Array.prototype.meuFilter = function meuFilter(predicado) {
    const novaLista = [];
    for (let i = 0; i < this.length; i++) {
        const elemento = this[i];
        if (predicado(elemento, i, this))
            novaLista.push(elemento);
    }
    return novaLista;
}


console.log('\nFILTER');
console.log(numList.filter(x => x % 2 === 0));
console.log(numList.meuFilter(x => x % 2 === 0));


/**
 * Chama a callback function especificada para todos os elementos de um array. 
 * O valor de retorno da callback function é o resultado acumulado e é fornecido como um argumento na próxima chamada à callback function.
 * @param {(valorAnterior: number, valorAtual: number, indiceAtual: number, lista: number[]) => number} callbackfn Uma função que aceita até quatro argumentos. O método reduce chama a função callbackfn uma vez para cada elemento do array.
 * @param {number} valorInicial Se valorInicial for especificado, ele será usado como valor inicial para iniciar a acumulação. A primeira chamada à função callbackfn fornece esse valor como um argumento em vez de um valor de array.
 * @returns {number}
 */
Array.prototype.meuReduce = function meuReduce(callbackfn, valorInicial = 0) {
    let resultado = valorInicial;
    for (let i = 0; i < this.length; i++) {
        const elemento = this[i];
        resultado = callbackfn(resultado, elemento, i, this);
    }
    return resultado;
}


console.log('\nREDUCE');
console.log(numList.reduce((prev, current) => prev + current, 0));
console.log(numList.meuReduce((prev, current) => prev + current, 0));


/**
 * Executa a ação especificada para cada elemento em uma matriz.
 * @param {(valor: any, indice: number, lista: any[]) => void} callbackfn Uma função que aceita até três argumentos. meuForEach chama a função callbackfn uma vez para cada elemento na matriz.
 * @returns {void}
 */
Array.prototype.meuForEach = function meuForEach(callbackfn) {
    for (let i = 0; i < this.length; i++) {
        callbackfn(this[i], i, this);
    }
}


console.log('\nFOR EACH');
console.log(numList.forEach(num => console.log(num)));
console.log(numList.meuForEach(num => console.log(num)));


/**
 * Retorna o valor do primeiro elemento na matriz onde o predicado é verdadeiro e undefined caso contrário.
 * @param {(valor: any, indice: number, obj: any[]) => any} predicado meuFind chama o predicado uma vez para cada elemento do array, em ordem crescente, até encontrar um em que predicado retorne verdadeiro. Se tal elemento for encontrado, meuFind retorna imediatamente o valor desse elemento. Caso contrário, meuFind retorna undefined.
 * @returns {any} 
 */
Array.prototype.meuFind = function meuFind(predicado) {
    for (let i = 0; i < this.length; i++) {
        const elemento = this[i];
        if (predicado(elemento, i, this)) {
            return elemento;
        }
    }
}


console.log('\nFIND');
console.log(numList.find(x => x === 2));
console.log(numList.meuFind(x => x === 2));