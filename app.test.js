const request = require('supertest');
const app = require('./app');

beforeEach(() => {
  app.resetFilmes();
});

describe('GET /api/filmes', () => {
  it('deve retornar a lista de filmes com status 200', async () => {
    const res = await request(app).get('/api/filmes');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);
  });
});

describe('POST /api/filmes', () => {
  it('deve adicionar um novo filme e retornar status 201', async () => {
    const novoFilme = { id: 3, nome: 'Interstellar' };
    const res = await request(app).post('/api/filmes').send(novoFilme);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(novoFilme);
  });

  it('deve persistir o filme adicionado na lista', async () => {
    const novoFilme = { id: 3, nome: 'Interstellar' };
    await request(app).post('/api/filmes').send(novoFilme);

    const res = await request(app).get('/api/filmes');
    expect(res.body.length).toBe(3);
    expect(res.body).toContainEqual(novoFilme);
  });
});

describe('DELETE /api/filmes/:id', () => {
  it('deve remover um filme existente e retornar status 204', async () => {
    const res = await request(app).delete('/api/filmes/1');
    expect(res.statusCode).toBe(204);
  });

  it('deve realmente remover o filme da lista', async () => {
    await request(app).delete('/api/filmes/1');
    const res = await request(app).get('/api/filmes');
    expect(res.body.length).toBe(1);
    expect(res.body.find((f) => f.id === 1)).toBeUndefined();
  });

  it('deve retornar 404 ao tentar remover um filme inexistente', async () => {
    const res = await request(app).delete('/api/filmes/999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('mensagem');
  });

  it('deve retornar 404 com id inválido (não-numérico resultando em NaN)', async () => {
    const res = await request(app).delete('/api/filmes/abc');
    expect(res.statusCode).toBe(404);
  });
});
