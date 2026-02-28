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
      if (nameParam) {
        setName(decodeURIComponent(nameParam));
      }
    }
  }, []);
  
  return name;
};

// Fireworks particles from edges
const FireworksParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; emoji: string; startX: number; startY: number; endX: number; endY: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const emojis = ['🎈', '🎉', '✨', '🎂', '🎁', '💝', '🌟', '🎊', '🕯️', '🎀', '🎵', '💖', '🎆', '🎇'];
    const newParticles = Array.from({ length: 40 }, (_, i) => {
      const side = Math.floor(Math.random() * 4);
      let startX, startY, endX, endY;
      
      switch(side) {
        case 0: startX = Math.random() * 100; startY = -15; endX = Math.random() * 100; endY = 115; break;
        case 1: startX = 115; startY = Math.random() * 100; endX = -15; endY = Math.random() * 100; break;
        case 2: startX = Math.random() * 100; startY = 115; endX = Math.random() * 100; endY = -15; break;
        default: startX = -15; startY = Math.random() * 100; endX = 115; endY = Math.random() * 100;
      }
      
      return {
        id: i,
        emoji: emojis[i % emojis.length],
        startX, startY, endX, endY,
        size: 28 + Math.random() * 36,
        duration: 10 + Math.random() * 15,
        delay: Math.random() * 8,
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ fontSize: p.size, left: `${p.startX}%`, top: `${p.startY}%` }}
          animate={{
            x: [`0vw`, `${p.endX - p.startX}vw`],
            y: [`0vh`, `${p.endY - p.startY}vh`],
            rotate: [0, 360, -360, 720],
            scale: [0.3, 1.3, 1, 0.9, 1.2],
            opacity: [0, 1, 1, 0.8, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
};

// Thank You Screen - Full Screen Vibrant Design
const ThankYouScreen = ({ name, onPlay }: { name: string; onPlay: () => void }) => {
  const quotes = [
    "Grateful for another year of life and amazing people like you!",
    "Your wishes made my birthday truly special!",
    "Thank you for being part of my journey!",
    "Another year older, but feeling loved and blessed!",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FireworksParticles />

      <div className="relative z-10 w-full max-w-lg text-center">
        {/* Big Heart Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1.2, bounce: 0.5 }}
          className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6, #6366f1)',
            boxShadow: '0 0 60px rgba(236, 72, 153, 0.5), 0 0 100px rgba(139, 92, 246, 0.3)',
          }}
        >
          <motion.span 
            className="text-6xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💝
          </motion.span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          className="text-6xl md:text-7xl font-black mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Thank You
          </span>
          <br />
          {name && (
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              {name}!
            </span>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-xl md:text-2xl text-white/90 mb-3 font-light"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          For the birthday wishes! 🎂
        </motion.p>

        {/* Quote Card */}
        <motion.div
          className="my-8 p-6 rounded-3xl relative"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
          initial={{ y: 40, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          <div className="absolute -top-3 left-6 text-4xl">💬</div>
          <p className="text-white/90 text-lg italic leading-relaxed pt-2">"{randomQuote}"</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400/50"></div>
            <span className="text-pink-300 font-medium">— {name || 'Bijaya'}</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400/50"></div>
          </div>
        </motion.div>

        {/* HUGE Play Button */}
        <motion.button
          onClick={onPlay}
          className="w-full py-7 px-8 rounded-3xl font-black text-2xl md:text-3xl text-white relative overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 20%, #ec4899 50%, #8b5cf6 80%, #6366f1 100%)',
            boxShadow: '0 0 0 4px rgba(255,255,255,0.1), 0 20px 60px rgba(236,72,153,0.5), 0 0 100px rgba(139,92,246,0.3)',
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 0 6px rgba(255,255,255,0.2), 0 30px 80px rgba(236,72,153,0.6), 0 0 120px rgba(139,92,246,0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          {/* Shine sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
          />
          
          {/* Pulse rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-3xl border-2 border-white/30"
              animate={{ scale: [1, 1.15 + i * 0.05], opacity: [0.6 - i * 0.2, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
          
          <span className="relative z-10 flex items-center justify-center gap-4">
            <motion.span animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}>🎮</motion.span>
            <span className="tracking-widest uppercase">Play to Win!</span>
            <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}>🏆</motion.span>
          </span>
        </motion.button>

        {/* Instructions */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { icon: '👆', text: 'Tap to fly' },
            { icon: '🌲', text: 'Dodge pipes' },
            { icon: '⭐', text: 'Score high' },
          ].map((item, i) => (
            <motion.span 
              key={i}
              className="px-4 py-2 rounded-full text-sm flex items-center gap-2"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <span>{item.icon}</span>
              <span className="text-white/80">{item.text}</span>
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Flappy Bird Game with Emoji Bird
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

    const canvasWidth = Math.min(window.innerWidth - 32, 420);
    const canvasHeight = Math.min(window.innerHeight - 200, 550);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let animationId: number;
    let frameCount = 0;
    
    const bird = { x: canvasWidth * 0.25, y: canvasHeight / 2, radius: 18, velocity: 0, gravity: 0.35, jump: -6.5, emoji: '🐦' };
    let pipes: Array<{ x: number; topHeight: number; passed: boolean }> = [];
    const pipeWidth = 55;
    const pipeGap = 140;
    const pipeSpeed = 2.8;

    const resetGame = () => {
      bird.y = canvasHeight / 2;
      bird.velocity = 0;
      pipes = [];
      frameCount = 0;
      setScore(0);
    };

    const jump = () => {
      const state = gameStateRef.current;
      if (state === 'waiting') {
        setGameState('playing');
        bird.velocity = bird.jump;
      } else if (state === 'playing') {
        bird.velocity = bird.jump;
      } else if (state === 'gameover') {
        setGameState('waiting');
        resetGame();
      }
    };

    const handleClick = () => jump();
    const handleTouch = (e: TouchEvent) => { e.preventDefault(); jump(); };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); }
    };

    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleTouch, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      gradient.addColorStop(0, '#1e1b4b');
      gradient.addColorStop(0.5, '#4338ca');
      gradient.addColorStop(1, '#6366f1');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      for (let i = 0; i < 30; i++) {
        const x = ((frameCount * 0.3) + i * 50) % (canvasWidth + 20) - 10;
        const y = (i * 37) % canvasHeight;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let i = 0; i < 4; i++) {
        const x = ((frameCount * 0.4) + i * 120) % (canvasWidth + 150) - 50;
        const y = 40 + i * 50;
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.arc(x + 25, y - 8, 35, 0, Math.PI * 2);
        ctx.arc(x + 50, y, 30, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawBird = () => {
      ctx.save();
      ctx.translate(bird.x, bird.y);
      const rotation = Math.min(Math.max(bird.velocity * 0.04, -0.4), 0.4);
      ctx.rotate(rotation);
      
      // Glow
      ctx.shadowColor = 'rgba(251, 191, 36, 0.6)';
      ctx.shadowBlur = 20;
      
      // Bird emoji
      ctx.font = '32px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(bird.emoji, 0, 2);
      
      ctx.restore();
    };

    const drawPipe = (pipe: typeof pipes[0]) => {
      const gradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + pipeWidth, 0);
      gradient.addColorStop(0, '#16a34a');
      gradient.addColorStop(0.5, '#4ade80');
      gradient.addColorStop(1, '#15803d');

      // Top pipe
      ctx.fillStyle = gradient;
      ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 3;
      ctx.strokeRect(pipe.x, 0, pipeWidth, pipe.topHeight);
      ctx.fillRect(pipe.x - 5, pipe.topHeight - 25, pipeWidth + 10, 25);
      ctx.strokeRect(pipe.x - 5, pipe.topHeight - 25, pipeWidth + 10, 25);

      // Bottom pipe
      const bottomY = pipe.topHeight + pipeGap;
      ctx.fillRect(pipe.x, bottomY, pipeWidth, canvasHeight - bottomY);
      ctx.strokeRect(pipe.x, bottomY, pipeWidth, canvasHeight - bottomY);
      ctx.fillRect(pipe.x - 5, bottomY, pipeWidth + 10, 25);
      ctx.strokeRect(pipe.x - 5, bottomY, pipeWidth + 10, 25);
    };

    const checkCollision = (pipe: typeof pipes[0]) => {
      const inPipeX = bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipeWidth;
      const inPipeY = bird.y - bird.radius < pipe.topHeight || bird.y + bird.radius > pipe.topHeight + pipeGap;
      return inPipeX && inPipeY;
    };

    const gameLoop = () => {
      drawBackground();
      const state = gameStateRef.current;

      if (state === 'waiting') {
        drawBird();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 28px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('👆 TAP TO START', canvasWidth / 2, canvasHeight / 2);
        ctx.font = '18px system-ui';
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('Help the bird fly!', canvasWidth / 2, canvasHeight / 2 + 40);
      }
      else if (state === 'playing') {
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        if (bird.y + bird.radius >= canvasHeight - 10 || bird.y - bird.radius <= 10) {
          setGameState('gameover');
          if (scoreRef.current > highScoreRef.current) setHighScore(scoreRef.current);
        }

        frameCount++;
        if (frameCount % 90 === 0) {
          const minHeight = 70;
          const maxHeight = canvasHeight - pipeGap - minHeight - 50;
          pipes.push({ x: canvasWidth, topHeight: Math.floor(Math.random() * (maxHeight - minHeight) + minHeight), passed: false });
        }

        pipes = pipes.filter((pipe) => {
          pipe.x -= pipeSpeed;
          if (checkCollision(pipe)) {
            setGameState('gameover');
            if (scoreRef.current > highScoreRef.current) setHighScore(scoreRef.current);
          }
          if (!pipe.passed && pipe.x + pipeWidth < bird.x) {
            pipe.passed = true;
            setScore((s) => s + 1);
          }
          return pipe.x > -pipeWidth;
        });

        pipes.forEach(drawPipe);
        drawBird();

        // Score
        ctx.fillStyle = 'white';
        ctx.font = 'bold 52px system-ui';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 10;
        ctx.fillText(scoreRef.current.toString(), canvasWidth / 2, 70);
        ctx.shadowBlur = 0;
      }
      else if (state === 'gameover') {
        pipes.forEach(drawPipe);
        drawBird();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 40px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('💥 Game Over!', canvasWidth / 2, canvasHeight / 2 - 70);
        
        ctx.fillStyle = 'white';
        ctx.font = '28px system-ui';
        ctx.fillText(`Score: ${scoreRef.current}`, canvasWidth / 2, canvasHeight / 2);
        
        const best = Math.max(highScoreRef.current, scoreRef.current);
        ctx.fillStyle = '#fbbf24';
        ctx.font = '22px system-ui';
        ctx.fillText(`🏆 Best: ${best}`, canvasWidth / 2, canvasHeight / 2 + 40);

        ctx.fillStyle = '#a78bfa';
        ctx.font = 'bold 20px system-ui';
        ctx.fillText('👆 Tap to play again', canvasWidth / 2, canvasHeight / 2 + 90);
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={onBack}
            className="px-4 py-2 rounded-full text-white text-sm font-medium"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            ← Back
          </button>
          <div className="text-right">
            <p className="text-white/60 text-sm">🏆 Best: {highScore}</p>
          </div>
        </div>

        <div 
          className="relative rounded-2xl overflow-hidden w-full"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 4px rgba(255,255,255,0.1)' }}
        >
          <canvas
            ref={canvasRef}
            className="block touch-none cursor-pointer w-full"
            style={{ background: '#1e1b4b' }}
          />
        </div>

        <p className="text-center text-white/50 text-sm mt-4">
          👆 Tap to fly • 🌲 Avoid pipes • ⭐ Score points
        </p>
      </div>
    </motion.div>
  );
};

// Main
function BirthdayAppContent() {
  const [showGame, setShowGame] = useState(false);
  const name = useNameFromParams();

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950"></div>
        <div className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.4) 0%, transparent 40%),
              radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 40%),
              radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!showGame ? (
          <ThankYouScreen key="thanks" name={name} onPlay={() => setShowGame(true)} />
        ) : (
          <FlappyGame key="game" onBack={() => setShowGame(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}

export default function BirthdayApp() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
        <div className="text-white/60 text-xl">Loading... ✨</div>
      </div>
    }>
      <BirthdayAppContent />
    </Suspense>
  );
}