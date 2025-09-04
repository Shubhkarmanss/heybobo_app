import { useEffect, useState } from 'react';

export default function WeatherCard({ city = 'Delhi' }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const key = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    fetch(url).then(r => r.json()).then(setData).catch(() => setData(null));
  }, [city]);

  return (
    <div className="card flex items-center gap-4">
      <div className="text-5xl">{data ? Math.round(data.main.temp) : '--'}°C</div>
      <div className="text-sm">
        <div className="font-semibold">Air-Quality</div>
        <div>Alert</div>
        <div className="mt-2 font-bold">DELHI</div>
      </div>
    </div>
  );
}
