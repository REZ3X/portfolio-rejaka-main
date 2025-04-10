import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";

const ClockWeather: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temp: "24°C",
    condition: "Sunny",
    icon: "☀️",
    location: "Yogyakarta",
    loading: true,
    error: false,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "f5cb0b965ea1564c50c6f1b74534d823";
        const city = "Yogyakarta,id";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error("Weather data not available");
        }

        const data = await response.json();

        const getWeatherIcon = (weatherId: number) => {
          if (weatherId >= 200 && weatherId < 300) return "⚡️";
          if (weatherId >= 300 && weatherId < 400) return "🌧️";
          if (weatherId >= 500 && weatherId < 600) return "🌧️";
          if (weatherId >= 600 && weatherId < 700) return "❄️";
          if (weatherId >= 700 && weatherId < 800) return "🌫️";
          if (weatherId === 800) return "☀️";
          if (weatherId > 800) return "☁️";
          return "🌈";
        };

        setWeather({
          temp: `${Math.round(data.main.temp)}°C`,
          condition: data.weather[0].main,
          icon: getWeatherIcon(data.weather[0].id),
          location: "Yogyakarta, Indonesia",
          loading: false,
          error: false,
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeather({
          ...weather,
          loading: false,
          error: true,
        });
      }
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => clearInterval(weatherInterval);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="theme-bg-primary theme-text-primary p-5 rounded-2xl shadow-md h-full flex flex-col soft-card">
      <div className="flex flex-col items-center flex-grow">
        {}
        <div className="text-center mb-6 mt-3">
          <h2 className="text-[#e39fc2] font-medium text-lg mb-2">My Clock</h2>
          <div className="text-4xl font-light theme-text-primary mb-3">
            {formattedTime}
          </div>
          <div className="text-sm theme-text-secondary">{formattedDate}</div>
        </div>

        {}
        <div className="w-32 h-0.5 bg-gradient-to-r from-[#e39fc2] to-transparent rounded-full my-4"></div>

        {}
        <div className="text-center mt-2">
          <h2 className="text-[#e39fc2] font-medium text-lg mb-4">Weather</h2>
          {weather.loading ? (
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-[#463343] rounded-full mb-3"></div>
              <div className="h-6 w-16 bg-[#463343] rounded mb-2"></div>
              <div className="h-4 w-20 bg-[#463343] rounded mb-2"></div>
              <div className="h-3 w-32 bg-[#463343] rounded"></div>
            </div>
          ) : weather.error ? (
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-2">⚠️</div>
              <div className="text-sm theme-text-primary">
                Could not fetch weather
              </div>
              <div className="text-xs theme-text-secondary mt-1">
                Please try again later
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-3">{weather.icon}</div>
              <div className="text-2xl font-light theme-text-primary mb-1">
                {weather.temp}
              </div>
              <div className="text-sm theme-text-primary mb-2">
                {weather.condition}
              </div>
              <div className="text-xs theme-text-secondary">
                {weather.location}
              </div>
            </div>
          )}
        </div>

        {}
        <div className="mt-auto pt-3 text-center">
          <div className="text-xs text-[#c4b2c3]">♥ Have a wonderful day ♥</div>
        </div>
      </div>
    </div>
  );
};

export default ClockWeather;
