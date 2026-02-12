import { useEffect, useState } from "react";

function App() {
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const checkTelegram = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        setIsTelegram(true);
      }
    };

    setTimeout(checkTelegram, 300);
  }, []);

  return (
    <div>
      <h1>$TAGE</h1>
      {!isTelegram && <p>Connecting...</p>}
      {isTelegram && <p>Inside Telegram </p>}
    </div>
  );
}

export default App;