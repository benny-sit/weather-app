import React, { useState } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";

export default function AccordionItem({ details }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <div
        className="bg-slate-200 w-full pl-1 pr-3 cursor-pointer mb-0 pb-0"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="flex items-center">
          <img
            src={`../public/icons/${details.weathercode.toString().substring(0,1)}.png`}
            alt="img"
            className="h-10"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "../public/icons/unknown.png";
            }}
          />
          <div className="text-slate-600">{details.day}</div>
          <div className="flex flex-grow text-end items-center justify-end ">
            <div className="mr-2 font-light">
              {`${details.temperature_2m_min}°C / ${details.temperature_2m_max}°C`}
            </div>
            {expanded ? <IoRemove /> : <IoAdd />}
          </div>
        </div>
      </div>
      {expanded ? (
        <div className="px-5 w-full max-w-[40rem] mt-0 pt-0">
          <div className="bg-slate-100/75 shadow-inner text-sm flex justify-around text-gray-600">
            <div className="mx-5 leading-4">
              <div>
                Rain Sum: {details.rain_sum}
                <span className="text-xs text-gray-500">mm</span>
              </div>
              <div>Sunrise: {details.sunrise.split("T")[1]}</div>
              <div>Sunset: {details.sunset.split("T")[1]}</div>
            </div>
            <div className="mx-5 leading-4">
              <div>
                Precipitation Hours: {details.precipitation_hours}
                <span className="text-xs text-gray-500">h</span>
              </div>
              <div>
                Snowfall Sum: {details.snowfall_sum}
                <span className="text-xs text-gray-500">mm</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
