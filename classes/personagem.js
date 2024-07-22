//vamos randomizar a ação do personagem
const randomizer = require("../functions/randomizer")

//base para criação do personagem
class Personagem {

    constructor(nome, vidaTotal, ataque) {
        //atributos que vão ser inicializados
        this.nome = nome
        this.vidaTotal = vidaTotal
        this.ataque = ataque

        //atributos que vão ser modificados
        this.vidaAtual = vidaTotal
    }

    //retorna o ataque do monstro
    atacar() {
        return this.ataque
    }

    //defender retorna 0 e lá na hora do combate veremos que é a forma de validar uma "defesa"
    defender() {
        return 0
    }

    //acao é um método que randomiza a ação do monstro
    acao() {
        const random = randomizer(0, 2)

        if (random == 0) {
           return this.defender()
        } else {
           return this.atacar()
        }

    }

}

module.exports = Personagem