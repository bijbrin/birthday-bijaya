'use client';

import { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Get name from URL params
const useNameFromParams = () => {
  const [name, setName] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get('name');
      if (nameParam) setName(decodeURIComponent(nameParam));
    }
  }, []);
  return name;
};

// Floating emojis from edges
const FloatingEmojis = () => {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    const emojis = ['🎈', '🎉', '✨', '🎂', '🎁', '💝', '🌟', '🎊', '🕯️', '🎀'];
    setItems(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      side: Math.floor(Math.random() * 4),
      size: 28 + Math.random() * 24,
      delay: Math.random() * 8,
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {items.map((p) => {
        const startPos = [
          { x: p.side === 0 ? Math.random() * 100 : p.side === 1 ? 110 : p.side === 2 ? Math.random() * 100 : -10, y: p.side === 0 ? -10 : p.side === 1 ? Math.random() * 100 : p.side === 2 ? 110 : Math.random() * 100 },
        ][0];
        return (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ fontSize: p.size, left: `${startPos.x}%`, top: `${startPos.y}%` }}
            animate={{
              x: [0, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 100],
              rotate: [0, 360, -180, 540],
              scale: [0.5, 1.2, 1, 0.8],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 12 + Math.random() * 10, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {p.emoji}
          </motion.div>
        );
      })}
    </div>
  );
};

