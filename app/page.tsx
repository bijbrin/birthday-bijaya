'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Thank You Message Component
const ThankYouMessage = ({ onPlayGame }: { onPlayGame: () => void }) => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['🎈', '🎉', '✨', '🎂', '🎁', '💝', '🌟', '🎊'][i % 8]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl"
        >
          <span className="text-5xl">💝</span>
        </motion.div>

        <motion.h1 
          className="text-4xl font-black mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Thank You!
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg text-white/80 mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          For all the birthday wishes!
        </motion.p>

        <motion.p 
          className="text-white/60 mb-8 text-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Your messages made my day special 💫
        </motion.p>

        <motion.div
          className="glass rounded-2xl p-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white/70 text-sm italic">
            "Grateful for another year of life and for amazing people like you in it."
          </p>
          <p className="text-white/50 text-xs mt-3">— Bijaya</p>
        </motion.div>

        <motion.button
          onClick={onPlayGame}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white relative overflow-hidden group"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>🎮</span>
            Play Birthday Bird
            <span>🐦</span>
          </span>
        </motion.button>

        <motion.p 
          className="text-white/40 text-xs mt-4"
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

  // Game constants
  const GRAVITY = 0.25;
  const JUMP = -6;
  const PIPE_SPEED = 2;
  const PIPE_GAP = 140;
  const PIPE_WIDTH = 50;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for mobile
    canvas.width = Math.min(window.innerWidth - 32, 400);
    canvas.height = 500;

    let animationId: number;
    let bird = { x: 50, y: canvas.height / 2, velocity: 0, radius: 15 };
    let pipes: { x: number; topHeight: number; passed: boolean }[] = [];
    let frameCount = 0;
    let currentScore = 0;

    const resetGame = () => {
      bird = { x: 50, y: canvas.height / 2, velocity: 0, radius: 15 };
      pipes = [];
      frameCount = 0;
      currentScore = 0;
      setScore(0);
    };

    const jump = () => {
      if (gameState === 'waiting') {
        setGameState('playing');
        bird.velocity = JUMP;
      } else if (gameState === 'playing') {
        bird.velocity = JUMP;
      } else if (gameState === 'gameover') {
        setGameState('waiting');
        resetGame();
      }
    };

    const handleInput = () => jump();
    canvas.addEventListener('click', handleInput);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleInput(); });

    const drawBird = () => {
      ctx.save();
      ctx.translate(bird.x, bird.y);
      ctx.rotate(Math.min(Math.max(bird.velocity * 0.05, -0.5), 0.5));
      
      // Bird body
      ctx.beginPath();
      ctx.arc(0, 0, bird.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Eye
      ctx.beginPath();
      ctx.arc(5, -5, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(6, -5, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'black';
      ctx.fill();

      // Beak
      ctx.beginPath();
      ctx.moveTo(8, 2);
      ctx.lineTo(18, 6);
      ctx.lineTo(8, 10);
      ctx.fillStyle = '#f97316';
      ctx.fill();

      // Wing
      ctx.beginPath();
      ctx.ellipse(-5, 5, 8, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();

      ctx.restore();
    };

    const drawPipe = (pipe: typeof pipes[0]) => {
      const gradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + PIPE_WIDTH, 0);
      gradient.addColorStop(0, '#22c55e');
      gradient.addColorStop(0.5, '#4ade80');
      gradient.addColorStop(1, '#16a34a');

      // Top pipe
      ctx.fillStyle = gradient;
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
      ctx.strokeStyle = '#15803d';
      ctx.lineWidth = 2;
      ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);

      // Top pipe cap
      ctx.fillRect(pipe.x - 3, pipe.topHeight - 20, PIPE_WIDTH + 6, 20);
      ctx.strokeRect(pipe.x - 3, pipe.topHeight - 20, PIPE_WIDTH + 6, 20);

      // Bottom pipe
      const bottomY = pipe.topHeight + PIPE_GAP;
      ctx.fillRect(pipe.x, bottomY, PIPE_WIDTH, canvas.height - bottomY);
      ctx.strokeRect(pipe.x, bottomY, PIPE_WIDTH, canvas.height - bottomY);

      // Bottom pipe cap
      ctx.fillRect(pipe.x - 3, bottomY, PIPE_WIDTH + 6, 20);
      ctx.strokeRect(pipe.x - 3, bottomY, PIPE_WIDTH + 6, 20);
    };

    const drawBackground = () => {
      // Sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1e1b4b');
      gradient.addColorStop(1, '#312e81');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let i = 0; i < 5; i++) {
        const x = ((frameCount * 0.5) + i * 100) % (canvas.width + 100) - 50;
        const y = 50 + i * 30;
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.arc(x + 25, y - 10, 35, 0, Math.PI * 2);
        ctx.arc(x + 50, y, 30, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const checkCollision = (pipe: typeof pipes[0]) => {
      const inPipeX = bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + PIPE_WIDTH;
      const inPipeY = bird.y - bird.radius < pipe.topHeight || bird.y + bird.radius > pipe.topHeight + PIPE_GAP;
      return inPipeX && inPipeY;
    };

    const gameLoop = () => {
      drawBackground();

      if (gameState === 'playing' || gameState === 'waiting') {
        // Update bird
        bird.velocity += GRAVITY;
        bird.y += bird.velocity;

        // Floor/ceiling collision
        if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
          setGameState('gameover');
          if (currentScore > highScore) setHighScore(currentScore);
        }

        // Update pipes
        if (gameState === 'playing') {
          frameCount++;

          // Spawn pipes
          if (frameCount % 120 === 0) {
            const minHeight = 50;
            const maxHeight = canvas.height - PIPE_GAP - minHeight;
            pipes.push({
              x: canvas.width,
              topHeight: Math.random() * (maxHeight - minHeight) + minHeight,
              passed: false,
            });
          }

          // Move pipes and check collisions
          pipes = pipes.filter((pipe) => {
            pipe.x -= PIPE_SPEED;

            // Check collision
            if (checkCollision(pipe)) {
              setGameState('gameover');
              if (currentScore > highScore) setHighScore(currentScore);
            }

            // Score point
            if (!pipe.passed && pipe.x + PIPE_WIDTH < bird.x) {
              pipe.passed = true;
              currentScore++;
              setScore(currentScore);
            }

            return pipe.x > -PIPE_WIDTH;
          });
        }

        // Draw pipes
        pipes.forEach(drawPipe);

        // Draw bird
        drawBird();
      }

      // Draw UI
      ctx.fillStyle = 'white';
      ctx.font = 'bold 32px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(score.toString(), canvas.width / 2, 50);

      if (gameState === 'waiting') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Inter, sans-serif';
        ctx.fillText('TAP TO START', canvas.width / 2, canvas.height / 2);
      }

      if (gameState === 'gameover') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px Inter, sans-serif';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 40);
        
        ctx.font = '20px Inter, sans-serif';
        ctx.fillText(`Score: ${currentScore}`, canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText(`Best: ${Math.max(highScore, currentScore)}`, canvas.width / 2, canvas.height / 2 + 40);
        
        ctx.font = '16px Inter, sans-serif';
        ctx.fillStyle = '#a78bfa';
        ctx.fillText('Tap to restart', canvas.width / 2, canvas.height / 2 + 80);
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('click', handleInput);
      canvas.removeEventListener('touchstart', handleInput);
    };
  }, [gameState, highScore]);

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onBack}
            className="px-4 py-2 rounded-xl glass text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            ← Back
          </button>
          <div className="text-right">
            <p className="text-white/60 text-xs">Best: {highScore}</p>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <canvas
            ref={canvasRef}
            className="block touch-none cursor-pointer"
            style={{ background: '#1e1b4b' }}
          />
        </div>

        <p className="text-center text-white/40 text-sm mt-4">
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
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950"></div>
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
                              radial-gradient(circle at 40% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)`
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