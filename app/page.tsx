'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Floating particles that move all over the screen
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; emoji: string; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const emojis = ['🎈', '🎉', '✨', '🎂', '🎁', '💝', '🌟', '🎊', '🕯️', '🎀'];
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 30,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
    }));
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
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
            rotate: [0, 360, -360, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.8, 0.5, 0.3],
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
const ThankYouMessage = ({ onPlayGame }: { onPlayGame: () => void }) => {
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
            Thank You!
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
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-10 border border-white/20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white/80 italic text-lg">
            "Grateful for another year of life and for amazing people like you in it."
          </p>
          <p className="text-white/50 mt-4 font-medium">— Bijaya</p>
        </motion.div>

        <motion.button
          onClick={onPlayGame}
          className="w-full py-5 rounded-2xl font-bold text-xl text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            <span>🎮</span>
            Play Birthday Bird
            <span>🐦</span>
          </span>
        </motion.button>

        <motion.p 
          className="text-white/40 text-sm mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Tap to flap • Avoid pipes
        </motion.p>
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
export default function BirthdayThanks() {
  const [showGame, setShowGame] = useState(false);

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
          <ThankYouMessage key="thanks" onPlayGame={() => setShowGame(true)} />
        ) : (
          <FlappyGame key="game" onBack={() => setShowGame(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}