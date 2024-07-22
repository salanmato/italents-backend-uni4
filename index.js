//Importando prompt
const prompt = require('prompt-sync')()

//Importando a classe herói, que será nosso jogador
const Heroi = require('./classes/heroi')

//Importando algumas funções que iremos usar diretamente aqui no index
const criarDungeon = require('./functions/criarDungeon')
const limparDungeon = require('./functions/limparDungeon')
const visitaABase = require('./functions/visitaABase')

//criando dois arrays de itens iniciais
const armasIniciais = [{ nome: 'Adaga', tipo: 'Adaga', ataque: 9, habilidadeEspecial: 'Você tem uma chance de conseguir um segundo ataque' }, { nome: 'Espada e Escudo', tipo: 'Espada e Escudo', ataque: 12, habilidadeEspecial: 'Você recebe 20% de dano reduzido' }, { nome: 'Espada Longa', tipo: 'Espada Longa', ataque: 16, habilidadeEspecial: 'Bate forte pra caramba' }]
const coleteInicial = { nome: 'Colete Básico', vida: 50 }



//começando um tutorial do jogo, aqui ensinaremos uma dinâmica utilizando o prompt.
console.log('Antes de mais nada, um tutorial de como jogar!')
let skip = prompt('Após um diálogo, você pode apertar qualquer tecla para continuar, experimente... ')
console.log('Ótimo!')
skip = prompt('Quando tivermos uma tomada de decisão, teremos opções sendos descritas, como vai ser agora, entendeu? S(sim) N(não) ').toLowerCase()
while (skip != 's') {
    skip = prompt('Acho que você não entendeu, vamos novamente. S(sim) N(não) ')
}
console.log('Legal! Podemos começar!')
console.log('____________________________________________________\n')


//iniciando o jogo.
//utilizando o prompt para termos textos com pausa. Assim, nosso jogador pode ter uma experiência melhor jogando.
skip = prompt('Bem-vindos candidatos, hoje estarei com vocês nesse "processo seletivo". Vocês podem me chamar de Bob. ')
skip = prompt('Como vocês já sabem, nós somos a DGClean e nosso trabalho é limpar Dungeons. ')
skip = prompt('Só conseguimos informações sobre elas quando entrarmos. Então, pode ter qualquer coisa lá dentro. ')
skip = prompt('Sei que parece um trabalho divertido, mas também é algo difícil, e por isso, teremos 2 testes com vocês! ')
skip = prompt('Hoje, vocês entenderão como funciona uma Dungeon, e se quiserem continuar, terão um segundo teste: O resto da semana explorando dungeons! ')
skip = prompt('Vamos lá! ')


//Aqui vamos começar a criar nosso herói, pedindo um nome para o jogador.
console.log()
let nome = prompt('Hey! Você, o primeiro da fila. Me diga seu nome: ')
console.log()

//Utilizando o while com validação para o nome
skip = prompt(`Seu nome é ${nome}? Isso mesmo? S(sim) N(não) `).toLowerCase()
while (skip != 's') {
    nome = prompt('Pois bem, me diga seu nome: ')
    skip = prompt(`Entendi... ${nome}? S(sim) N(não) `)
}


skip = prompt(`${nome}. Venha comigo, vou te mostrar como as coisas funcionam aqui..`)
skip = prompt('Começaremos no simulador, aqui você vai entrar em uma dungeon que criamos para treinamento e prática, fique tranquilo, o nível dela é baixo. ')
skip = prompt('Antes de mais nada, precisamos te equipar. ')
skip = prompt('Tome seu colete. Ele vai aumentar sua resistência lá dentro.')
skip = prompt('Agora vamos escolher uma arma. ')

//mostrando ao herói opções de armas iniciais
console.log(`Suas opções iniciais são: `)
let count = 1
armasIniciais.map(arma => {
    console.log(`\n- ${count} - ${arma.nome}\n- Ataque: ${arma.ataque}\n- Habilidade Especial: ${arma.habilidadeEspecial}\n\n`)
    console.log('---------------')
    count++
})

let escolhaArma = prompt('Qual arma deseja escolher? ')

//validação para a arma
while (escolhaArma != 1 && escolhaArma != 2 && escolhaArma != 3) {
    console.log('Opção inválida!')
    escolhaArma = prompt('Qual arma deseja escolher? ')
}

console.log(`Certo, você escolheu ${armasIniciais[escolhaArma - 1].nome}`)
skip = prompt('Não se preocupe, caso queira uma arma diferente, você sempre pode conseguir com o Vendedor Robson em nossa base. ')

//iniciando a variável que armazenará nosso jogador. Em ordem: nome, vida, ataque, arma e colete
let heroi = new Heroi(nome, 100, 10, armasIniciais[escolhaArma - 1], coleteInicial)


skip = prompt(`${heroi.nome} tome aqui 2 poções, hoje você pode ter que aprender a usá-las.\nAtenção: você só pode usá-las dentro da Dungeon, não se esqueça.\nTalvez você consiga algumas nos baús e na loja de equipamentos do Robson.\n`)

//utilizando o método addPotion, para dar duas poções ao nosso herói
heroi.addPotion(2)

console.log('Aqui está sua ficha, você pode acessá-la sempre que precisar. ')

//método ficha mostra algumas infos sobre nosso herói
heroi.ficha()

