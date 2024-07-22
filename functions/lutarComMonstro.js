const randomizer = require('./randomizer')
const prompt = require('prompt-sync')()

//hora do combate
module.exports = function lutarComMonstro(heroi, monstro){
    //enquanto alguem está vivo, tem luta
    while (monstro.vidaAtual > 0 && heroi.vidaAtual > 0) {
        heroi.status() //mostrando status do herói 
        monstro.status() //mostrando status do monstro
        console.log('+++++++++++++++++++++++++')
        console.log('\n1 - Atacar\n2 - Defender\n3 - Beber uma poção\n') //Definindo o que quer fazer
        acao = prompt('O que deseja fazer? ')

        const acaoMonstro = monstro.acao() //randomizando a ação do monstro

        if (acao != 1 && acao != 2 && acao != 3) { //Se digitar algo errado, trata o erro aqui
            console.log('Opção inválida')
        } else {
            //ação do jogador
            switch (acao) {
                case '1':
                    if (acaoMonstro == 0) {
                        console.log(`${monstro.nome} se defendeu!`) //Se o monstro se defender, ele não recebe dano
                    } else {
                        monstro.vidaAtual -= heroi.atacar() //não se defendeu e tomou dano.
                        console.log(`Você conseguiu atacar o/a ${monstro.nome}!`)

                        //tratamento especial para armas do tipo ádaga, onde temos uma chance de atacar uma segunda vez.
                        if (heroi.arma.tipo == 'Adaga') {
                            if (randomizer(0, 4) == 0) {
                                monstro.vidaAtual -= heroi.atacar()
                                console.log(`Você conseguiu atacar o/a ${monstro.nome} uma segunda vez!`)
                            }
                        }
                    }
                    break;
                case '2':
                    console.log(`${heroi.nome} se defendeu!`) //Se você se defender, não leva dano
                    break
                case '3':
                    heroi.usarPotion() // se cura usando poção - lembrando que pode usar poção com vida cheia, isso é considerado missplay
                    break
                default:
                    break;
            }

            //ação do monstro
            switch (acaoMonstro) {
                case '0': //lembra do retorno 0 no defender do monstro?
                    console.log(`${monstro.nome} se defendeu!`)
                    break;
                default:
                    if (acao != 2 && acaoMonstro > 0 && monstro.vidaAtual > 0) { //como nosso herói sempre ataca antes, ele não pode receber dano de um monstro morto
                        if (heroi.arma.tipo == 'Espada e Escudo') {
                            heroi.vidaAtual -= Math.floor(monstro.atacar() / 10 * 8) //cálculo de redução de dano baseado no tipo de arma
                            console.log(`${monstro.nome} conseguiu atacar o herói!`)
                        } else {
                            heroi.vidaAtual -= monstro.atacar() //dano normal
                            console.log(`${monstro.nome} conseguiu atacar o herói!`)
                        }
                    } else if (acao == 2 && acaoMonstro > 0) {
                        console.log(`${monstro.nome} atacou, mas nosso herói se defendeu!`) //caso do herói se defender
                    }
                    break;
            }
        }

        if (monstro.vidaAtual < 1) {
            skip = prompt(`${monstro.nome} foi derrotado `) //caso do monstro morrer
        } else if (heroi.vidaAtual < 1) {
            skip = prompt(`${heroi.nome} foi nocauteado, equipe de resgate da Aurora a caminho! `) //caso dfo herói ser nocauteado
            return
        }

    }
}