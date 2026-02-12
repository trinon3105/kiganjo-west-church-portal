import React, { useEffect, useState } from 'react';

const Valentine: React.FC = () => {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (accepted) return;

    const interval = setInterval(() => {
      const heart = document.createElement('div');
      heart.style.position = 'absolute';
      heart.style.color = '#ff4da6';
      heart.style.fontSize = '20px';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animation = `floatHeart ${Math.random() * 3 + 2}s linear forwards`;
      heart.style.pointerEvents = 'none';
      heart.innerHTML = '❤️';
      const container = document.getElementById('valentine-container');
      container?.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    }, 300);

    return () => clearInterval(interval);
  }, [accepted]);

  return (
    <>
      <style>{`
        @keyframes floatHeart {
          0% { transform: translateY(100vh) scale(1); opacity: 1; }
          100% { transform: translateY(-10vh) scale(1.5); opacity: 0; }
        }
      `}</style>
      <div
        id="valentine-container"
        className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center"
        style={{ background: '#000', color: 'white', fontFamily: 'Arial, sans-serif' }}
      >
        {!accepted ? (
          <div className="relative z-10 text-center px-5">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#ff4da6' }}>
              Charity Onganga, Will You Be My Valentine? ❤️
            </h1>
            <p className="text-lg mb-2">
              Charity, you make my world brighter and my heart warmer. I don't just want today with you — I want forever.
            </p>
            <p className="text-lg mb-8">Will you be mine?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setAccepted(true)}
                className="px-8 py-3 text-lg font-semibold rounded-xl border-none cursor-pointer text-white"
                style={{ background: '#ff4da6' }}
              >
                Yes
              </button>
              <button
                onClick={() => alert('No is not an option my love 😊 Try again.')}
                className="px-8 py-3 text-lg font-semibold rounded-xl border-none cursor-pointer text-white"
                style={{ background: 'gray' }}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 text-center px-5">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#ff4da6' }}>
              You just made me the happiest man alive, Charity! ❤️
            </h1>
            <p className="text-lg">I love you endlessly.</p>
          </div>
        )}

        <iframe
          src="https://www.youtube.com/embed/MwpMEbgC7DA?autoplay=1&loop=1&playlist=MwpMEbgC7DA"
          allow="autoplay"
          className="fixed bottom-0 right-0"
          style={{ width: 0, height: 0, border: 0 }}
          title="Background music"
        />
      </div>
    </>
  );
};

export default Valentine;
