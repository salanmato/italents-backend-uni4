const Monstro = require('./monstro')

module.exports = class MonstroChefe extends Monstro{
    constructor(nome, vidaTotal, vidaAtual, nivel){
        super(nome, vidaTotal, vidaAtual, nivel)

        this.ataque = (nivel * 20) + 10 //Cálculo parecido com o do monstro normal.
    }
}