// Thank You Screen - Juicy Duolingo Style
const ThankYouScreen = ({ name, onPlay }: { name: string; onPlay: () => void }) => {
  const [pressed, setPressed] = useState(false);
  
  const quotes = [
    "Your wishes made my day!",
    "Thanks for being awesome!",
    "You\'re the best!",
    "Grateful for you!",
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #58cc02 0%, #43b000 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <FloatingEmojis />
      
      {/* White card container */}
      <motion.div 
        className="relative z-10 w-full max-w-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.4 }}
      >
        {/* Main Card */}
        <div 
          className="bg-white rounded-3xl p-8 shadow-2xl"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 4px rgba(255,255,255,0.2)' }}
        >
          {/* Big Heart */}
          <motion.div
            className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #ff4b4b, #ff6b6b)' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-5xl">💝</span>
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl font-black text-center text-gray-800 mb-2">
            Thank You
            {name && <span className="text-green-500">{name}!</span>}
          </h1>
          
          <p className="text-gray-500 text-center text-lg mb-6">{quote}</p>

          {/* Quote bubble */}
          <div className="bg-gray-100 rounded-2xl p-4 mb-8 relative">
            <span className="absolute -top-2 left-6 text-2xl">💬</span>
            <p className="text-gray-600 italic text-center">"Another year older, feeling blessed!"</p>
            <p className="text-gray-400 text-sm text-center mt-2">— {name || 'Bijaya'}</p>
          </div>

          {/* JUICY Button */}
          <motion.button
            onClick={() => { setPressed(true); setTimeout(onPlay, 150); }}
            className="w-full relative"
            whileTap={{ scale: 0.95 }}
          >
            {/* Button shadow (creates 3D effect) */}
            <div 
              className="absolute inset-0 rounded-2xl transition-all duration-100"
              style={{ 
                background: '#1899d6',
                transform: pressed ? 'translateY(0)' : 'translateY(6px)',
              }}
            />
            
            {/* Button face */}
            <div 
              className="relative rounded-2xl py-5 px-8 font-black text-xl text-white transition-all duration-100 flex items-center justify-center gap-3"
              style={{ 
                background: pressed 
                  ? '#1899d6' 
                  : 'linear-gradient(180deg, #1cb0f6 0%, #1899d6 100%)',
                transform: pressed ? 'translateY(6px)' : 'translateY(0)',
                borderBottom: pressed ? 'none' : 'none',
                boxShadow: pressed ? 'none' : 'inset 0 -4px 0 rgba(0,0,0,0.2)',
              }}
            >
              <span>🎮</span>
              <span className="uppercase tracking-wider">Play to Win!</span>
              <span>🏆</span>
            </div>
          </motion.button>

          {/* Instructions */}
          <div className="flex justify-center gap-2 mt-6">
            {['👆 Tap', '🌲 Dodge', '⭐ Score'].map((t, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Flappy Game with Juicy feel
const FlappyGame = ({ onBack }: { onBack: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameover'>('waiting');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const gameStateRef = useRef(gameState);
  const scoreRef = useRef(score);
  const highScoreRef = useRef(highScore);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { highScoreRef.current = highScore; }, [highScore]);

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
    const pw = 55, gap = 140, speed = 2.8;

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
      // Sky gradient
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#4facfe');
      grad.addColorStop(1, '#00f2fe');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Clouds
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      for (let i = 0; i < 3; i++) {
        const x = ((frame * 0.3) + i * 130) % (w + 100) - 50;
        ctx.beginPath(); ctx.arc(x, 60 + i * 45, 25, 0, Math.PI * 2);
        ctx.arc(x + 20, 50 + i * 45, 32, 0, Math.PI * 2);
        ctx.arc(x + 45, 60 + i * 45, 25, 0, Math.PI * 2);
        ctx.fill();
      }

      const s = gameStateRef.current;

      if (s === 'waiting') {
        // Bird
        ctx.font = '28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🐦', bird.x, bird.y + 8);
        
        // Instructions
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 26px system-ui';
        ctx.fillText('👆 TAP TO FLY', w / 2, h / 2);
      }
      else if (s === 'playing') {
        bird.vy += bird.g;
        bird.y += bird.vy;

        if (bird.y + bird.r > h - 10 || bird.y - bird.r < 10) {
          setGameState('gameover');
          if (scoreRef.current > highScoreRef.current) setHighScore(scoreRef.current);
        }

        frame++;
        if (frame % 90 === 0) {
          const min = 70, max = h - gap - min - 50;
          pipes.push({ x: w, th: Math.floor(Math.random() * (max - min) + min), p: false });
        }

        pipes = pipes.filter((p) => {
          p.x -= speed;
          
          // Draw pipe
          ctx.fillStyle = '#78c800';
          ctx.fillRect(p.x, 0, pw, p.th);
          ctx.fillStyle = '#58aa00';
          ctx.fillRect(p.x - 4, p.th - 25, pw + 8, 25);
          
          ctx.fillStyle = '#78c800';
          ctx.fillRect(p.x, p.th + gap, pw, h - p.th - gap);
          ctx.fillStyle = '#58aa00';
          ctx.fillRect(p.x - 4, p.th + gap, pw + 8, 25);

          // Collision
          const hit = bird.x + bird.r > p.x && bird.x - bird.r < p.x + pw &&
                     (bird.y - bird.r < p.th || bird.y + bird.r > p.th + gap);
          if (hit) {
            setGameState('gameover');
            if (scoreRef.current > highScoreRef.current) setHighScore(scoreRef.current);
          }
          
          if (!p.p && p.x + pw < bird.x) { p.p = true; setScore(v => v + 1); }
          return p.x > -pw;
        });

        // Bird
        ctx.font = '28px Arial';
        ctx.fillText('🐦', bird.x, bird.y + 8);

        // Score
        ctx.fillStyle = 'white';
        ctx.font = 'bold 48px system-ui';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 8;
        ctx.fillText(scoreRef.current.toString(), w / 2, 60);
        ctx.shadowBlur = 0;
      }
      else {
        pipes.forEach((p) => {
          ctx.fillStyle = '#78c800';
          ctx.fillRect(p.x, 0, pw, p.th);
          ctx.fillRect(p.x, p.th + gap, pw, h - p.th - gap);
        });
        ctx.font = '28px Arial';
        ctx.fillText('🐦', bird.x, bird.y + 8);
        
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, w, h);
        
        ctx.fillStyle = '#ff4b4b';
        ctx.font = 'bold 36px system-ui';
        ctx.fillText('💥 Game Over!', w / 2, h / 2 - 60);
        
        ctx.fillStyle = 'white';
        ctx.font = '28px system-ui';
        ctx.fillText(`Score: ${scoreRef.current}`, w / 2, h / 2);
        
        ctx.fillStyle = '#ffc800';
        ctx.font = '22px system-ui';
        ctx.fillText(`🏆 Best: ${Math.max(highScoreRef.current, scoreRef.current)}`, w / 2, h / 2 + 40);
        
        ctx.fillStyle = '#1cb0f6';
        ctx.font = 'bold 20px system-ui';
        ctx.fillText('👆 Tap to retry', w / 2, h / 2 + 90);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); canvas.removeEventListener('click', jump); canvas.removeEventListener('touchstart', jump); };
  }, []);

  return (
    <motion.div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-4" style={{ background: 'linear-gradient(180deg, #58cc02 0%, #43b000 100%)' }}>
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="px-4 py-2 bg-white/20 rounded-full text-white font-bold hover:bg-white/30 transition">← Back</button>
          <span className="text-white font-bold">🏆 {highScore}</span>
        </div>
        
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30">
          <canvas ref={canvasRef} className="block touch-none cursor-pointer" style={{ background: '#4facfe' }} />
        </div>
        
        <p className="text-center text-white/80 mt-4 font-medium">👆 Tap to fly • Dodge green pipes!</p>
      </div>
    </motion.div>
  );
};

// Main
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: '#58cc02' }}><span className="text-white text-2xl">Loading... 🎮</span></div>}>
      <AppContent />
    </Suspense>
  );
}