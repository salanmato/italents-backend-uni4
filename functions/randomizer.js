//função que utilizamos para randomizar valores
function randomizer(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // o math.floor arredonda o valor recebido para o inteiro debaixo
}

module.exports = randomizer