const express = require('express')
const app = express();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
app.use(express.json());

//rota para pegar a resposta
app.get('/filmes', async(req, res) => {
    const filmes = await prisma.filmes.findMany()
    res.json(filmes)
})

//rota para criar requisição
app.post("/filmes", async (req, res) =>{ 
    const {titulo, genero, ano, avaliacao} = req.body

    if(!titulo || !genero || !ano || !avaliacao){
        return res.status(400).json({error: "Titulo, genero, ano, avaliação são requisitadas"})
    }

    const filmes = await prisma.filmes.create({ 
        data: {
            titulo,
            genero,
            ano,
            avaliacao
        }
    }) 
    res.status(201).json(filmes) 
}) 

//rota para buscar um filme pelo id
app.get("/filmes/:id", async (req, res) =>{
    const id = parseInt(req.params.id)
    const filmes = await prisma.filmes.findUnique({where: {id}})
    if(!filmes){
        return res.status(404).json({error: "filme não encontrado"})
    }
    res.json(filmes)
})

//rota para deletar filmes
app.delete("/filmes/:id", async (req, res) =>{
    const id = parseInt(req.params.id)
    const filmes = await prisma.filmes.findUnique({where: {id}})
    if(!filmes){
        return res.status(404).json({error: "filme não encontrado"})
    }

    await prisma.filmes.delete({
        where:{id}
    })
    res.status(204).send()
})

//rota para atualizar o filme pelo id
app.put("/filmes/:id", async(req, res) =>{
    const id = parseInt(req.params.id)
    const filmes = await prisma.filmes.findUnique({where: {id}})

    if(!filmes){
        return res.status(404).json({error: "filme não encontrado"})
    }
    
    const {titulo, genero, ano, avaliacao} = req.body

    const updatedFilmes = await prisma.filmes.update({
        where:{id}, 
        data:{
            titulo,
            genero,
            ano,
            avaliacao
        }})

    res.json(updatedFilmes)
})


app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});
