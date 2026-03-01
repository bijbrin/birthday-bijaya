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

// Thank You Screen - Apple Music Replay Style
const ThankYouScreen = ({ name, onPlay }: { name: string; onPlay: () => void }) => {
  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 25%, #a18cd1 50%, #fbc2eb 75%, #667eea 100%)',
        backgroundSize: '400% 400%'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Animated mesh gradient background */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        style={{
          background: 'radial-gradient(ellipse at 20% 20%, rgba(255, 154, 158, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(102, 126, 234, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(161, 140, 209, 0.3) 0%, transparent 60%)',
        }}
      />

      {/* Parallax Emojis - Foreground (large, blurred) */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`fg-${i}`}
            className="absolute opacity-20"
            style={{ 
              left: `${10 + i * 15}%`, 
              top: `${20 + (i % 3) * 25}%`,
              fontSize: `${60 + Math.random() * 40}px`,
              filter: 'blur(2px)'
            }}
            animate={{ 
              y: [0, -50, 0], 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 6 + Math.random() * 4, 
              repeat: Infinity, 
              delay: i * 0.8,
              ease: 'easeInOut'
            }}
          >
            {['✨', '🎉', '💝', '🌟', '🎈', '🎂'][i]}
          </motion.div>
        ))}
      </div>

      {/* Parallax Emojis - Background (small, sharp) */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`bg-${i}`}
            className="absolute opacity-40"
            style={{ 
              left: `${5 + i * 12}%`, 
              top: `${10 + (i % 4) * 20}%`,
              fontSize: `${20 + Math.random() * 15}px`
            }}
            animate={{ 
              y: [0, -20, 0], 
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 10 + Math.random() * 5, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: 'linear'
            }}
          >
            {['✨', '🎊', '💖', '⭐', '🎁', '🎵', '🌸', '💫'][i]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg flex flex-col justify-center flex-1">
        {/* Glass Container */}
        <motion.div
          className="rounded-3xl p-8 sm:p-12 text-center"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
          initial={{ y: 60, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.3 }}
        >
          {/* Gradient Text Header */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 
              className="text-5xl sm:text-7xl font-black mb-4"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6B6B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              Thank You
            </h1>
            
            {name && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mb-4"
              >
                <span 
                  className="text-3xl sm:text-4xl font-bold"
                  style={{
                    background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {name}!
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Quote */}
          <motion.p
            className="text-white/90 text-lg sm:text-xl leading-relaxed mb-8 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ lineHeight: '1.7' }}
          >
            "Grateful for another year and<br />amazing people like you in my life."
          </motion.p>

          {/* Hero Play Button - Neon Glow */}
          <motion.button
            onClick={onPlay}
            className="relative mx-auto"
            whileTap={{ scale: 0.95 }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="rounded-full px-10 py-5 font-black text-xl text-white flex items-center gap-3 cursor-pointer"
              style={{
                background: 'linear-gradient(45deg, #00dbde, #fc00ff)',
                boxShadow: '0 0 30px rgba(252, 0, 255, 0.6), 0 0 60px rgba(0, 219, 222, 0.4)'
              }}
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 0 20px rgba(252, 0, 255, 0.6), 0 0 40px rgba(0, 219, 222, 0.3)',
                  '0 0 40px rgba(252, 0, 255, 0.8), 0 0 80px rgba(0, 219, 222, 0.5)',
                  '0 0 20px rgba(252, 0, 255, 0.6), 0 0 40px rgba(0, 219, 222, 0.3)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <span className="text-2xl">🎮</span>
              <span className="uppercase tracking-widest">Play to Win</span>
              <span className="text-2xl">🏆</span>
            </motion.div>
          </motion.button>

          {/* Bouncing Arrow */}
          <motion.div
            className="mt-6 text-white/70"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-2xl">👇</span>
            <p className="text-sm mt-1 font-medium">Tap to Start</p>
          </motion.div>
        </motion.div>

        {/* Signature - Bijaya */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p 
            className="text-3xl sm:text-4xl text-white/80"
            style={{
              fontFamily: 'cursive, Georgia, serif',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              fontStyle: 'italic'
            }}
          >
            — {name || 'Bijaya'}
          </p>
          <p className="text-white/50 text-sm mt-2">For all the birthday wishes 🎂</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Game - Fullscreen with Nepali theme
const FlappyGame = ({ onBack }: { onBack: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const birdImgRef = useRef<HTMLImageElement | null>(null);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameover'>('waiting');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const gameStateRef = useRef(gameState);
  const scoreRef = useRef(score);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { scoreRef.current = score; }, [score]);

  // Load bird image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { birdImgRef.current = img; };
    img.src = 'https://i.imgur.com/8RJH7Xy.png';
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fullscreen dimensions
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animId: number;
    let frame = 0;
    const bird = { x: window.innerWidth * 0.2, y: window.innerHeight / 2, r: 20, vy: 0, g: 0.4, j: -7 };
    let pipes: any[] = [];
    let mountainsOffset = 0;

    const reset = () => { 
      bird.y = canvas.height / 2; 
      bird.vy = 0; 
      pipes = []; 
      frame = 0; 
      setScore(0); 
    };
    
    const jump = () => {
      const s = gameStateRef.current;
      if (s === 'waiting') { setGameState('playing'); bird.vy = bird.j; }
      else if (s === 'playing') bird.vy = bird.j;
      else if (s === 'gameover') { setGameState('waiting'); reset(); }
    };

    canvas.addEventListener('click', jump);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); jump(); }, { passive: false });

    // Draw Nepali mountains
    const drawMountains = (offset: number) => {
      const w = canvas.width;
      const h = canvas.height;
      
      // Far mountains (Himalayas style)
      ctx.fillStyle = '#8B7355';
      ctx.beginPath();
      for (let i = 0; i <= w; i += 50) {
        const peak = Math.sin((i + offset * 0.3) * 0.01) * 80 + 150;
        ctx.lineTo(i, h - peak);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();

      // Mid mountains
      ctx.fillStyle = '#A0522D';
      ctx.beginPath();
      for (let i = 0; i <= w; i += 40) {
        const peak = Math.sin((i + offset * 0.5) * 0.015) * 60 + 100;
        ctx.lineTo(i, h - peak);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();

      // Near hills (green)
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      for (let i = 0; i <= w; i += 30) {
        const peak = Math.sin((i + offset * 0.8) * 0.02) * 40 + 60;
        ctx.lineTo(i, h - peak);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();

      // Rice terraces effect
      ctx.strokeStyle = '#1a6b1a';
      ctx.lineWidth = 2;
      for (let y = h - 50; y < h; y += 15) {
        ctx.beginPath();
        for (let i = 0; i <= w; i += 20) {
          ctx.lineTo(i, y + Math.sin((i + offset) * 0.03) * 5);
        }
        ctx.stroke();
      }
    };

    // Draw prayer flags
    const drawPrayerFlags = (x: number, y: number) => {
      const colors = ['#3498db', '#fff', '#e74c3c', '#f1c40f', '#2ecc71'];
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 60, y - 30);
      ctx.stroke();

      colors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(x + 10 + i * 10, y - 25 + i * 2, 8, 15);
      });
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Sky gradient (Nepali sky)
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#1e3c72');
      grad.addColorStop(0.5, '#87CEEB');
      grad.addColorStop(1, '#E0F6FF');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Sun
      ctx.fillStyle = 'rgba(255, 200, 100, 0.3)';
      ctx.beginPath();
      ctx.arc(w * 0.8, h * 0.15, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 180, 80, 0.5)';
      ctx.beginPath();
      ctx.arc(w * 0.8, h * 0.15, 40, 0, Math.PI * 2);
      ctx.fill();

      const s = gameStateRef.current;

      if (s === 'playing') {
        mountainsOffset += 1;
      }
      drawMountains(mountainsOffset);

      // Prayer flags
      if (frame % 300 === 0) {
        // Add new prayer flag positions occasionally
      }
      drawPrayerFlags(w * 0.7, h * 0.6);
      drawPrayerFlags(w * 0.3, h * 0.55);

      if (s === 'waiting') {
        // Draw bird with image or fallback
        if (birdImgRef.current) {
          ctx.save();
          ctx.translate(bird.x, bird.y);
          ctx.rotate(Math.min(Math.max(bird.vy * 0.05, -0.5), 0.5));
          ctx.drawImage(birdImgRef.current, -bird.r, -bird.r, bird.r * 2, bird.r * 2);
          ctx.restore();
        } else {
          ctx.font = '40px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('🇳🇵', bird.x, bird.y + 12);
        }

        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('👆 TAP TO START', w / 2, h / 2);
        ctx.font = '20px system-ui';
        ctx.fillText('Dodge the bamboo poles!', w / 2, h / 2 + 40);
      }
      else if (s === 'playing') {
        bird.vy += bird.g;
        bird.y += bird.vy;

        // Ground collision
        if (bird.y + bird.r > h - 20 || bird.y - bird.r < 0) {
          setGameState('gameover');
          if (scoreRef.current > highScore) setHighScore(scoreRef.current);
        }

        frame++;
        if (frame % 100 === 0) {
          const min = 100, gap = 160;
          const max = h - gap - min - 100;
          pipes.push({ x: w, th: Math.floor(Math.random() * (max - min) + min), p: false });
        }

        pipes = pipes.filter((p) => {
          p.x -= 3;
          
          // Bamboo-style pipes (Nepali theme)
          const pipeWidth = 60;
          
          // Top pipe
          ctx.fillStyle = '#D2691E';
          ctx.fillRect(p.x, 0, pipeWidth, p.th);
          // Bamboo segments
          ctx.strokeStyle = '#8B4513';
          ctx.lineWidth = 2;
          for (let y = 10; y < p.th; y += 20) {
            ctx.beginPath();
            ctx.moveTo(p.x, y);
            ctx.lineTo(p.x + pipeWidth, y);
            ctx.stroke();
          }
          // Pipe cap
          ctx.fillStyle = '#CD853F';
          ctx.fillRect(p.x - 5, p.th - 25, pipeWidth + 10, 25);
          
          // Bottom pipe
          ctx.fillStyle = '#D2691E';
          ctx.fillRect(p.x, p.th + gap, pipeWidth, h - p.th - gap);
          // Bamboo segments
          for (let y = p.th + gap + 10; y < h; y += 20) {
            ctx.beginPath();
            ctx.moveTo(p.x, y);
            ctx.lineTo(p.x + pipeWidth, y);
            ctx.stroke();
          }
          // Pipe cap
          ctx.fillStyle = '#CD853F';
          ctx.fillRect(p.x - 5, p.th + gap, pipeWidth + 10, 25);

          const hit = bird.x + bird.r > p.x && bird.x - bird.r < p.x + pipeWidth &&
                     (bird.y - bird.r < p.th || bird.y + bird.r > p.th + gap);
          if (hit) {
            setGameState('gameover');
            if (scoreRef.current > highScore) setHighScore(scoreRef.current);
          }
          if (!p.p && p.x + pipeWidth < bird.x) { p.p = true; setScore(v => v + 1); }
          return p.x > -pipeWidth;
        });

        // Draw bird
        if (birdImgRef.current) {
          ctx.save();
          ctx.translate(bird.x, bird.y);
          ctx.rotate(Math.min(Math.max(bird.vy * 0.05, -0.5), 0.5));
          ctx.drawImage(birdImgRef.current, -bird.r, -bird.r, bird.r * 2, bird.r * 2);
          ctx.restore();
        } else {
          ctx.font = '40px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('🇳🇵', bird.x, bird.y + 12);
        }

        // Score
        ctx.fillStyle = 'white';
        ctx.font = 'bold 56px system-ui';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 10;
        ctx.fillText(scoreRef.current.toString(), w / 2, 80);
        ctx.shadowBlur = 0;
      }
      else {
        // Game over
        pipes.forEach((p) => {
          ctx.fillStyle = '#D2691E';
          ctx.fillRect(p.x, 0, 60, p.th);
          ctx.fillRect(p.x, p.th + 160, 60, h - p.th - 160);
        });
        
        if (birdImgRef.current) {
          ctx.save();
          ctx.translate(bird.x, bird.y);
          ctx.rotate(0.5);
          ctx.drawImage(birdImgRef.current, -bird.r, -bird.r, bird.r * 2, bird.r * 2);
          ctx.restore();
        } else {
          ctx.font = '40px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('🇳🇵', bird.x, bird.y + 12);
        }
        
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, w, h);
        
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 42px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', w / 2, h / 2 - 80);
        
        ctx.fillStyle = 'white';
        ctx.font = '30px system-ui';
        ctx.fillText(`Score: ${scoreRef.current}`, w / 2, h / 2 - 20);
        
        ctx.fillStyle = '#fbbf24';
        ctx.font = '26px system-ui';
        ctx.fillText(`Best: ${Math.max(highScore, scoreRef.current)}`, w / 2, h / 2 + 30);
        
        ctx.fillStyle = '#00dbde';
        ctx.font = 'bold 24px system-ui';
        ctx.fillText('Tap to retry', w / 2, h / 2 + 90);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { 
      cancelAnimationFrame(animId); 
      window.removeEventListener('resize', resize);
    };
  }, [highScore]);

  return (
    <motion.div 
      className="fixed inset-0 w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Back button */}
      <div className="absolute top-4 left-4 z-20">
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-bold hover:bg-white/30 transition border border-white/30"
        >
          ← Back
        </button>
      </div>

      {/* High score */}
      <div className="absolute top-4 right-4 z-20">
        <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-bold border border-white/30">
          🏆 {highScore}
        </span>
      </div>

      {/* Fullscreen canvas */}
      <canvas 
        ref={canvasRef} 
        className="block touch-none cursor-pointer w-full h-full" 
      />
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
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <span className="text-white text-2xl">Loading... ✨</span>
      </div>
    }>
      <AppContent />
    </Suspense>
  );
}
