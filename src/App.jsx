import { useEffect, useState } from 'react';

function App() {
  const [status, setStatus] = useState('Ready');

  useEffect(() => {
    const isTelegram = window.Telegram && window.Telegram.WebApp;

    if (isTelegram) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      console.log('Inside Telegram');

      setStatus('Connecting...');
      fetch('https://tage-backend-production.up.railway.app/auth/telegram', {
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
            setStatus('Authenticated');
          } else {
            setStatus('Auth failed');
          }
        })
        .catch(() => setStatus('Backend not reachable'));

      return;
    }

    console.log('Not inside Telegram');
    setStatus('Open inside Telegram for authentication.');
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>$TAGE</h1>
      <p>{status}</p>
    </div>
  );
}

export default App;