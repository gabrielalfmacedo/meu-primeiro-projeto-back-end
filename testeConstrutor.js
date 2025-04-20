const Mulher = require('./mulherModel')

const maria = new Mulher({
    nome: 'Maria',
    imagem: 'https://imagem.com/maria.jpg',
    citacao: 'Uma frase',
    minibio: 'Mini bio aqui'
})

console.log(maria)
