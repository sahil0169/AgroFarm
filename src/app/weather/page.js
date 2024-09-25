"use client"
import { useState, useEffect } from 'react';
import "./weather.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

export default function CropApp() {
  const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [suitableCrops, setSuitableCrops] = useState([]);
  const [error, setError] = useState(null);
  const [cropData, setCropData] = useState([]);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    // Fetch crop data from the external JSON file
    fetch('/crop.json')
      .then((response) => response.json())
      .then((data) => setCropData(data))
      .catch((err) => console.error('Error fetching crop data:', err));
  }, []);

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError(null);

    // Replace YOUR_API_KEY with your OpenWeatherMap API key
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2855f1f5e7678db6dd839ded3a966132`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
      checkCropSuitability(data);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
      setSuitableCrops([]);
    }

    try {
      const response1 = await fetch(url1);
      if (!response1.ok) {
        throw new Error('City not found');
      }
      const data1 = await response1.json();
      setForecastData(data1);
    } catch (error) {
      setError(error.message);
      setForecastData(null);
    }
  };

  const parseRange = (rangeStr) => {
    const [min, max] = rangeStr.split('-').map(Number);
    return { min, max };
  };

  const checkCropSuitability = (weather) => {
    const { temp, humidity } = weather.main;
    const windSpeed = weather.wind.speed;
    const windCondition = getWindCondition(windSpeed);

    const suitableCropsList = cropData.filter(crop => {
      const tempRange = parseRange(crop['TemperatureRange']);
      const humidityRange = parseRange(crop['Relative Humidity (%)']);
      const windConditions = crop['Wind Conditions'].split(',').map(cond => cond.trim());

      const tempSuitable = (temp >= tempRange.min && temp <= tempRange.max) ? true : false;
      const humiditySuitable = (humidity >= humidityRange.min && humidity <= humidityRange.max) ? true : false;
      const windSuitable = windConditions.includes(windCondition);
      console.log(temp, tempRange.min, tempRange.max, humidity, humidityRange.min, humidityRange.max);
      return tempSuitable && humiditySuitable && windSuitable;
    });
    
    console.log(suitableCropsList);
    setSuitableCrops(suitableCropsList);
  };

  const getWindCondition = (speed) => {
    if (speed < 3) return 'Light';
    if (speed < 7) return 'Moderate';
    return 'Strong';
  };

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <div className="container">
      <div className='box'>
        <h3>Crop Suitability Checker</h3>
      </div>

      {/* Search form */}
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Error handling */}
      {error && <p className="error">{error}</p>}

      {/* Weather data display */}
      {weatherData && (
        <div className="weather-info">
          <div className="weather">
            <div className="top">
              <div>
                <p className="city">{weatherData.name}</p>
                <p className="weather-description">{weatherData.weather[0].description}</p>
              </div>
              <img
                alt="weather"
                className="weather-icon"
                src={`${weatherData.weather[0].icon}.png`}
              />
            </div>
            <div className="bottom">
              <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
              <div className="details">
                <div className="parameter-row">
                  <span className="parameter-label">Feels like</span>
                  <span className="parameter-value">
                    {Math.round(weatherData.main.feels_like)}°C
                  </span>
                </div>
                <div className="parameter-row">
                  <span className="parameter-label">Wind</span>
                  <span className="parameter-value">{weatherData.wind.speed} m/s</span>
                </div>
                <div className="parameter-row">
                  <span className="parameter-label">Humidity</span>
                  <span className="parameter-value">{weatherData.main.humidity}%</span>
                </div>
                <div className="parameter-row">
                  <span className="parameter-label">Pressure</span>
                  <span className="parameter-value">{weatherData.main.pressure} hPa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {forecastData && (
        <div>
          <Accordion allowZeroExpanded>
            {forecastData.list.splice(0, 7).map((item, idx) => (
              <AccordionItem key={idx}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className="daily-item">
                      <img src={`${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                      <label className="day">{forecastDays[idx]}</label>
                      <label className="description">{item.weather[0].description}</label>
                      <label className="min-max">{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</label>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="daily-details-grid">
                    <div className="daily-details-grid-item">
                      <label>Pressure:</label>
                      <label>{item.main.pressure}</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Humidity:</label>
                      <label>{item.main.humidity}</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Clouds:</label>
                      <label>{item.clouds.all}%</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Wind speed:</label>
                      <label>{item.wind.speed} m/s</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Sea level:</label>
                      <label>{item.main.sea_level}m</label>
                    </div>
                    <div className="daily-details-grid-item">
                      <label>Feels like:</label>
                      <label>{item.main.feels_like}°C</label>
                    </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* Suitable crops display */}
      {suitableCrops.length > 0 && (
        <div className="crop-info">
          <h3>Suitable Crops for {city}:</h3>
          <div className="crop-container">
            {suitableCrops.map((crop, index) => (
              <div className="crop-card" key={index}>
                <h3>{crop.Plant}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No suitable crops message */}
      {weatherData && suitableCrops.length === 0 && (
        <p>No suitable crops found for the current weather conditions.</p>
      )}
    </div>
  );
}
