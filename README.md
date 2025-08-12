# Deploy — Investidor Iniciante 360

## Pré-requisitos
- Conta no MongoDB Atlas (ou banco local)
- Conta no provedor de host (Heroku, Render, DigitalOcean App Platform, AWS, etc.)
- Docker (opcional)

## Variáveis de ambiente necessárias
- MONGODB_URI  (string de conexão Atlas ou local)
- PORT (ex.: 3000)
- JWT_SECRET (string longa e aleatória)
- SEED_ADMIN_EMAIL (email admin para seed)
- SEED_ADMIN_PASS (senha temporária para seed)

## Passos rápidos — Render (exemplo recomendado)
1. Crie um repositório Git com todo o projeto.
2. No Render: New → Web Service → Conecte ao repo.
   - Build Command: `npm run build:client && npm install --production`
   - Start Command: `node server/server.js`
   - Set Environment Variables: cole MONGODB_URI, JWT_SECRET, SEED_*.
3. Deploy.

## Passos rápidos — Heroku
1. `heroku create nome-app`
2. Adicione variáveis: `heroku config:set MONGODB_URI="..." JWT_SECRET="..."`
3. Push: `git push heroku main`
4. Build script (procfile) pode ser `web: node server/server.js`. Garanta que `npm run build:client` seja executado no buildpack (ou use pipeline com GitHub Actions).

## Docker (rodar local / VPS)
1. Build: `docker build -t investimentos-app .`
2. Run: `docker run -p 3000:3000 --env-file .env investimentos-app`

## Após deploy — criar seed admin & conteúdo
1. Rodar seed de usuário:
   - Se tiver shell no servidor: `node seed_users.js`
   - Ou rodar localmente apontando MONGODB_URI do Atlas
2. Rodar seed de páginas:
   - `node seed.js`

## Observações de segurança
- Troque `JWT_SECRET` por um valor aleatório >32 chars.
- Ative HTTPS (Render/Heroku ativam TLS por padrão).
- Restrinja CORS em produção para domínios autorizados.
