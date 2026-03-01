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

// Thank You Screen - Dark Mesh Gradient + Glassmorphism
const ThankYouScreen = ({ name, onPlay }: { name: string; onPlay: () => void }) => {
  return (
    <motion.div 
      className="min-h-screen w-full flex items-center justify-center p-5 relative overflow-hidden"
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

      {/* Floating Emojis with Depth */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              fontSize: `${10 + Math.random() * 25}px`,
              opacity: 0.3 + Math.random() * 0.4,
              filter: `blur(${Math.random() * 3}px)`
            }}
            animate={{ 
              y: [0, -(50 + Math.random() * 100), 0], 
              rotate: [0, Math.random() * 360, 0]
            }}
            transition={{ 
              duration: 4 + Math.random() * 4, 
              repeat: Infinity, 
              ease: 'easeInOut',
              delay: Math.random() * 3
            }}
          >
            {['✨', '🎉', '💖', '⭐', '🎈', '🎊', '🎂', '🎁', '🎵', '🌸'][i % 10]}
          </motion.div>
        ))}
      </div>

      {/* Glass Card */}
      <motion.div
        className="relative z-10 w-full max-w-sm text-center"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '40px',
          padding: '40px 24px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
      >
        {/* Title */}
        <motion.h1 
          className="text-5xl font-extrabold mb-2"
          style={{
            background: 'linear-gradient(to bottom, #fff, #bbb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-1px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Thank You
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-lg mb-6"
          style={{ opacity: 0.8 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
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
            className="mb-6"
          >
            <span 
              className="text-2xl font-bold px-6 py-2 rounded-full"
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
          className="text-lg italic mb-10"
          style={{ color: '#00f2ff' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          "Grateful for another year and<br />amazing people like you in my life."
        </motion.p>

        {/* Juicy Play Button */}
        <motion.button
          onClick={onPlay}
          className="relative cursor-pointer"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="px-10 py-5 rounded-full font-extrabold text-lg uppercase tracking-widest text-white flex items-center gap-3"
            style={{
              background: 'linear-gradient(45deg, #ff007a, #7000ff)',
              boxShadow: '0 10px 30px rgba(255, 0, 122, 0.4)'
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
            <span>🎮</span>
            <span>Play to Win!</span>
            <span>🏆</span>
          </motion.div>
        </motion.button>

        {/* Signature */}
        <motion.div
          className="mt-8 text-2xl"
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
          className="mt-4 text-sm"
          style={{ opacity: 0.6 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.6 }}
        >
          👆 Tap 🌲 Dodge ⭐ Score
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
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

    // Fullscreen dimensions
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
    const birdR = 24;
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
      const s = gameStateRef.current;
      if (s === 'waiting') { 
        setGameState('playing'); 
        birdVy = -7; 
      }
      else if (s === 'playing') {
        birdVy = -7;
      }
      else if (s === 'gameover') { 
        resetGame();
        setGameState('waiting');
      }
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

    // Draw bird (yellow chick style)
    const drawBird = (x: number, y: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Yellow body
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(0, 0, birdR - 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFA500';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Eye
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(6, -4, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Beak
      ctx.fillStyle = '#FF8C00';
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(18, 4);
      ctx.lineTo(10, 8);
      ctx.fill();
      
      // Wing
      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.ellipse(-4, 4, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
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

        // Ground/ceiling collision
        if (birdY + birdR > h - 20 || birdY - birdR < 0) {
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
          
          // Bamboo-style pipes
          const pipeWidth = 60;
          
          // Top pipe
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
          
          // Bottom pipe
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
                     (birdY - birdR < p.th || birdY + birdR > p.th + gap);
          if (hit) {
            setGameState('gameover');
            if (scoreRef.current > highScore) setHighScore(scoreRef.current);
          }
          if (!p.p && p.x + pipeWidth < birdX) { p.p = true; setScore(v => v + 1); }
          return p.x > -pipeWidth;
        });

        drawBird(birdX, birdY, Math.min(Math.max(birdVy * 0.05, -0.5), 0.5));

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
        // Game over state
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
      <div className="absolute top-4 left-4 z-20">
        <button 
          onClick={onBack}
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <span className="text-white text-2xl">Loading... ✨</span>
      </div>
    }>
      <AppContent />
    </Suspense>
  );
}
