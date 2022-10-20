import React from 'react'

export default function HeaderWeather() {
  return (
    <header className='my-2'>
      <nav >
        <div className='text-5xl flex justify-center items-center'>
          <img src="../public/icons/unknown.png" />
          Weather App
        </div>
      </nav>
    </header>
  )
}
