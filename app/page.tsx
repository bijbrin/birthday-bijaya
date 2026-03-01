'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const useNameFromParams = () => {
  const [name, setName] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const nameParam = new URLSearchParams(window.location.search).get('name');
      if (nameParam) setName(decodeURIComponent(nameParam));
    }
  }, []);
  return name;
};

// Thank You Screen
const ThankYouScreen = ({ name, onPlay }: { name: string; onPlay: () => void }) => {
  const [pressed, setPressed] = useState(false);
  
  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-30"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0], rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 3 }}
          >
            {['✨', '🎉', '💝', '🌟', '🎈'][i % 5]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col justify-center flex-1">
        {/* Main Card */}
        <motion.div
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl"
          initial={{ y: 60, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.3 }}
        >
          {/* Heart Icon */}
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-4xl">💝</span>
          </motion.div>

          {/* Title - Centered */}
          <div className="text-center mb-6">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-800 mb-3">
              Thank You
            </h1>
            {name && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-block px-6 py-2 rounded-full text-xl sm:text-2xl font-bold text-white mb-3"
                style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}
              >
                {name}!
              </motion.div>
            )}
            <p className="text-gray-500 text-lg">For all the birthday wishes 🎂</p>
          </div>

          {/* Quote Card - Centered */}
          <motion.div
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 sm:p-6 mb-6 border border-purple-100 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl mb-2">💬</div>
            <p className="text-gray-700 text-base sm:text-lg italic leading-relaxed">
              "Grateful for another year and amazing people like you in my life."
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-300"></div>
              <span className="text-purple-500 font-medium">— {name || 'Bijaya'}</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-300"></div>
            </div>
          </motion.div>

          {/* BIG Beautiful Button */}
          <motion.button
            onClick={() => { setPressed(true); setTimeout(onPlay, 150); }}
            className="w-full relative"
            whileTap={{ scale: 0.97 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Shadow */}
            <div 
              className="absolute inset-0 rounded-2xl bg-purple-800 transition-transform duration-100"
              style={{ transform: pressed ? 'translateY(0)' : 'translateY(8px)' }}
            />
            
            {/* Button Face */}
            <div 
              className="relative rounded-2xl py-6 px-8 font-black text-2xl text-white flex items-center justify-center gap-4 transition-transform duration-100"
              style={{ 
                background: 'linear-gradient(180deg, #c084fc 0%, #a855f7 50%, #9333ea 100%)',
                transform: pressed ? 'translateY(8px)' : 'translateY(0)',
                boxShadow: pressed ? 'none' : 'inset 0 -6px 0 rgba(0,0,0,0.2), 0 4px 20px rgba(168, 85, 247, 0.5)',
              }}
            >
              <span className="text-3xl">🎮</span>
              <span className="uppercase tracking-widest">Play to Win!</span>
              <span className="text-3xl">🏆</span>
            </div>
          </motion.button>

          {/* Instructions */}
          <div className="flex justify-center gap-3 mt-6">
            {['👆 Tap', '🌲 Dodge', '⭐ Score'].map((t) => (
              <span key={t} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 font-medium">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Game
const FlappyGame = ({ onBack }: { onBack: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameover'>('waiting');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const gameStateRef = useRef(gameState);
  const scoreRef = useRef(score);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { scoreRef.current = score; }, [score]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = Math.min(window.innerWidth - 32, 400);
    const h = Math.min(window.innerHeight - 180, 500);
    canvas.width = w;
    canvas.height = h;

    let animId: number;
    let frame = 0;
    const bird = { x: w * 0.25, y: h / 2, r: 16, vy: 0, g: 0.35, j: -6.5 };
    let pipes: any[] = [];

    const reset = () => { bird.y = h / 2; bird.vy = 0; pipes = []; frame = 0; setScore(0); };
    
    const jump = () => {
      const s = gameStateRef.current;
      if (s === 'waiting') { setGameState('playing'); bird.vy = bird.j; }
      else if (s === 'playing') bird.vy = bird.j;
      else if (s === 'gameover') { setGameState('waiting'); reset(); }
    };

    canvas.addEventListener('click', jump);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); jump(); }, { passive: false });

    const draw = () => {
      // Sky
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#87CEEB');
      grad.addColorStop(1, '#E0F6FF');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Clouds
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      for (let i = 0; i < 3; i++) {
        const x = ((frame * 0.3) + i * 140) % (w + 100) - 50;
        ctx.beginPath(); ctx.arc(x, 50 + i * 40, 20, 0, Math.PI * 2);
        ctx.arc(x + 15, 40 + i * 40, 25, 0, Math.PI * 2);
        ctx.arc(x + 35, 50 + i * 40, 20, 0, Math.PI * 2);
        ctx.fill();
      }

      const s = gameStateRef.current;

      if (s === 'waiting') {
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🐦', bird.x, bird.y + 8);
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px system-ui';
        ctx.fillText('👆 TAP TO START', w / 2, h / 2);
      }
      else if (s === 'playing') {
        bird.vy += bird.g;
        bird.y += bird.vy;

        if (bird.y + bird.r > h - 10 || bird.y - bird.r < 10) {
          setGameState('gameover');
          if (scoreRef.current > highScore) setHighScore(scoreRef.current);
        }

        frame++;
        if (frame % 90 === 0) {
          const min = 70, max = h - 140 - min - 50;
          pipes.push({ x: w, th: Math.floor(Math.random() * (max - min) + min), p: false });
        }

        pipes = pipes.filter((p) => {
          p.x -= 2.8;
          
          ctx.fillStyle = '#4ade80';
          ctx.fillRect(p.x, 0, 50, p.th);
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(p.x - 3, p.th - 20, 56, 20);
          
          ctx.fillStyle = '#4ade80';
          ctx.fillRect(p.x, p.th + 140, 50, h - p.th - 140);
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(p.x - 3, p.th + 140, 56, 20);

          const hit = bird.x + bird.r > p.x && bird.x - bird.r < p.x + 50 &&
                     (bird.y - bird.r < p.th || bird.y + bird.r > p.th + 140);
          if (hit) {
            setGameState('gameover');
            if (scoreRef.current > highScore) setHighScore(scoreRef.current);
          }
          if (!p.p && p.x + 50 < bird.x) { p.p = true; setScore(v => v + 1); }
          return p.x > -50;
        });

        ctx.font = '24px Arial';
        ctx.fillText('🐦', bird.x, bird.y + 8);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 48px system-ui';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 8;
        ctx.fillText(scoreRef.current.toString(), w / 2, 60);
        ctx.shadowBlur = 0;
      }
      else {
        pipes.forEach((p) => {
          ctx.fillStyle = '#4ade80';
          ctx.fillRect(p.x, 0, 50, p.th);
          ctx.fillRect(p.x, p.th + 140, 50, h - p.th - 140);
        });
        ctx.font = '24px Arial';
        ctx.fillText('🐦', bird.x, bird.y + 8);
        
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, w, h);
        
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 36px system-ui';
        ctx.fillText('Game Over!', w / 2, h / 2 - 60);
        
        ctx.fillStyle = 'white';
        ctx.font = '26px system-ui';
        ctx.fillText(`Score: ${scoreRef.current}`, w / 2, h / 2);
        
        ctx.fillStyle = '#fbbf24';
        ctx.font = '22px system-ui';
        ctx.fillText(`Best: ${Math.max(highScore, scoreRef.current)}`, w / 2, h / 2 + 40);
        
        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 20px system-ui';
        ctx.fillText('Tap to retry', w / 2, h / 2 + 90);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); };
  }, [highScore]);

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-4"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-white/20 rounded-full text-white font-bold hover:bg-white/30 transition"
          >
            ← Back
          </button>
          <span className="text-white font-bold">🏆 {highScore}</span>
        </div>
        
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30">
          <canvas ref={canvasRef} className="block touch-none cursor-pointer" style={{ background: '#87CEEB' }} />
        </div>
        
        <p className="text-center text-white/80 mt-4">👆 Tap to fly • Dodge pipes!</p>
      </div>
    </motion.div>
  );
};

function AppContent() {
  const [showGame, setShowGame] = useState(false);
  const name = useNameFromParams();

  return (
    <AnimatePresence mode="wait">
      {!showGame ? (
        <ThankYouScreen key="t" name={name} onPlay={() => setShowGame(true)} />
      ) : (
        <FlappyGame key="g" onBack={() => setShowGame(false)} />
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}><span className="text-white text-2xl">Loading... ✨</span></div>}>
      <AppContent />
    </Suspense>
  );
}