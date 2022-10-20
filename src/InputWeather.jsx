import axios from "axios";
import React, { useDeferredValue, useEffect, useState } from "react";
import { IoSearch, IoLocationOutline } from "react-icons/io5";
import { OPEN_WEATHER_GEO, OPEN_WEATHER_KEY } from './api'

export default function InputWeather({ setSelectedCity}) {
    const [city, setCity] = useState('');
    const deferCity = useDeferredValue(city);
    const [OptionalCities, setOptionalCities] = useState([]);
    const [isOpen, setIsOpen] = useState(true);


    useEffect(() => {
        if (deferCity !== '') getCities();
    }, [deferCity]);

    async function getCities() {
        try {
            const res = await axios.get(OPEN_WEATHER_GEO + `q=${deferCity}&appid=${OPEN_WEATHER_KEY}&limit=10`);
            setOptionalCities(prev => res.data);
        } catch (err) {
            console.error(err);
        }
    }

    function handleInput(e) {
        setCity(e.target.value);
    }

    function selectCity(selected, e) {
        e.stopPropagation();
        setSelectedCity(selected);
        setIsOpen(false);
    }

  return (
    <>
    <div className="md:w-3/4 w-full relative flex justify-center" onClick={() => setIsOpen(prev => true)} onBlur={() => setIsOpen(false)}>
      <label className="relative block w-full">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 gap-1">
          <IoSearch className="fill-slate-300 h-5 w-5" />
          <div className="w-[0.05rem] bg-slate-300 h-5"></div>
        </span>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="City Name"
          type="text"
          name="search"
          value={city}
          onChange={handleInput}
          autoComplete="off"
        />
      </label>
      <ul className={`list-none absolute  bg-slate-100 py-1 w-full top-11 rounded-md ${isOpen ? 'visible' : 'invisible'}`}>
        {OptionalCities.length > 0 ? OptionalCities.map((c, idx) => {
            return <li key={idx} onMouseDown={(e) => selectCity(c, e)} className={`${idx !== OptionalCities.length - 1 ? 'border-b-2' : ''} py-1 mx-3 text-gray-500 hover:text-gray-900 cursor-pointer`}> {`${c.name}, ${c.country}`}</li>
        }) :
          <li className="self-center text-gray-500 flex items-center justify-center"><IoLocationOutline />No Resaults</li>
        }
      </ul>
    </div>
    </>
  );
}
