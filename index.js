const express = require('express');
const app = express();
const port = 8080;

const produtos = [{ id: 1, nome: "Matrix" }, { id: 2, nome: "Inception" }];

app.get('/api/filmes', (req, res) => {
    res.json(produtos);
});

app.use(express.json()); // Necessário para ler o corpo da requisição

app.post('/api/filmes', (req, res) => {
    const novoFilme = req.body;
    produtos.push(novoFilme);
    res.status(201).json(novoFilme);
});

app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));