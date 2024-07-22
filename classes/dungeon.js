//importando a randomizer
const randomizer = require('../functions/randomizer')

class Dungeon{
    
    constructor(nivel, bioma, areas, monstroChefe){
        this.nome = `${bioma} de nível ${nivel}` //Nome da Dungeon
        this.nivel = nivel  //Nível
        this.bioma = bioma, //Bioma
        this.areas = areas, //Array de áreas
        this.monstroChefe = monstroChefe //Monstro chefe
        

        this.dungeonCompleta = false
    }

    //métodos

    //Caso a dungeon seja vencida, nosso herói ganha uma quantidade de moedas
    recompensa(){
        //utilizando o randomizer para dar moedas ao herói
        const moedas = randomizer(10, 50)

        console.log(`Parabéns, você receberá ${moedas} moedas em recompensa por completar a Dungeon`)
        return moedas
    }

    //mensagem de apresentação da dungeon
    apresentacao(){
        console.log(`\nVamos lá, esta será uma Dungeon no bioma ${this.bioma} de nível ${this.nivel}.`)

        if(this.nivel < 3){
            console.log('Não vá achando que será fácil, tome cuidado')
        }else{
            console.log('Não se preocupe, nossa equipe de resgate comandada pela Aurora está a postos caso você seja nocauteado.')
            console.log('É um desafio, mas confio em você!')
        }
    }
}

module.exports = Dungeon