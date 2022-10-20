import React from "react";

export default function WeatherCard({ weather, selectedCity }) {

  return (
    <div className="border-2 shadow-md my-2 rounded-lg p-4 hover:shadow-lg">
      <div className="flex  justify-evenly items-center">
        <div className="mx-2">
          <div className="flex items-center">
            <img
              src={`../public/icons/${weather.weathercode}.png`}
              className="h-16"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "../public/icons/unknown.png";
              }}
            />
            <h1 className="text-2xl text-gray-700 font-bold">{`${selectedCity.name}, ${selectedCity.country}`}</h1>
          </div>
          <div className="px-3 mx-5">
            <div>Wind Speed: {weather.windspeed}m/s</div>
            <div>Time: {`${weather.time?.replace("T", " ")}`}</div>
            <div>Wind direction: {weather.winddirection}</div>
          </div>
        </div>
        <div className="text-8xl font-thin">{weather.temperature}°C</div>
      </div>
    </div>
  );
}