skip = prompt('Agora, vamos ao simulador! ')

//Iniciando uma Dungeon de tutorial, para nosso jogador aprender as mecânicas de combate. A função criaDungeon(nivel) recebe um nível para criar a Dungeon
const simulador = criarDungeon(0)

//Lá em criaDungeon temos a classe Dungeon. O método apresentação mostra seu bioma e nível de dificuldade.
simulador.apresentacao()

//Limpar dungeon é o que representa a estadia do herói na dungeon, dentro veremos os combates
limparDungeon(heroi, simulador)

//Aqui algumas validações após o tutorial. Seguindo a história, nosso herói só pode ser contratado se vencer a Dungeon simulada.
if (heroi.vidaAtual > 0) {
    skip = prompt('Meus parabéns! Você sobreviveu ao Simulador e passou no teste.')
    //Uma validação para ver se ele quer continuar a jogar
    skip = prompt(`Mas, e aí ${heroi.nome}! O que achou? Preparado para trabalhar conosco? S(sim) N(não) `).toLowerCase()
    if (skip == 's') {
        skip = prompt('Legal. Te espero amanhã.')
    } else {
        skip = prompt(`Aqui teremos uma boa oportunidade, você quer desistir? S(sim) N(não) `).toLowerCase()
        if (skip == 's') {
            //Se ele não quiser, paramos por aqui
            skip = prompt('Poxa, que pena, você parece um(a) candidato(a) promissor(a). Enfim...')
            console.log('Nos vemos por aí')
            skip = prompt('Fique com uma cópia da sua ficha como recordação.')
            heroi.ficha()
            return
        }
        skip = prompt('Legal. Então descansa, que amanhã você tá de volta.')
    }
} else {
    //Caso ele perca a Dungeon, ele cai aqui, e já perde o jogo
    skip = prompt(`${heroi.nome}, você não passou no teste. A equipe do Doutor Chuck vai cuidar de você. Fique tranquilo, seu dia será pago.`)
    console.log('Nos vemos por aí')
    skip = prompt('Fique com uma cópia da sua ficha como recordação.')
    heroi.ficha()

    return
}


//Chegamos as dungeons reais
/// Os dias estão aqui para contar o resto da semana, como é só a demo, resolvi simplificar
let dias = 3

skip = prompt('Agora vamos as Dungeons de verdade, e você se mostrou preparado(a)!')

//Fiz um for, cada laço representando 1 dia.
for (let i = 0; i < dias; i++) {
    //criando a dungeon do dia, que tera o nível do passo do laço + 1
    const dungeon = criarDungeon(i + 1)

    skip = prompt('Um novo dia começa.')
    skip = prompt('Antes de continuarmos, que tal um passeio por nossa base? Temos departamentos que podem te interessar!')

    //visita a base, é uma função onde teremos menus para lidar com lojas, cura e fortalecimento.
    visitaABase(heroi)

    //apresentação da Dungeon do dia
    dungeon.apresentacao()

    //Nosso herói visitando a dungeon
    limparDungeon(heroi, dungeon)

    //Validação parecida com a do tutorial. Lembrando que nosso herói tem que sobreviver a semana para ser contratado.
    if (heroi.vidaAtual > 0) {
        skip = prompt('Meus parabéns! Você sobreviveu a Dungeon. ')
        skip = prompt('Mal posso esperar para ver você limpando as próximas! ')
    } else {
        skip = prompt(`${heroi.nome}, você não passou no teste. A equipe do Doutor Chuck vai cuidar de você. Fique tranquilo, seus dias serão pagos.`)
        console.log('Nos vemos por aí')
        skip = prompt('Fique com uma cópia da sua ficha como recordação.')
        heroi.ficha()
        console.log('\nfim da demo de ranDungeon \n_____________________________')
        return
    }

}

//Só por garantia, mais uma validação de vida do nosso herói
if (heroi.vidaAtual > 0) {
    skip = prompt('Meus parabéns! Você sobreviveu a sua primeira semana  e passou no teste.')
    //Queremos saber se ele quer mesmo trabalhar
    skip = prompt(`Mas, e aí ${heroi.nome}! O que achou? Preparado para trabalhar conosco? S(sim) N(não) `).toLowerCase()
    if (skip == 's') {
        skip = prompt('Legal. Te espero semana que vem.')
    } else {
        skip = prompt(`Aqui teremos uma boa oportunidade, você quer desistir? S(sim) N(não) `).toLowerCase()
        if (skip == 's') {
            skip = prompt('Poxa, que pena, você parece um(a) candidato(a) promissor(a). Enfim...')
            console.log('Nos vemos por aí')
            skip = prompt('Fique com uma cópia da sua ficha como recordação.')
            heroi.ficha()

        }
        skip = prompt('Legal. Então descansa, que semana que vem você tá de volta.')
        heroi.ficha()
    }
} else {
    //caso ele tenha sido nocauteado, uma mensagem avisando que perdeu.
    skip = prompt(`${heroi.nome}, você não passou no teste. A equipe do Doutor Chuck vai cuidar de você. Fique tranquilo, seus dias serão pagos.`)
    console.log('Nos vemos por aí!')
    skip = prompt('Fique com uma cópia da sua ficha como recordação.')
    heroi.ficha()

}


console.log('\n\n\nfim da demo de ranDungeon_____________________________')




