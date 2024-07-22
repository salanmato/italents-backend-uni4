//Aqui é o menu de visita abase, importamos tudo que é acessado pela base
const prompt = require('prompt-sync')()
const checarMochila = require('./checarMochila')
const lojaDeEquipamentos = require('./lojaDeEquipamentos')
const enfermaria = require('./enfermaria')
const zonaDeTreinamento = require('./zonaDeTreinamento')

//a única entrada é o herói
module.exports = function visitaABase(heroi) {
    let opt

    while (opt != 's') {
        let skip = prompt('Você está na praça central da nossa base. ')


        console.log('\n1 - Loja de Equipamentos\n2 - Enfermaria\n3 - Zona de Treinamento\n4 - Checar Ficha\n5 - Checar Mochila\n6 - Sair')

        opt = prompt('Onde deseja ir? ')

        switch (opt) {
            case '1':
                lojaDeEquipamentos(heroi)
                break;
            case '2':
                enfermaria(heroi)
                break;
            case '3':
                zonaDeTreinamento(heroi)
                break;

            case '4':
                heroi.ficha() //acessar a ficha
                break;

            case '5':
                checarMochila(heroi) //acessar a mochila
                break;
            case '6':
                console.log('Okay, hora de visitar uma Dungeon!') //saindo da base
                opt = 's'
                break;

            default:
                break;
        }
    }
}