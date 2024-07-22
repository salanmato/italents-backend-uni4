const randomizer = require('./randomizer')
const lutarComMonstro = require('./lutarComMonstro') // função de combate
const checarMochila = require('./checarMochila') // trazemos a mochila para a dungeon
const prompt = require('prompt-sync')()

//hora do combate - a função recebe o herói e dungeon
module.exports = function limparDungeon(heroi, dungeon) {
    let acao
    let skip


    //mapeando as áreas da dungeon
    dungeon.areas.map(area => {
        console.log('\n=======================')
        console.log('=+++++++++++++++++++++=\n')

        //mostrando qtd de monstros
        skip = prompt(`Nessa área teremos ${area.monstrosDaArea.length} monstro(s) `)

        console.log('\n=======================')
        console.log('=+++++++++++++++++++++=\n')

        //validação para caso não tenhamos monstros
        if (area.monstrosDaArea.length > 0) {
            skip = prompt('\n | - HORA DO COMBATE - |')
        }
        //um embate para cada monstro
        area.monstrosDaArea.map(monstro => {
            console.log('\nUm novo inimigo apareceu!!')
            //chamamos a lutarComMonstro com o herói e o monstro
            lutarComMonstro(heroi, monstro)
        })
        //se o herói for nocauteado, nós saíremos
        if (heroi.vidaAtual < 1) {
            return
        } else {
            //recebendo os prêmios
            skip = prompt('\nHora de vermos o que temos no baú!')
            skip = prompt(`- Moedas: ${area.bau.qtdMoedas}\n- Poções: ${area.bau.qtdPotions}\n`)

            heroi.addPotion(area.bau.qtdPotions)
            heroi.addMoedas(area.bau.qtdMoedas)
            let opt
            //uma pausa na exploração
            while (opt != 'n') {
                console.log('\n+++++++++++++++++++++++++')
                console.log('\n1 - Consultar ficha\n2 - Beber uma poção\n3 - Checar mochila\n4 - Seguir em frente')
                opt = prompt('\nO que deseja fazer? ')

                switch (opt) {
                    case '1':
                        //checar ficha
                        heroi.ficha()
                        break;
                    case '2':
                        //usar poção
                        heroi.usarPotion()
                        break;
                    case '3':
                        //abrir a mochila, talvez queira trocar de equipamento
                        checarMochila(heroi)
                        break;
                    case '4':
                        opt = 'n'
                        //Seguir em frente
                        console.log('\nSeguindo em frente...\n')
                        break;
                    default:
                        console.log('\nOpção inválida!\n')
                        break;
                }

            }
        }
    })

    //após passarmos por todas as áreas, vamos ao Chefão
    //validação pra saber se o herói ainda não foi nocauteado
    if (heroi.vidaAtual > 0) {
        // boss fight
        skip = prompt('CHEGAMOS A ÚLTIMA ÁREA!!!')
        console.log('=======================')
        console.log('=+++++++++++++++++++++=')
        console.log('+=        SALA       =+')
        console.log('+=         DO        =+')
        console.log('+=        CHEFE      =+')
        console.log('=+++++++++++++++++++++=')
        console.log('=======================\n')
        //repetimos a lutarComMonstro aqui
        lutarComMonstro(heroi, dungeon.monstroChefe)

        //checagem de nocaute após luta com o boss
        if (heroi.vidaAtual > 0) {
            skip = prompt('\nPARABÉNS POR TER FINALIZADO A DUNGEON!!!\n')
            skip = prompt('AQUI ESTÁ SEU PRÊMIO!')

            //randomizando o prêmio
            let premio = randomizer(40, 70)
            console.log(`\nVocê ganhou ${premio} moedas!!`)
            heroi.addMoedas(premio)            //pagando o herói
            heroi.addDungeon(dungeon.nome) //adicionando a dungeon finalizada ao histórico
            heroi.ficha() //mostrando a ficha
        } else {
            //caso perca
            console.log('Infelizmente não deu.')
        }


    } else {
        return
    }

}