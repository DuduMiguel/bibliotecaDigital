const express = require('express')
const router = express.Router()
const dbKnex = require('./data/db_config.js')
const cors = require('cors')
router.use(cors())

router.get('/', async (req, res) => {
    try {
        const jogos = await dbKnex('jogos').orderBy('id', 'desc')
        res.status(200).json(jogos)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

router.post('/', async (req, res) => {
    const { titulo, produtora, ano, preco, capa } = req.body

    if (!titulo || !produtora || !ano || !preco || !capa) {
        res.status(400).json({ msg: 'Mande as informações completas -> titulo,produtora, ano, preco e capa' })
        return
    }

    try {
        const novoJogo = await dbKnex('jogos').insert({ titulo, produtora, ano, preco, capa })
        res.status(201).json({ msg: 'Jogo adicionado com sucesso', id: novoJogo[0] })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { titulo, produtora, ano, preco, capa } = req.body

    const fieldsToUpdate = {}

    if (titulo) fieldsToUpdate.titulo = titulo
    if (produtora) fieldsToUpdate.produtora = produtora
    if (ano) fieldsToUpdate.ano = ano
    if (preco) fieldsToUpdate.preco = preco
    if (capa) fieldsToUpdate.capa = capa

    if (Object.keys(fieldsToUpdate).length === 0) {
        res.status(400).json({ msg: 'Nenhum campo para atualizar' })
        return
    }

    try {
        await dbKnex('jogos').update(fieldsToUpdate).where({ id })
        res.status(200).json({ msg: `Jogo de id: ${id} atualizado com sucesso!` })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})


router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        await dbKnex('jogos').del().where({ id })
        res.status(200).json({ msg: `Jogo de id: ${id}, deletado com sucesso!` })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

router.get('/filtro/:palavra', async (req, res) => {
    const { palavra } = req.params

    try {
        const jogos = await dbKnex('jogos').where('titulo', 'like', `%${palavra}%`).orWhere('produtora', 'like', `%${palavra}%`)
        res.status(200).json(jogos)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

router.get('/dados/resumo', async (req, res) => {
    try {
        const consulta = await dbKnex('jogos').
            count({ totalDeJogos: 'id' }).
            sum({ somaPreco: 'preco' }).
            max({ maxPreco: 'preco' }).
            avg({ mediaPreco: 'preco' })
        const { totalDeJogos, somaPreco, maxPreco, mediaPreco } = consulta[0]
        res.status(200).json({ totalDeJogos, somaPreco, maxPreco, mediaPreco: Number(mediaPreco.toFixed(2)) })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

router.get('/dados/grafico', async (req, res) => {
    try {
        const totalPorAno = await dbKnex('jogos').select('ano').sum({ total: 'preco' }).groupBy('ano')
        res.status(200).json(totalPorAno)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

router.get('/dados/maiscaro', async (req, res) => {
    try {
        const maxPrecoResult = await dbKnex('jogos').max({ maxPreco: 'preco' }).first()
        const maxPreco = maxPrecoResult.maxPreco

        const jogoMaisCaro = await dbKnex('jogos').where({ preco: maxPreco }).orderBy('id', 'desc')

        if (jogoMaisCaro.length > 0) {
            res.status(200).json(jogoMaisCaro)
        } else {
            res.status(404).json({ msg: 'Jogo mais caro não encontrado' })
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

router.get('/dados/:ano', async (req, res) => {
    const { ano } = req.params

    try {
        const jogosPorAno = await dbKnex('jogos').select('*').where({ ano: ano}).orderBy('id','desc')
        if (jogosPorAno.length > 0) {
            res.status(200).json(jogosPorAno)
        } else {
            res.status(400).json({ msg: 'Nenhum jogo encontrado para o ano especificado' })
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

module.exports = router

