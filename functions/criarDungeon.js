//imports necessários para criarmos
const Dungeon = require('../classes/dungeon')
const criarMonstroChefe = require('./criarMonstroChefe')
const criarArea = require('./criarArea')
const randomizer = require('./randomizer')

//Os biomas servirão para dar nome a dungeon e aos monstros
const biomas = ['Pântano', 'Bosque', 'Caverna', 'Gelo', 'Deserto']


module.exports = function criarDungeon(nivel) {

    //Aqui uma mexidinha no nível, só pra não ficar algo previsível
    const nivelReal = randomizer(nivel, nivel + 1)
    //escolendo o bioma da dungeon
    const bioma = biomas[randomizer(0, 4)]
    //aqui armazenaremos as áreas e seus conteúdos
    let areas = []
    //criando as áreas
    for (let i = 0; i < 3; i++) {
        const area = criarArea(bioma, nivelReal)
        areas.push(area)
    }

    //criando o monstro chefe
    const MonstroChefe = criarMonstroChefe(nivelReal, bioma)

    //criando a dungeon: nível, bioma, array de áreas e monstro chefe
    const dungeon = new Dungeon(nivelReal, bioma, areas, MonstroChefe)

    //retornando a dungeon
    return dungeon
}
