const prompt = require('prompt-sync')()

//chegamos a enfermaria, aqui podemos restaurar toda nossa vida (vida + colete)
module.exports = function enfermaria(heroi) {

    let skip = prompt('\nVocê é recebido por um pequeno cachorro caramelo... ')
    console.log('\nBem-vindo a Enfermaria, eu sou o Chuck. Se humanos podem cuidar de animais, eu posso cuidar de humanos.')
    console.log('\nAo custo de 20 moedas, eu posso restaurar toda sua vida.')

    let opt
    while (opt != 's' && opt != 'n') {
        opt = prompt('Deseja restaurar toda sua vida? S(sim) N(não) ')

        //validação. Já que custam 20 moedas para ser curado
        if (opt.toLowerCase() == 's') {
            if (heroi.moedas >= 20) {
                heroi.curar()
                heroi.status()
                heroi.usarMoedas(20)

                console.log('\nCerto! Até uma próxima. ')

            }

        } else if (opt.toLowerCase() == 'n') {
            console.log('Certo! Quando precisar é só chamar. ')
        } else {
            console.log('Desculpe, não entendi. ')
        }
    }
}