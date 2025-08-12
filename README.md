# Investidor Iniciante 360 - Starter Package

Instructions:
1. Copy `.env.example` to `.env` and fill values (MongoDB Atlas URI, JWT_SECRET).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create seed admin user:
   ```bash
   node seed_users.js
   ```
4. Populate pages:
   ```bash
   node seed.js
   ```
5. Run in development:
   - Start backend: `npm run dev`
   - Start client: `cd client && npm install && npm run dev`
6. Build & run production:
   ```bash
   npm run start:prod
   ```
