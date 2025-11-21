import "./db/connection.js"
import express from "express"
import cors from "cors"
import { Pinpoint } from "./db/models/pinpoints.js"
import { TopologyData } from "./db/models/topology.js"
import { TrailRouter } from "./routes/trail-router.js"

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// POST /api/topology - Receber dados topológicos
app.post('/api/topology', async (req, res) => {
  try {
    const { trailId, latitude, longitude, altitude, temperature, pressure, humidity,
            heading, speed, verticalSpeed, slope, surfaceType, deviceId, accuracy } = req.body;

    const data = new TopologyData({
      trailId,
      coordinates: { latitude, longitude, altitude },
      environment: { temperature, pressure, humidity },
      motion: { heading, speed, verticalSpeed },
      terrain: { slope, surfaceType },
      deviceId,
      accuracy
    });

    await data.save();
    res.status(201).json({ success: true, id: data._id });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// POST /api/topology/batch - Receber múltiplos pontos de uma vez
app.post('/api/topology/batch', async (req, res) => {
  try {
    const { points } = req.body;
    const docs = points.map(p => ({
      trailId: p.trailId,
      coordinates: { latitude: p.latitude, longitude: p.longitude, altitude: p.altitude },
      environment: { temperature: p.temperature, pressure: p.pressure, humidity: p.humidity },
      motion: { heading: p.heading, speed: p.speed, verticalSpeed: p.verticalSpeed },
      terrain: { slope: p.slope, surfaceType: p.surfaceType },
      deviceId: p.deviceId,
      accuracy: p.accuracy,
      timestamp: p.timestamp || new Date()
    }));

    const result = await TopologyData.insertMany(docs);
    res.status(201).json({ success: true, count: result.length });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// POST /api/pinpoints - Criar pinpoint
app.post('/api/pinpoints', async (req, res) => {
  try {
    const { title, description, category, latitude, longitude, altitude,
            photo, photoMimeType, trailId, createdBy, isPublic } = req.body;

    const pinpoint = new Pinpoint({
      title,
      description,
      category,
      coordinates: { latitude, longitude, altitude },
      photo: photo ? { data: photo, mimeType: photoMimeType } : undefined,
      trailId,
      createdBy,
      isPublic
    });

    await pinpoint.save();
    res.status(201).json({ success: true, pinpoint });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /api/pinpoints - Listar pinpoints
app.get('/api/pinpoints', async (req, res) => {
  try {
    const { trailId, category, lat, lng, radius, limit = 50 } = req.query;
    
    let query = { isPublic: true };
    
    if (trailId) query.trailId = trailId;
    if (category) query.category = category;
    
    // Busca por proximidade (raio em km)
    if (lat && lng && radius) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
      const radiusKm = parseFloat(radius);
      const latDelta = radiusKm / 111; // ~111km por grau
      const lngDelta = radiusKm / (111 * Math.cos(latNum * Math.PI / 180));
      
      query['coordinates.latitude'] = { $gte: latNum - latDelta, $lte: latNum + latDelta };
      query['coordinates.longitude'] = { $gte: lngNum - lngDelta, $lte: lngNum + lngDelta };
    }

    const pinpoints = await Pinpoint.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('-photo.data');

    res.json({ success: true, count: pinpoints.length, pinpoints });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/pinpoints/:id - Buscar pinpoint específico (com foto)
app.get('/api/pinpoints/:id', async (req, res) => {
  try {
    const pinpoint = await Pinpoint.findById(req.params.id);
    if (!pinpoint) return res.status(404).json({ success: false, error: 'Não encontrado' });
    res.json({ success: true, pinpoint });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use("/trail", TrailRouter)

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🏔️  Hiking API rodando na porta ${PORT}`);
});