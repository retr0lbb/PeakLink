import "./db/connection.js"
import express from "express"
import cors from "cors"
import { TrailRouter } from "./routes/trail-router.js"
import { topologyRouter } from "./routes/topology-router.js"

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use("/trail", TrailRouter)
app.use("/topology", topologyRouter)

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🏔️  Hiking API rodando na porta ${PORT}`);
});