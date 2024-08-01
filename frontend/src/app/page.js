// src/app/page.js
'use client';  

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://llm-rnqt.onrender.com')
    //fetch('http://localhost:8000/') //local
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>Frontend con Next.js</h1>
      {data ? <p>{data.Hello}</p> : <p>Cargando...</p>}
    </div>
  );
}
