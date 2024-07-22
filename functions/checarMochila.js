//Essa função ocorre quando abrimos a mochila, utilizamos ela para trocar de equipamentos.

//prompt
const prompt = require('prompt-sync')()

module.exports = function checarMochila(heroi) {

    //A função parte de um menu, utilizando um switch
    console.log('\nAbrindo a mochila\n')
    console.log('\n- 1 - Trocar Arma\n- 2 - Trocar Colete\n- 3 - Fechar Mochila\n')

    //opt vai ser nossa variável para lidar com as opções
    let opt = prompt('O que deseja? ')

    while (opt != '3') {
        switch (opt) {
            //olhando as armas
            case '1':
                //checagem caso não tenha armas
                if (heroi.armas.length == 0) {
                    console.log('Nenhuma arma na mochila')
                    opt = '3'
                } else {

                    console.log('\nAqui estão suas armas:')

                    //mostrando as armas
                    for (let i = 0; i < heroi.armas.length; i++) {
                        console.log(`${i + 1} - Nome: ${heroi.armas[i].nome} - Tipo: ${heroi.armas[i].tipo} - Ataque: ${heroi.armas[i].ataque}`)
                    }
                    console.log('0 - Voltar')

                    //utilizando outra variável para escolha.
                    let choice = prompt('Selecione por qual arma deseja trocar sua atual: ').toLowerCase()
                    if (heroi.armas[choice - 1]) {
                        //trocando as armas
                        console.log(`Colocando ${heroi.arma.nome} na bolsa e equipando ${heroi.armas[choice - 1].nome}`)
                        heroi.armas.push(heroi.arma)
                        heroi.arma = heroi.armas[choice - 1]
                        heroi.armas.splice(choice - 1, 1)

                        heroi.status()
                    } else if (choice == '0') {
                        //atualizando o opt, afim de sair da mochila
                        opt = '3'
                        break
                    } else {
                        console.log('Opção Inválida')
                    }
                }
                break;

            case '2':
                //muito parecido com o caso das armas
                if (heroi.coletes.length == 0) {
                    console.log('Nenhum colete na mochila')
                    opt = '3'
                } else {
                    console.log('\nAqui estão seus coletes:')

                    for (let i = 0; i < heroi.coletes.length; i++) {
                        console.log(`${i + 1} - Nome: ${heroi.coletes[i].nome} - Vida: ${heroi.coletes[i].vida}`)
                    }
                    console.log('0 - Voltar')

                    let choice = prompt('Selecione por qual colete deseja trocar seu atual: ').toLowerCase()
                    if (heroi.coletes[choice - 1]) {
                        console.log(`Colocando ${heroi.colete.nome} na bolsa e equipando ${heroi.coletes[choice - 1].nome}`)
                        heroi.coletes.push(heroi.colete)
                        heroi.colete = heroi.coletes[choice - 1]
                        heroi.coletes.splice(choice - 1, 1)

                        heroi.status()
                    } else if (choice == '0') {
                        opt = '3'
                        break
                    } else {
                        console.log('Opção Inválida')
                    }
                }
                break;

            default:
                console.log('Opção inválida!')
                break;
        }
    }


}