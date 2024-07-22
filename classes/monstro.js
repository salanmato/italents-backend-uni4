const Personagem = require('./personagem')

class Monstro extends Personagem{
    constructor(nome, vidaTotal, vidaAtual, nivel){
        super(nome, vidaTotal, vidaAtual)
        this.nivel = nivel
        this.ataque = (nivel * 7) + 5 // Aqui no monstro, temos o ataque sendo um cálculo do nível (que é igual ao da Dungeon) * 7 + 5. Esse valor foi devido a um balance patch na versão 0.0.0.5
    }

    //O status dele só tem ataque e vida, já que nossos monstros não tem armas e poções
    status(){
        console.log(`${this.nome}`)
        console.log(`- Vida atual: ${this.vidaAtual} / ${this.vidaTotal}`)
        console.log(`- Ataque: ${this.atacar()}`)
    }
}

module.exports = Monstro