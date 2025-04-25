/**
 * @file Ordenando números sem sort
 * @author Gabriel Eringer de Oliveira <gabriel.eringer.23@gmail.com>
 */

//Desafio Extra: Tente fazer uma função sem usar o sort para ordenar números

/**
 * 
 * @param {number[]} numbers Um Array de números
 * @returns {number[]} O Array de números ordenado em ordem crescente
 */
function sortNumbers(numbers) {
    for (let i = 0; i < numbers.length; i++)
        for (let j = 0; j < numbers.length; j++)
            if (numbers[j] > numbers[j + 1]) {
                let temp = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = temp;
            }
    return numbers
}

const numList = [6, 3, 4, 1, 8, 9, 2]
console.log('Original:', numList)
console.log('Ordenado com sort():', numList.sort())
console.log('Ordenado com sortNumbers():', sortNumbers(numList))