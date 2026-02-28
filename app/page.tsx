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

// Floating particles that come from outside like fireworks
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; emoji: string; startX: number; startY: number; endX: number; endY: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const emojis = ['🎈', '🎉', '✨', '🎂', '🎁', '💝', '🌟', '🎊', '🕯️', '🎀', '🎵', '💖'];
    const newParticles = Array.from({ length: 30 }, (_, i) => {
      // Start from outside the screen
      const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let startX, startY, endX, endY;
      
      switch(side) {
        case 0: // top
          startX = Math.random() * 100;
          startY = -20;
          endX = Math.random() * 100;
          endY = 120;
          break;
        case 1: // right
          startX = 120;
          startY = Math.random() * 100;
          endX = -20;
          endY = Math.random() * 100;
          break;
        case 2: // bottom
          startX = Math.random() * 100;
          startY = 120;
          endX = Math.random() * 100;
          endY = -20;
          break;
        default: // left
          startX = -20;
          startY = Math.random() * 100;
          endX = 120;
          endY = Math.random() * 100;
      }
      
      return {
        id: i,
        emoji: emojis[i % emojis.length],
        startX,
        startY,
        endX,
        endY,
        size: 24 + Math.random() * 32,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 5,
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
          style={{
            fontSize: p.size,
            left: `${p.startX}%`,
            top: `${p.startY}%`,
          }}
          animate={{
            x: [`0vw`, `${p.endX - p.startX}vw`],
            y: [`0vh`, `${p.endY - p.startY}vh`],
            rotate: [0, 360, -360, 720],
            scale: [0.5, 1.2, 1, 0.8, 1.1],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
};

// Thank You Message
const ThankYouMessage = ({ name, onPlayGame }: { name: string; onPlayGame: () => void }) => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <FloatingParticles />

      <div className="relative z-10 text-center max-w-md">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1 }}
          className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-purple-500/50"
        >
          <span className="text-5xl">💝</span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-6xl font-black mb-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Thank You{name ? ` ${name}` : ''}!
          </span>
        </motion.h1>

        <motion.p 
          className="text-xl text-white/90 mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          For all the birthday wishes!
        </motion.p>

        <motion.p 
          className="text-white/60 mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Your messages made my day special 💫
        </motion.p>

        <motion.div
          className="relative rounded-2xl p-8 mb-10 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15))',
            border: '2px solid rgba(255, 255, 255, 0.1)',
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Corner decorations */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-purple-400/60 rounded-tl" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-pink-400/60 rounded-tr" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-pink-400/60 rounded-bl" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-purple-400/60 rounded-br" />
          
          {/* Quote icon */}
          <div className="text-3xl mb-3">💬</div>
          
          <p className="text-white/85 italic text-base leading-relaxed">
            "Grateful for another year of life and for amazing people like you in it."
          </p>
          
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent via-purple-400/50 to-purple-400/50" />
            <p className="text-white/50 text-sm font-medium">{name || 'Bijaya'}</p>
            <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent via-pink-400/50 to-pink-400/50" />
          </div>
        </motion.div>

        {/* Big CTA Button */}
        <motion.button
          onClick={onPlayGame}
          className="w-full py-8 rounded-3xl font-black text-3xl text-white relative overflow-hidden group mb-8"
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #ec4899 50%, #8b5cf6 75%, #6366f1 100%)',
            boxShadow: '0 0 60px rgba(236, 72, 153, 0.5), 0 0 100px rgba(139, 92, 246, 0.3), inset 0 0 30px rgba(255,255,255,0.1)',
            border: '2px solid rgba(255,255,255,0.2)',
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 80px rgba(236, 72, 153, 0.6), 0 0 120px rgba(139, 92, 246, 0.4), inset 0 0 40px rgba(255,255,255,0.2)',
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 30, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 opacity-50"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            }}
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          />
          
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{ border: '2px solid rgba(255,255,255,0.3)' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <span className="relative z-10 flex items-center justify-center gap-4">
            <motion.span 
              className="text-4xl"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              🎮
            </motion.span>
            <span className="tracking-wider drop-shadow-lg">PLAY TO WIN!</span>
            <motion.span 
              className="text-4xl"
              animate={{ y: [0, -5, 5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2, delay: 0.25 }}
            >
              🏆
            </motion.span>
          </span>
        </motion.button>

        {/* Fun instruction pills */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm flex items-center gap-2">
            <span>👆</span> Tap to flap
          </span>
          <span className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm flex items-center gap-2">
            <span>🌲</span> Avoid pipes
          </span>
          <span className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm flex items-center gap-2">
            <span>⭐</span> Beat high score
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Flappy Bird Game
const FlappyGame = ({ onBack }: { onBack: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameover'>('waiting');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Game refs (for use in animation loop)
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

    // Mobile-friendly canvas size
    const canvasWidth = Math.min(window.innerWidth - 32, 400);
    const canvasHeight = 500;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Game variables
    let animationId: number;
    let frameCount = 0;
    
    // Bird
    const bird = {
      x: canvasWidth * 0.2,
      y: canvasHeight / 2,
      radius: 12,
      velocity: 0,
      gravity: 0.4,
      jump: -7,
    };

    // Pipes
    let pipes: Array<{ x: number; topHeight: number; passed: boolean }> = [];
    const pipeWidth = 50;
    const pipeGap = 130;
    const pipeSpeed = 2.5;

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

    // Event listeners
    const handleClick = () => jump();
    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      jump();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleTouch, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    // Draw functions
    const drawBackground = () => {
      // Sky
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      gradient.addColorStop(0, '#1e1b4b');
      gradient.addColorStop(0.5, '#312e81');
      gradient.addColorStop(1, '#4338ca');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Moving clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      const cloudOffset = (frameCount * 0.5) % (canvasWidth + 100);
      for (let i = 0; i < 3; i++) {
        const x = ((cloudOffset + i * 150) % (canvasWidth + 100)) - 50;
        const y = 60 + i * 40;
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.arc(x + 20, y - 10, 30, 0, Math.PI * 2);
        ctx.arc(x + 45, y, 25, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawBird = () => {
      ctx.save();
      ctx.translate(bird.x, bird.y);
      
      // Rotation based on velocity
      const rotation = Math.min(Math.max(bird.velocity * 0.05, -0.5), 0.5);
      ctx.rotate(rotation);

      // Body
      ctx.beginPath();
      ctx.arc(0, 0, bird.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Eye
      ctx.beginPath();
      ctx.arc(4, -4, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(5, -4, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#1f2937';
      ctx.fill();

      // Beak
      ctx.beginPath();
      ctx.moveTo(6, 2);
      ctx.lineTo(14, 5);
      ctx.lineTo(6, 8);
      ctx.fillStyle = '#f97316';
      ctx.fill();

      // Wing
      ctx.beginPath();
      ctx.ellipse(-4, 4, 7, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();

      ctx.restore();
    };

    const drawPipe = (pipe: typeof pipes[0]) => {
      const gradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + pipeWidth, 0);
      gradient.addColorStop(0, '#16a34a');
      gradient.addColorStop(0.5, '#22c55e');
      gradient.addColorStop(1, '#15803d');

      // Top pipe
      ctx.fillStyle = gradient;
      ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 2;
      ctx.strokeRect(pipe.x, 0, pipeWidth, pipe.topHeight);

      // Top cap
      ctx.fillRect(pipe.x - 4, pipe.topHeight - 20, pipeWidth + 8, 20);
      ctx.strokeRect(pipe.x - 4, pipe.topHeight - 20, pipeWidth + 8, 20);

      // Bottom pipe
      const bottomY = pipe.topHeight + pipeGap;
      ctx.fillRect(pipe.x, bottomY, pipeWidth, canvasHeight - bottomY);
      ctx.strokeRect(pipe.x, bottomY, pipeWidth, canvasHeight - bottomY);

      // Bottom cap
      ctx.fillRect(pipe.x - 4, bottomY, pipeWidth + 8, 20);
      ctx.strokeRect(pipe.x - 4, bottomY, pipeWidth + 8, 20);
    };

    const checkCollision = (pipe: typeof pipes[0]) => {
      const inPipeX = bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipeWidth;
      const inPipeY = bird.y - bird.radius < pipe.topHeight || bird.y + bird.radius > pipe.topHeight + pipeGap;
      return inPipeX && inPipeY;
    };

    // Game loop
    const gameLoop = () => {
      drawBackground();

      const state = gameStateRef.current;

      if (state === 'waiting') {
        // Draw bird stationary
        drawBird();
        
        // Draw "Tap to Start"
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 28px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('TAP TO START', canvasWidth / 2, canvasHeight / 2);
        ctx.font = '16px system-ui, sans-serif';
        ctx.fillStyle = '#a78bfa';
        ctx.fillText('Tap screen to flap', canvasWidth / 2, canvasHeight / 2 + 35);
      }
      else if (state === 'playing') {
        // Update bird
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        // Floor/ceiling collision
        if (bird.y + bird.radius >= canvasHeight - 5 || bird.y - bird.radius <= 5) {
          setGameState('gameover');
          if (scoreRef.current > highScoreRef.current) {
            setHighScore(scoreRef.current);
          }
        }

        // Spawn pipes
        frameCount++;
        if (frameCount % 100 === 0) {
          const minHeight = 60;
          const maxHeight = canvasHeight - pipeGap - minHeight - 40;
          pipes.push({
            x: canvasWidth,
            topHeight: Math.floor(Math.random() * (maxHeight - minHeight) + minHeight),
            passed: false,
          });
        }

        // Update pipes
        pipes = pipes.filter((pipe) => {
          pipe.x -= pipeSpeed;

          // Collision
          if (checkCollision(pipe)) {
            setGameState('gameover');
            if (scoreRef.current > highScoreRef.current) {
              setHighScore(scoreRef.current);
            }
          }

          // Score
          if (!pipe.passed && pipe.x + pipeWidth < bird.x) {
            pipe.passed = true;
            setScore((s) => s + 1);
          }

          return pipe.x > -pipeWidth;
        });

        // Draw pipes
        pipes.forEach(drawPipe);

        // Draw bird
        drawBird();

        // Draw score
        ctx.fillStyle = 'white';
        ctx.font = 'bold 48px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 10;
        ctx.fillText(scoreRef.current.toString(), canvasWidth / 2, 60);
        ctx.shadowBlur = 0;
      }
      else if (state === 'gameover') {
        // Draw final frame
        pipes.forEach(drawPipe);
        drawBird();

        // Overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Game Over text
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 36px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvasWidth / 2, canvasHeight / 2 - 60);

        // Score
        ctx.fillStyle = 'white';
        ctx.font = '24px system-ui, sans-serif';
        ctx.fillText(`Score: ${scoreRef.current}`, canvasWidth / 2, canvasHeight / 2);
        
        // High score
        const best = Math.max(highScoreRef.current, scoreRef.current);
        ctx.fillStyle = '#fbbf24';
        ctx.font = '20px system-ui, sans-serif';
        ctx.fillText(`Best: ${best}`, canvasWidth / 2, canvasHeight / 2 + 35);

        // Restart instruction
        ctx.fillStyle = '#a78bfa';
        ctx.font = '18px system-ui, sans-serif';
        ctx.fillText('Tap to play again', canvasWidth / 2, canvasHeight / 2 + 80);
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
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onBack}
            className="px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
          >
            ← Back
          </button>
          <div className="text-right">
            <p className="text-white/60 text-xs">Best: {highScore}</p>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20"
        >
          <canvas
            ref={canvasRef}
            className="block touch-none cursor-pointer"
            style={{ background: '#1e1b4b', maxWidth: '100%' }}
          />
        </div>

        <p className="text-center text-white/50 text-sm mt-4">
          Tap screen to flap • Avoid green pipes
        </p>
      </div>
    </motion.div>
  );
};

// Main App
function BirthdayThanksContent() {
  const [showGame, setShowGame] = useState(false);
  const name = useNameFromParams();

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950"></div>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!showGame ? (
          <ThankYouMessage key="thanks" name={name} onPlayGame={() => setShowGame(true)} />
        ) : (
          <FlappyGame key="game" onBack={() => setShowGame(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}

export default function BirthdayThanks() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950">
        <div className="text-white/60">Loading...</div>
      </div>
    }>
      <BirthdayThanksContent />
    </Suspense>
  );
}