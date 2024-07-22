const randomizer = require('./randomizer')
const MonstroChefe = require('../classes/monstroChefe')

//arrays para gerar nome
const monstrosChefes = [ 'Troll', 'Fada', 'Quimera', 'Elemental']
const biomasNome = [' do Pântano', ' do Bosque', ' da Caverna', ' de Gelo', ' do Deserto']
const biomas = ['Pântano', 'Bosque', 'Caverna', 'Gelo', 'Deserto']


module.exports = function criarMonstroChefe(nivel, bioma) {
    //criando o nome
    const nome = monstrosChefes[randomizer(0, 3)] + biomasNome[biomas.indexOf(bioma)]
    const vidaTotal = (nivel * 50) + 20 //calculo de vida
    const vidaAtual = vidaTotal

    //em ordem: nome, vidaTotal, vidaAtual e nível
    const chefe = new MonstroChefe(nome, vidaTotal, vidaAtual, nivel)
    return chefe
}
