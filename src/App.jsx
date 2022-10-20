import axios from "axios";
import { useEffect, useState } from "react";
import Accordion from "./Accordion";
import {
  OPEN_METEO_API,
} from "./api";
import HeaderWeather from "./HeaderWeather";
import InputWeather from "./InputWeather";
import WeatherCard from "./WeatherCard";


function App() {
  const [selectedCity, setSelectedCity] = useState(undefined);
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();

  function changeCity() {
    const reqWeather = axios.get(
      OPEN_METEO_API +
        `latitude=${selectedCity.lat}&longitude=${selectedCity.lon}&timezone=auto&current_weather=true&daily=temperature_2m_max,temperature_2m_min,rain_sum,sunrise,sunset,snowfall_sum,precipitation_hours,weathercode`
    ).then((res) => {
      const sunrise = new Date(res.data.daily.sunrise[0])
      const sunset = new Date(res.data.daily.sunset[0])
      const time = new Date(res.data.current_weather.time)
      res.data.current_weather.weathercode = res.data.current_weather.weathercode.toString().substring(0, 1) + ( time > sunset || time < sunrise ? 'n' : '')
      setWeather(res.data.current_weather);
      setForecast(res.data.daily);
      console.log(res);
    }).catch((err) => { console.log(err); });
  }

  useEffect(() => {
    if (selectedCity?.lat) changeCity();
  }, [selectedCity])

  return (
    <div className="container mx-auto">
      <HeaderWeather />
      <div className="flex justify-center flex-col items-center">
        <InputWeather setSelectedCity={setSelectedCity} />
        {weather && <WeatherCard weather={weather} selectedCity={selectedCity} />}
          {forecast && <Accordion forecast={forecast} selectedCity={selectedCity}/>}
      </div>
    </div>
  );
}

export default App;
