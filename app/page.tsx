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

// Generate random emoji positions
const generateEmojis = () => {
  const emojiList = ['✨', '🎉', '💖', '⭐', '🎈', '🎊', '🎂', '🎁', '🎵', '🌸', '💫', '🎆', '🔥', '💝', '🎇'];
  return [...Array(30)].map((_, i) => ({
    id: i,
    emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 15 + Math.random() * 35,
    blur: Math.random() * 2,
    duration: 4 + Math.random() * 4,
    delay: Math.random() * 3,
    rotate: Math.random() * 360
  }));
};

// Firework component
const Firework = ({ x, y, onDone }: { x: number; y: number; onDone: () => void }) => {
  const colors = ['#ff007a', '#7000ff', '#00f2ff', '#ffd700', '#ff6b6b'];
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      onAnimationComplete={onDone}
    >
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors[i % colors.length],
            left: 0,
            top: 0
          }}
          initial={{ x: 0, y: 0, scale: 1 }}
          animate={{
            x: Math.cos((i * 30 * Math.PI) / 180) * 80,
            y: Math.sin((i * 30 * Math.PI) / 180) * 80,
            scale: 0
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  );
};

// Thank You Screen
const ThankYouScreen = ({ name, onPlay }: { name: string; onPlay: () => void }) => {
  const [emojis] = useState(generateEmojis);
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number }[]>([]);
  const fwIdRef = useRef(0);

  // Auto fireworks every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const id = fwIdRef.current++;
      setFireworks(prev => [...prev, { 
        id, 
        x: 20 + Math.random() * 60, 
        y: 10 + Math.random() * 50 
      }]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const removeFirework = (id: number) => {
    setFireworks(prev => prev.filter(fw => fw.id !== id));
  };

  return (
    <motion.div 
      className="fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center"
      style={{ 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Animated Mesh Background */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(112, 0, 255, 0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 0, 122, 0.4) 0%, transparent 40%)',
          filter: 'blur(80px)'
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Fireworks */}
      {fireworks.map(fw => (
        <Firework 
          key={fw.id} 
          x={fw.x} 
          y={fw.y} 
          onDone={() => removeFirework(fw.id)} 
        />
      ))}

      {/* Floating Emojis - Absolute positioned */}
      {emojis.map((e) => (
        <motion.div
          key={e.id}
          className="absolute pointer-events-none z-0"
          style={{ 
            left: `${e.left}%`, 
            top: `${e.top}%`,
            fontSize: `${e.size}px`,
            filter: `blur(${e.blur}px)`,
            textShadow: '0 0 10px rgba(255,255,255,0.3)'
          }}
          animate={{ 
            y: [0, -60, 0], 
            rotate: [0, e.rotate, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: e.duration, 
            repeat: Infinity, 
            ease: 'easeInOut',
            delay: e.delay
          }}
        >
          {e.emoji}
        </motion.div>
      ))}

      {/* Glass Card - True Center */}
      <motion.div
        className="relative z-10 w-11/12 max-w-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '32px',
          padding: '28px 20px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Title */}
        <motion.h1 
          className="text-4xl sm:text-5xl font-black mb-2 text-center"
          style={{
            background: 'linear-gradient(to bottom, #fff 0%, #ccc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-1px'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Thank You
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-base text-center mb-3"
          style={{ color: 'rgba(255,255,255,0.8)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          For all the birthday wishes 🎂
        </motion.p>

        {/* Name Badge */}
        {name && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.25, type: 'spring' }}
            className="mb-4 text-center"
          >
            <span 
              className="inline-block text-xl font-bold px-5 py-2 rounded-full"
              style={{
                background: 'linear-gradient(45deg, #ff007a, #7000ff)',
                color: 'white'
              }}
            >
              {name}!
            </span>
          </motion.div>
        )}

        {/* Quote */}
        <motion.p 
          className="text-sm italic mb-6 text-center"
          style={{ color: '#00f2ff' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          "Grateful for another year and amazing people like you."
        </motion.p>

        {/* BIG Play Button */}
        <motion.button
          onClick={onPlay}
          className="w-full relative cursor-pointer"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="w-full py-5 rounded-full font-black text-lg uppercase tracking-widest text-white flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(45deg, #ff007a, #7000ff)',
              boxShadow: '0 10px 40px rgba(255, 0, 122, 0.5)'
            }}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(255, 0, 122, 0.7)',
                '0 0 0 20px rgba(255, 0, 122, 0)',
                '0 0 0 0 rgba(255, 0, 122, 0)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut'
            }}
          >
            <span className="text-2xl">🎮</span>
            <span>Play to Win!</span>
            <span className="text-2xl">🏆</span>
          </motion.div>
        </motion.button>

        {/* Signature */}
        <motion.div
          className="mt-5 text-lg text-center"
          style={{
            fontFamily: 'cursive, Georgia, serif',
            color: '#fff'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          — {name || 'Bijaya'}
        </motion.div>

        {/* Instructions */}
        <motion.div 
          className="mt-2 text-xs text-center"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          👆 Tap 🌲 Dodge ⭐ Score
        </motion.div>
      </motion.div>
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
  const [birdLoaded, setBirdLoaded] = useState(false);

  const gameStateRef = useRef(gameState);
  const scoreRef = useRef(score);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { scoreRef.current = score; }, [score]);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bijaya-highscore');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Save high score to localStorage when it updates
  useEffect(() => {
    localStorage.setItem('bijaya-highscore', highScore.toString());
  }, [highScore]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      birdImgRef.current = img;
      setBirdLoaded(true);
    };
    img.onerror = () => {
      setBirdLoaded(true);
    };
    img.src = '/bird.png';
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animId: number;
    let frame = 0;
    let birdY = canvas.height / 2;
    let birdVy = 0;
    const birdX = window.innerWidth * 0.2;
    const birdR = 28;
    let pipes: any[] = [];
    let mountainsOffset = 0;

    const resetGame = () => { 
      birdY = canvas.height / 2; 
      birdVy = 0; 
      pipes = []; 
      frame = 0; 
      setScore(0); 
    };
    
    const jump = () => {
      setGameState(prev => {
        if (prev === 'waiting') { 
          birdVy = -7; 
          return 'playing';
        }
        else if (prev === 'playing') {
          birdVy = -7;
          return prev;
        }
        else if (prev === 'gameover') { 
          resetGame();
          return 'waiting';
        }
        return prev;
      });
    };

    canvas.addEventListener('click', jump);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); jump(); }, { passive: false });

    const drawMountains = (offset: number) => {
      const w = canvas.width;
      const h = canvas.height;
      
      ctx.fillStyle = '#8B7355';
      ctx.beginPath();
      for (let i = 0; i <= w; i += 50) {
        const peak = Math.sin((i + offset * 0.3) * 0.01) * 80 + 150;
        ctx.lineTo(i, h - peak);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();

      ctx.fillStyle = '#A0522D';
      ctx.beginPath();
      for (let i = 0; i <= w; i += 40) {
        const peak = Math.sin((i + offset * 0.5) * 0.015) * 60 + 100;
        ctx.lineTo(i, h - peak);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();

      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      for (let i = 0; i <= w; i += 30) {
        const peak = Math.sin((i + offset * 0.8) * 0.02) * 40 + 60;
        ctx.lineTo(i, h - peak);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();

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

    const drawBird = (x: number, y: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      if (birdImgRef.current && birdLoaded) {
        ctx.drawImage(birdImgRef.current, -birdR, -birdR, birdR * 2, birdR * 2);
      } else {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(0, 0, birdR - 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFA500';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(6, -4, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FF8C00';
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(18, 4);
        ctx.lineTo(10, 8);
        ctx.fill();
      }
      
      ctx.restore();
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#1e3c72');
      grad.addColorStop(0.5, '#87CEEB');
      grad.addColorStop(1, '#E0F6FF');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

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

      drawPrayerFlags(w * 0.7, h * 0.6);
      drawPrayerFlags(w * 0.3, h * 0.55);

      if (s === 'waiting') {
        drawBird(birdX, birdY, 0);

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
        birdVy += 0.4;
        birdY += birdVy;

        if (birdY + birdR > h - 20 || birdY - birdR < 0) {
          setGameState('gameover');
          if (scoreRef.current > highScore) setHighScore(scoreRef.current);
        }

        frame++;
        const pipeGap = 160;
        if (frame % 100 === 0) {
          const min = 100;
          const max = h - pipeGap - min - 100;
          pipes.push({ x: w, th: Math.floor(Math.random() * (max - min) + min), p: false, gap: pipeGap });
        }

        pipes = pipes.filter((p) => {
          p.x -= 3;
          
          const pipeWidth = 60;
          const gap = p.gap || 160;
          
          ctx.fillStyle = '#D2691E';
          ctx.fillRect(p.x, 0, pipeWidth, p.th);
          ctx.strokeStyle = '#8B4513';
          ctx.lineWidth = 2;
          for (let y = 10; y < p.th; y += 20) {
            ctx.beginPath();
            ctx.moveTo(p.x, y);
            ctx.lineTo(p.x + pipeWidth, y);
            ctx.stroke();
          }
          ctx.fillStyle = '#CD853F';
          ctx.fillRect(p.x - 5, p.th - 25, pipeWidth + 10, 25);
          
          ctx.fillStyle = '#D2691E';
          ctx.fillRect(p.x, p.th + gap, pipeWidth, h - p.th - gap);
          for (let y = p.th + gap + 10; y < h; y += 20) {
            ctx.beginPath();
            ctx.moveTo(p.x, y);
            ctx.lineTo(p.x + pipeWidth, y);
            ctx.stroke();
          }
          ctx.fillStyle = '#CD853F';
          ctx.fillRect(p.x - 5, p.th + gap, pipeWidth + 10, 25);

          const hit = birdX + birdR > p.x && birdX - birdR < p.x + pipeWidth &&
                     (birdY - birdR < p.th || birdY + birdR > p.th + (p.gap || 160));
          if (hit) {
            setGameState('gameover');
            if (scoreRef.current > highScore) setHighScore(scoreRef.current);
          }
          if (!p.p && p.x + pipeWidth < birdX) { p.p = true; setScore(v => v + 1); }
          return p.x > -pipeWidth;
        });

        drawBird(birdX, birdY, Math.min(Math.max(birdVy * 0.05, -0.5), 0.5));

        ctx.fillStyle = 'white';
        ctx.font = 'bold 56px system-ui';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 10;
        ctx.fillText(scoreRef.current.toString(), w / 2, 80);
        ctx.shadowBlur = 0;
      }
      else {
        pipes.forEach((p) => {
          ctx.fillStyle = '#D2691E';
          ctx.fillRect(p.x, 0, 60, p.th);
          ctx.fillRect(p.x, p.th + 160, 60, h - p.th - 160);
        });
        
        drawBird(birdX, birdY, 0.5);
        
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, w, h);
        
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 42px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', w / 2, h / 2 - 140);
        
        ctx.fillStyle = 'white';
        ctx.font = '30px system-ui';
        ctx.fillText(`Score: ${scoreRef.current}`, w / 2, h / 2 - 80);
        
        ctx.fillStyle = '#fbbf24';
        ctx.font = '26px system-ui';
        ctx.fillText(`Your Best: ${Math.max(highScore, scoreRef.current)}`, w / 2, h / 2 - 40);
        
        // Bijaya's score comparison
        const bijayaScore = 20;
        const playerBest = Math.max(highScore, scoreRef.current);
        ctx.fillStyle = '#00f2ff';
        ctx.font = '22px system-ui';
        ctx.fillText(`Bijaya's Best: ${bijayaScore}`, w / 2, h / 2);
        
        if (playerBest > bijayaScore) {
          ctx.fillStyle = '#22c55e';
          ctx.font = 'bold 24px system-ui';
          ctx.fillText('🏆 You beat the Birthday Boy!', w / 2, h / 2 + 40);
        } else if (playerBest === bijayaScore) {
          ctx.fillStyle = '#fbbf24';
          ctx.font = 'bold 24px system-ui';
          ctx.fillText('🤝 You tied with Bijaya!', w / 2, h / 2 + 40);
        } else {
          ctx.fillStyle = '#ff007a';
          ctx.font = 'bold 24px system-ui';
          ctx.fillText('💪 Can you beat the creator?', w / 2, h / 2 + 40);
        }
        
        ctx.fillStyle = '#00dbde';
        ctx.font = 'bold 20px system-ui';
        ctx.fillText('👆 Tap to Retry', w / 2, h / 2 + 90);
        
        ctx.fillStyle = '#a855f7';
        ctx.font = '18px system-ui';
        ctx.fillText('← Back to Thank You', w / 2, h / 2 + 130);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { 
      cancelAnimationFrame(animId); 
      window.removeEventListener('resize', resize);
    };
  }, [highScore, birdLoaded]);

  useEffect(() => {
    return () => {
      setGameState('waiting');
      setScore(0);
    };
  }, []);

  const handleBack = () => {
    setGameState('waiting');
    setScore(0);
    onBack();
  };

  return (
    <motion.div 
      className="fixed inset-0 w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute top-4 left-4 z-20">
        <button 
          onClick={handleBack}
          className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-bold hover:bg-white/30 transition border border-white/30"
        >
          ← Back
        </button>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-bold border border-white/30">
          🏆 {highScore}
        </span>
      </div>

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
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
        <span className="text-white text-2xl">Loading... ✨</span>
      </div>
    }>
      <AppContent />
    </Suspense>
  );
}
