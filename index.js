import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const BASE_URL = 'https://rickandmortyapi.com/api';

// Sirve archivos estáticos desde la carpeta /public
app.use(express.static(path.join(__dirname, 'public')));

// GET /api/characters?page=1&name=rick
app.get('/api/characters', async (req, res) => {
  try {
    const { page = 1, name = '' } = req.query;
    const url = `${BASE_URL}/character?page=${page}&name=${encodeURIComponent(name)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error || 'Error al obtener personajes' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/character/:id
app.get('/api/character/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`${BASE_URL}/character/${id}`);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error || 'Personaje no encontrado' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta raíz: sirve el HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});