# Coffee Shop Project

## Folder Structure

```
coffee-shop/
├── frontend/     ← React + Vite (runs on port 5173)
└── backend/      ← Node.js + Express + MySQL (runs on port 3000)
```

## Run Frontend
```bash
cd frontend
npm install
npm run dev
```

## Run Backend
```bash
cd backend
cp .env.example .env     # fill in your MySQL password
npm install
npm run dev
```

## Run Both (open 2 terminals)
Terminal 1 → cd backend  → npm run dev
Terminal 2 → cd frontend → npm run dev
