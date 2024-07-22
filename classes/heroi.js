// A classe personagem é uma base para todos os que vão "atuar" dentro do jogo
const Personagem = require('./personagem')

class Heroi extends Personagem {


    constructor(nome, vidaTotal, ataque, arma, colete) {
        //atributos que vão ser inicializados
        super(nome, vidaTotal, ataque)
        this.arma = arma
        this.colete = colete

        //atributos "padrão"
        this.potions = 0
        this.moedas = 0
        this.dungeonsLimpas = []
        this.coletes = []
        this.armas = []
        this.vidaAtual = this.vidaAtual < 0 ? 0 : this.vidaTotal + this.colete.vida // a checagem de vida < 0 é só para não descer a vida abaixo de 0 quando morrer.

    }

    //métodos

    //Ações
    //@override
    ///override no atacar, porque recebe também como valor a soma com ataque da arma
    atacar() {
        return this.ataque + this.arma.ataque
    }

    //Método para curar toda a vida do herói com o bonus do colete. Por enquanto, só estamos utilizando na enfermaria.
    curar() {
        this.vidaAtual = this.vidaTotal + this.colete.vida
    }

    //Aqui é o método comum de recuperar vida
    ///Detalhe: Você ainda consome a poção se estiver de vida cheia. Considero um missplay
    usarPotion() {
        //Se não tem poções, não tem como se curar
        if (this.potions < 1) {
            console.log('Eita, você está sem poções!!!')
        } else {
            //Se a soma com a cura da poção, for mais que a vidaAtual, ele se iguala com a soma do colete
            if (this.vidaAtual + 50 > this.vidaTotal + this.colete.vida) {
                this.vidaAtual = this.vidaTotal + this.colete.vida
                this.potions--
                console.log(`${this.nome} usou uma poção. Vida atual ${this.vidaAtual}/${this.vidaTotal} \n`)
                console.log(`Você ainda tem ${this.potions} poções\n`)
            } else {
                //se não, cura normalmente
                this.vidaAtual += 50
                this.potions--                            
                console.log(`${this.nome} usou uma poção. Vida atual ${this.vidaAtual}/${this.vidaTotal}`)
                console.log(`Você ainda tem ${this.potions} poções\n`)
            }
        }
    }

    //Método para pagar o pessoal lá da base.
    usarMoedas(qtd){
        //checagem se temos moedas o suficiente
        if(qtd > this.moedas){
            console.log('Saldo insuficiente!')
        }else{
            this.moedas = this.moedas - qtd
        }
    }

    //método para quando recebemos poções
    addPotion(qtd) {
        this.potions += qtd
    }

    //métodos para quando recebemos moedas
    addMoedas(qtd) {
        this.moedas += qtd
    }

    //método para adicionar dungeons limpas ao histórico do herói. Ainda não temos uso para esse array.
    addDungeon(dungeonNome){
        this.dungeonsLimpas.push(dungeonNome)
    }

    //método para quando subimos o nosso ataque. Por enquanto, só treinando.
    addAtaque(){
        this.ataque += 5
    }

    //método para quando subimos o nossa vida. Por enquanto, só treinando.
    addVida(){
        this.vidaTotal += 20
    }

    //A fica mostra informações gerais do nosso herói.
    ficha() {
        console.log('\n+++++++++++++++++++++++++\n')
        console.log('FICHA DO FUNCIONÁRIO')
        console.log(` Nome: ${this.nome}`)
        console.log(` -  Dungeons Limpas: ${this.dungeonsLimpas.length}`)
        console.log(` - - Vida atual: ${this.vidaAtual} / ${this.vidaTotal}`)
        console.log(` - - Ataque: ${this.atacar()}`)
        console.log(` - - Moedas: ${this.moedas}`)


        console.log(`\n - Equipamento:\n - - Arma: ${this.arma.nome} - Ataque: +${this.arma.ataque}\n - - Colete: ${this.colete.nome} - Vida: +${this.colete.vida}\n - - Poções: ${this.potions}`)
        console.log('\n+++++++++++++++++++++++++\n')
    }

    //Status é uma versão mais simples, com informações mais diretas
    status() {
        console.log('\n+++++++++++++++++++++++++\n')
        console.log(`Nome: ${this.nome}`)
        console.log(`- Vida atual: ${this.vidaAtual} / ${this.vidaTotal}`)
        console.log(`- Ataque: ${this.atacar()}`)
        console.log(`- Poções: ${this.potions}`)
        console.log('\n__________________________\n')
    }
}

module.exports = Heroi