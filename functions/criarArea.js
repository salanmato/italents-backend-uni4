//função onde criamos áreas de dungeons
const randomizer = require('./randomizer')
const Monstro = require('../classes/monstro')

//Os arrays aqui são para criar aleatóriamente os monstros
const monstros = ['Goblin', 'Kobold', 'Golem', 'Elfo', 'Orc', 'Esqueleto']
const biomas = ['Pântano', 'Bosque', 'Caverna', 'Gelo', 'Deserto']
const biomasNome = [' do Pântano', ' do Bosque', ' da Caverna', ' de Gelo', ' do Deserto']


module.exports = function criarArea(bioma, nivel) {
    //array de monstros da área
    let monstrosDaArea = []
    //randomizando quantos monstros estarão na área
    let qtdMonstros = randomizer(0, 4)
    //Definindo a quantidade de vida dos monstros
    let vidaTotal = (nivel * 20) + 10

    //criando cada monstro
    for (let i = 0; i < qtdMonstros; i++) {
        //em sequencia: nome q é a união de um tipo de monstro + o bioma, vida total, vida inicial(q é a mesma q vida total) e nível
        const monstro = new Monstro(monstros[randomizer(0, 3)] + biomasNome[biomas.indexOf(bioma)], vidaTotal, vidaTotal, nivel)

        //colocando ele na área
        monstrosDaArea.push(monstro)
    }


    //randomizando os premios
    let qtdPotions = randomizer(0, 3)
    let qtdMoedas = randomizer(0, 20)
    const bau = { qtdMoedas, qtdPotions }

    //devolvemos o array de monstros e o que tem dentro do baú
    return { monstrosDaArea, bau }
}