# API de Filmes

API REST desenvolvida em Node.js com Express para gerenciamento de filmes.

## Rotas

| Método | Rota            | Descrição               | Status de retorno               |
|--------|-----------------|-------------------------|---------------------------------|
| GET    | /api/filmes     | Lista todos os filmes   | 200                             |
| POST   | /api/filmes     | Adiciona um novo filme  | 201                             |
| DELETE | /api/filmes/:id | Remove um filme pelo ID | 204 (ok) / 404 (não encontrado) |

## Como rodar

```bash
npm install
npm start
```

## Testes

```bash
npm test
```

Cobertura mínima exigida: **90%**.

## Lint

```bash
npm run lint
```

## Workflow (GitFlow)

- `master` — baseline protegida; só recebe merges via PR aprovado
- `develop` — branch de integração
- `feature/*` — branches de desenvolvimento

## CI/CD (GitHub Actions)

Dois workflows automáticos:

- **ci-commit.yml** — disparado em todo `push`
- **ci-pull-request.yml** — disparado em Pull Requests para `master` e `develop`

Cada workflow executa três jobs independentes:

1. **build-and-test** — instala dependências e executa smoke test na API
2. **lint** — verifica estilo de código com ESLint
3. **coverage** — executa os testes e valida cobertura >= 90%

## Histórico de funcionalidades

- [x] Rota GET implementada e integrada
- [x] Rota POST implementada e integrada
- [x] Rota DELETE implementada e integrada
- [x] Testes automatizados com cobertura >= 90%
- [x] Lint configurado (ESLint)
- [x] GitHub Actions configurado (commit + pull request)

