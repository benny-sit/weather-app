import React from 'react'
import AccordionItem from './AccordionItem'

export default function Accordion({forecast, selectedCity}) {
  return (
    <div className='flex flex-col relative justify-center items-center min-w-[16rem] w-3/4 gap-2'>
        {forecast.time.map((t, idx) => {
            const d = new Date(t);
            const oneDay = {day: d.toLocaleDateString('en-US', {weekday: 'long'})}
            Object.keys(forecast).forEach(key => {
                oneDay[key] = forecast[key][idx]
            })
            return  <AccordionItem key={`${idx}-${selectedCity.name}`} details={oneDay}/>
        })}
    </div>
  )
}
