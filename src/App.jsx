import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://tage-backend-production.up.railway.app';

export default function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('Connecting...');

  useEffect(() => {
    const startAuth = () => {
      const tg = window.Telegram?.WebApp;
      if (!tg) {
        setStatus('Open this app inside Telegram.');
        return;
      }

      tg.ready();
      tg.expand();

      const initData = tg.initData;
      if (!initData) {
        setStatus('Missing Telegram initData');
        return;
      }

      const params = new URLSearchParams(initData);
      const startParam = params.get('start_param');
      const ref = startParam ? Number(startParam) : undefined;

      fetch(`${API_URL}/auth/telegram`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initData,
          ref: Number.isFinite(ref) ? ref : undefined,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Auth failed (${res.status})`);
          }
          return res.json();
        })
        .then((data) => {
          localStorage.setItem('token', data.token);
          setUser(data.user);
          setStatus('Authenticated');
        })
        .catch((err) => setStatus(err.message || 'Authentication failed'));
    };

    setTimeout(startAuth, 300);
  }, []);

  const refLink = user ? `https://t.me/tage_testbot?start=${user.id}` : '';

  return (
    <div style={{ padding: 24 }}>
      <h1>$TAGE</h1>
      {!user && <p>{status}</p>}
      {user && (
        <>
          <p>Balance: {user.balance}</p>
          <p>Referral: {refLink}</p>
        </>
      )}
    </div>
  );
}