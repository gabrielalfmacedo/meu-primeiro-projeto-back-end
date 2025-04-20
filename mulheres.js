const express = require("express") // Iniciando o express
const router = express.Router() // Configurando a primeira parte da rota
const cors = require('cors') //aqui estou trazendo o pacote cors que permite consumir essa APi no front end
const conectaBancoDeDados = require('./bancoDeDados') // Ligando ao banco de dados
conectaBancoDeDados() // Chamando a função que conecta o banco de dados 

const Mulher = require('./mulherModel')

const app = express() // Iniciando o app
app.use(express.json()) // Habilitando o uso de JSON
app.use(cors())
const porta = 3333 // Criando a porta 

// GET - Mostrar todas as mulheres
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()
        response.json(mulheresVindasDoBancoDeDados)
    } catch (erro) {
        console.log(erro)
        response.status(500).json({ erro: 'Erro ao buscar mulheres' })
    }
}

// POST - Criar nova mulher
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
        response.status(500).json({ erro: 'Erro ao criar mulher' })
    }
}

// PATCH - Corrigir dados de uma mulher
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem // Corrigido: antes estava sobrescrevendo o objeto inteiro
        }
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)
    } catch (erro) {
        console.log(erro)
        response.status(500).json({ erro: 'Erro ao atualizar mulher' })
    }
}

// DELETE - Deletar mulher
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ mensagem: 'Mulher deletada com sucesso' })
    } catch (erro) {
        console.log(erro)
        response.status(500).json({ erro: 'Erro ao deletar mulher' })
    }
}

// Configurando as rotas corretamente
router.get('/mulheres', mostraMulheres)
router.post('/mulheres', criaMulher)
router.patch('/mulheres/:id', corrigeMulher)
router.delete('/mulheres/:id', deletaMulher)

app.use(router) // Adiciona todas as rotas ao app

// Porta
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.listen(porta, mostraPorta)
