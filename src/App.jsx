import { useEffect, useState } from 'react';

function App() {
  const [status, setStatus] = useState('Connecting...');

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      setStatus('Not inside Telegram');
      return;
    }

    tg.ready();

    fetch('http://localhost:3000/auth/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        initData: tg.initData
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setStatus('Authenticated ?');
        } else {
          setStatus('Auth failed ?');
        }
      })
      .catch(() => setStatus('Backend not reachable ?'));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>$TAGE</h1>
      <p>{status}</p>
    </div>
  );
}

export default App;
