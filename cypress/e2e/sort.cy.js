// @ts-nocheck

import { sortNumbers } from '../../assets/js/sort.mjs';

describe('Ordenando uma lista de números em ordem crescente', () => {

  it('Deve ordenar uma lista de números que tenha um único número', () => {
    const numerosOrdenados = sortNumbers([1]);
    expect(numerosOrdenados).to.deep.equal([1]);
  })

  it('Deve ordenar uma lista de números que tenha dois números em ordem decrescente', () => {
    const numerosOrdenados = sortNumbers([2, 1]);
    expect(numerosOrdenados).to.deep.equal([1, 2]);
  })

  it('Deve ordenar uma lista de números que tenha três números em ordem aleatória', () => {
    const numerosOrdenados = sortNumbers([3, 1, 2]);
    expect(numerosOrdenados).to.deep.equal([1, 2, 3]);
  })

  it('Deve ordenar uma lista de números que tenha quatro números em ordem aleatória', () => {
    const numerosOrdenados = sortNumbers([3, 1, 2, 1]);
    expect(numerosOrdenados).to.deep.equal([1, 1, 2, 3]);
  })

  it('Deve ordenar uma lista de números que tenha oito números em ordem aleatória', () => {
    const numerosOrdenados = sortNumbers([9, 2, 5, 1, 3, 2, 4, 7]);
    expect(numerosOrdenados).to.deep.equal([1, 2, 2, 3, 4, 5, 7, 9]);
  })

  it('Deve ordenar uma lista de números que tenha oito números em ordem decrescente', () => {
    const numerosOrdenados = sortNumbers([8, 1, 7, 2, 6, 3, 4, 5]);
    expect(numerosOrdenados).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8]);
  })

  it('Deve retornar a lista de números quando vazia', () => {
    const numerosOrdenados = sortNumbers([]);
    expect(numerosOrdenados).to.deep.equal([]);
  })

})