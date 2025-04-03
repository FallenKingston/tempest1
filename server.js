require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Servir archivos estáticos desde "public"

// Ruta para obtener el clima por ciudad
app.get('/weather', async (req, res) => {
    const { city } = req.query;
    const apiKey = process.env.API_KEY;

    if (!city) {
        return res.status(400).json({ error: "Debes proporcionar una ciudad." });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "No se pudo obtener el clima. Verifica el nombre de la ciudad." });
    }
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => console.log('🔥 Servidor corriendo en http://localhost:3000'));
