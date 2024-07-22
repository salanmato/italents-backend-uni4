const prompt = require('prompt-sync')()

//zona de treinamento, onde melhoramos nossos stats(ataque e vida)
module.exports = function zonaDeTreinamento(heroi) {
    let skip = prompt('DANCE MUSIC TOCANDO ALTO!!!')
    console.log('\nBEM-VINDO A ZONA DE TREINAMENTO!!!\nMEU NOME É JORGE E VOU TE AJUDAR A FICAR MAIS FORTE!!!')
    console.log('\nCADA TREINO IRÁ TE CUSTAR 15 MOEDAS!!!!!\n')
    console.log('AQUI TEMOS 2 OPÇÕES DE TREINO!!\n- 1 - TREINO DE FORÇA (AUMENTA SEU ATAQUE EM 5)\n- 2 - TREINO DE RESISTÊNCIA (AUMENTA SUA VIDA EM 20)\n- 3 - ARREGAR (FUGIR DA ACADEMIA)')

    let opt

    while (opt != '3') {
        let choice = prompt(`E AÍ ${heroi.nome.toUpperCase()}, QUAL VAI SER? `)
        //menu da zona
        switch (choice) {
            case '1': //caso de escolher aumentar o ataque
                if (heroi.moedas >= 15) { //validando se o herói tem moedas o suficiente
                    heroi.addAtaque()
                    console.log('\nTÁ CHORANDO DEPOIS DE UM TREINO LEVE DESSE?!?!?!')
                    console.log('\nTreino de força finalizado!!!')
                    heroi.status()
                    heroi.usarMoedas(15) //pagando
                    opt = '3' //atualiando opt para sair
                } else {
                    console.log(`${heroi.nome.toUpperCase()}, INFELIZMENTE TU VAI TER QUE TREINAR NA PRÁTICA!!!`) //caso não tenha moedas
                    opt = '3'
                }
                break;

            case '2': //mesmo caso do case '1'
                if (heroi.moedas >= 15) {
                    heroi.addVida()
                    console.log('\nTÁ CHORANDO DEPOIS DE UM TREINO LEVE DESSE?!?!?!')
                    console.log('\nTreino de resistência finalizado!!!')
                    heroi.status()
                    heroi.usarMoedas(15)
                    opt = '3'
                } else {
                    console.log(`${heroi.nome.toUpperCase()}, INFELIZMENTE TU VAI TER QUE TREINAR NA PRÁTICA!!!`)
                    opt = '3'
                }
                break;
            case '3':
                console.log('ENTENDO! NEM TODO MUNDO TEM DISPOSIÇÃO PRA TREINAR COMIGO!') //caso desista de treinar
                opt = '3'
                break
            default:
                console.log('OPÇÃO INVÁLIDA!')
                break;
        }
    }

}