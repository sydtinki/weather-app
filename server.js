const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/weather', async (req, res) => {
  const { location } = req.body;

  try {
    const apiKey = '98d61540d3bad3101f2d18991cf06335';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    res.json({
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      // Add more relevant data based on the OpenWeatherMap API response
    });
  } catch (error) {
    res.status(400).json({ error: 'Location not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
