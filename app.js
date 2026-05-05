const express = require('express');

const app = express();

app.use(express.json());

let filmes = [
  { id: 1, nome: 'Matrix' },
  { id: 2, nome: 'Inception' },
];

// Permite resetar o array durante os testes
app.resetFilmes = () => {
  filmes = [
    { id: 1, nome: 'Matrix' },
    { id: 2, nome: 'Inception' },
  ];
};

app.get('/api/filmes', (req, res) => {
  res.json(filmes);
});

app.post('/api/filmes', (req, res) => {
  const novoFilme = req.body;
  filmes.push(novoFilme);
  res.status(201).json(novoFilme);
});

app.delete('/api/filmes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = filmes.findIndex((f) => f.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Filme não encontrado' });
  }

  filmes.splice(index, 1);
  return res.status(204).send();
});

module.exports = app;
