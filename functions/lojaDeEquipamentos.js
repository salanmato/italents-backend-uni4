//Chegamos a loja de equipamentos

const prompt = require('prompt-sync')()

//arrays de itens da loja
let armas = [{ nome: 'Adaga de Damasco', tipo: 'Adaga', ataque: 12, habilidadeEspecial: 'Você tem uma chance de conseguir um segundo ataque', preco: 30 },
{ nome: 'Espada de Damasco e Escudo de Aço', tipo: 'Espada e Escudo', ataque: 17, habilidadeEspecial: 'Você recebe 20% de dano reduzido', preco: 35 },
{ nome: 'Espada Extremamente Longa', tipo: 'Espada Longa', ataque: 40, habilidadeEspecial: 'Bate forte pra caramba', preco: 45 },
{ nome: 'Adaga Draconiana', tipo: 'Adaga', ataque: 30, habilidadeEspecial: 'Você tem uma chance de conseguir um segundo ataque', preco: 130 },
{ nome: 'Espada de Titânio e Escudo Absorvedor', tipo: 'Espada e Escudo', ataque: 37, habilidadeEspecial: 'Você recebe 20% de dano reduzido', preco: 120 },
{ nome: 'Espada Longa Flamejante', tipo: 'Espada Longa', ataque: 70, habilidadeEspecial: 'Bate forte pra caramba', preco: 145 }]

let coletes = [{ nome: 'Colete Tático', vida: 70, preco: 40 },
{ nome: 'Colete Mágico', vida: 90, preco: 80 },
{ nome: 'Pele de Dragão', vida: 120, preco: 120 },
{ nome: 'Traje Mágico', vida: 270, preco: 540 }]

module.exports = function lojaDeEquipamentos(heroi) {
    let opt, choice

    console.log('\nBem-vindo a loja de equipamentos!! Me chamo Robson e vou te atender!')
    while (opt != '0') {
        let skip

        //menu geral

        console.log('\n1 - Armas\n2 - Coletes\n3 - Poções\n0 - Sair ')

        opt = prompt('O que deseja? ').toLowerCase()

        switch (opt) {
            //menu de armas
            case '1':
                //mostrando todas as armas
                console.log('\nArmas? Okay! Vou te mostrar o que tenho aqui.\n')
                console.log('\n*************************************************************\n')
                for (let i = 0; i <= armas.length; i++) {
                    if (armas[i] == undefined) {
                        console.log(`- V - Voltar`)
                    } else {
                        console.log(`- ${i + 1} - ${armas[i].nome} - Tipo: ${armas[i].tipo} - Ataque: ${armas[i].ataque} - Preço: ${armas[i].preco} moedas`)
                    }
                }
                console.log('\n*************************************************************\n')
                opt = prompt(`\nE aí ${heroi.nome}, o que vai querer? `).toLowerCase()
                console.log()

                //validando se a opção escolhida é uma das armas
                if (armas[Number(opt) - 1]) {
                    choice = Number(opt) - 1
                    opt = prompt(`Você quer uma ${armas[choice].nome}? Ela custa ${armas[choice].preco} moedas. (S)sim (N)não: `).toLowerCase()
                    if (opt == 's') {
                        //verificando se o herói tem moedas suficiente
                        if (heroi.moedas < armas[choice].preco) {
                            console.log(`Saldo Insuficiente! Você tem ${heroi.moedas} moedas`)
                        } else {
                            heroi.usarMoedas(armas[choice].preco) //pagando
                            skip = prompt(`Okay, aqui está sua ${armas[choice].nome}. `)
                            heroi.armas.push(heroi.arma) //colocando a arma atual na mochila
                            heroi.arma = armas[choice] //equipando a nova arma
                        }
                    }
                    break

                } else if (opt == 'v') { //caso a opção seja voltar
                    break
                } else {
                    console.log('Opção inválida') // caso seja uma opção inválida
                    break
                }

            case '2':
                //o caso dos coletes é idêntico ao das armas
                console.log('\Coletes? Okay! Vou te mostrar o que tenho aqui.\n')
                console.log('\n*************************************************************\n')
                for (let i = 0; i <= coletes.length; i++) {
                    if (coletes[i] == undefined) {
                        console.log(`- V - Voltar`)
                    } else {
                        console.log(`- ${i + 1} - ${coletes[i].nome} - Vida: ${coletes[i].vida} - Preço: ${coletes[i].preco} moedas`)
                    }
                }
                console.log('\n*************************************************************\n')
                opt = prompt(`\nE aí ${heroi.nome}, o que vai querer? `).toLowerCase()
                console.log()
                if (coletes[Number(opt) - 1]) {
                    choice = Number(opt) - 1
                    opt = prompt(`Você quer uma ${coletes[choice].nome}? Ele custa ${coletes[choice].preco} moedas. (S)sim (N)não: `).toLowerCase()
                    if (opt == 's') {
                        if (heroi.moedas < coletes[choice].preco) {
                            console.log(`Saldo Insuficiente! Você tem ${heroi.moedas} moedas`)
                        } else {
                            heroi.usarMoedas(coletes[choice].preco)
                            skip = prompt(`Okay, aqui está seu ${coletes[choice].nome}. `)
                            heroi.coletes.push(heroi.colete)
                            heroi.colete = coletes[choice]
                        }
                    }
                    break

                } else if (opt == 'v') {
                    break
                } else {
                    console.log('Opção inválida')
                    break
                }

            case '3': //caso de poções
                console.log('\Poções? Okay! Cada uma custa 10 moedas\n')
                opt = prompt('\nQuantas vai querer? ')

                //Como o quem vem do prompt() é texto, aqui achei melhor transformar tudo em Number(opt), pra trabalhar melhor
                if(opt == '0'){//caso não queira
                    console.log('\nNenhuma? Tudo bem então...')
                }else if(Number(opt) > 0 && heroi.moedas >= opt * 10){//caso tenha o dinheiro
                    console.log(`\n${opt}? Vão custar ${opt * 10} moedas. \n`)
                    heroi.addPotion(Number(opt)) // adicionado pots
                    heroi.usarMoedas(Number(opt)) //pagando
                }else if(Number(opt) > 0 && heroi.moedas < Number(opt) * 10){//Caso não tenha moedas suficientes
                    console.log(`\nSaldo insuficiente\n`) 
                }else{
                    console.log('Não entendi...') //Tratando erros
                }
                break

            case 'v':
                break

            default:
                break
        }

    }

}