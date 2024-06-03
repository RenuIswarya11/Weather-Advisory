import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(null);

    useEffect(() => {
        if (weather) {
            const icon = getWeatherIcon(weather.weather[0].id, weather.main.temp);
            setWeatherIcon(icon);
        }
    }, [weather]);

    const fetchWeather = async () => {
        const apiKey = '5bd95e64e279453cc78a217fb9aa1d25';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(url);
            console.log(response.data);
            setWeather(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching weather data", error);
            setError("Unable to fetch weather data. Please try again.");
        }
    };

    const getWeatherIcon = (weatherId, temp) => {
        if (temp >= 30) {
            return 'hot.png';
        } else if (weatherId >= 800 && weatherId < 900) {
            return 'sun.png';
        } else if (weatherId >= 600 && weatherId < 700) {
            return 'snow.png';
        } else if (weatherId >= 500 && weatherId < 600) {
            return 'rain.png';
        } else if (weatherId >= 300 && weatherId < 400) {
            return 'drizzle.png';
        } else if (weatherId >= 200 && weatherId < 300) {
            return 'thunderstorm.png';
        } else {
            return 'cloud.png';
        }
    };

    return (
        <div className="weather-container">
            <h1 className="glowing-text">Weather Forecast</h1>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <button 
                type="button" 
                className="btn btn-outline-info"
                onClick={fetchWeather}
                style={{ transition: 'background-color 0.3s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#ADD8E6'}
                onMouseOut={(e) => e.target.style.backgroundColor = '' }
            >
                Check Weather
            </button>
            {error && <p className="error-message">{error}</p>}
            {weather && (
                <div className="weather-info">
                    <h2 className="dark-text">{weather.name}</h2>
                    <div className="weather-icon">
                        {weatherIcon && (
                            <img
                                src={`public/icons/${weatherIcon}`}
                                alt="Weather Icon"
                                style={{ borderRadius: '50%' }}
                            />
                        )}
                    </div>
                    <p className="dark-text">Temperature: {weather.main.temp} °C</p>
                    <p className="dark-text">Weather: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
