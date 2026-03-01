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

          {/* Title - Centered with blur effect */}
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

          {/* Quote Card - Centered with blur background */}
          <motion.div
            className="relative rounded-2xl p-5 sm:p-6 mb-6 border border-purple-100 text-center overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Blurred background */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100"
              style={{ filter: 'blur(8px)' }}
            />
            <div className="relative z-10">
              <div className="text-3xl mb-2">💬</div>
              <p className="text-gray-700 text-base sm:text-lg italic leading-relaxed">
                "Grateful for another year and amazing people like you in my life."
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-300"></div>
                <span className="text-purple-500 font-medium">— {name || 'Bijaya'}</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-300"></div>
              </div>
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
  const birdImgRef = useRef<HTMLImageElement | null>(null);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameover'>('waiting');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const gameStateRef = useRef(gameState);
  const scoreRef = useRef(score);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { scoreRef.current = score; }, [score]);

  // Load bird image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      birdImgRef.current = img;
      setImagesLoaded(true);
    };
    img.onerror = () => setImagesLoaded(true);
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
    const bird = { x: 80, y: canvas.height / 2, r: 28, vy: 0, g: 0.4, j: -7.5, angle: 0 };
    let pipes: any[] = [];
    let mountainsOffset = 0;

    const reset = () => { 
      bird.y = canvas.height / 2; 
      bird.vy = 0; 
      bird.angle = 0;
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
    window.addEventListener('keydown', (e) => { if (e.code === 'Space') jump(); });

    // Draw Nepali mountains (Himalaya style)
    const drawMountains = (ctx: CanvasRenderingContext2D, w: number, h: number, offset: number) => {
      // Back mountains (distant, lighter)
      ctx.fillStyle = '#8B9DC3';
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let i = 0; i <= w + 100; i += 50) {
        const peakX = i - (offset * 0.3) % 100;
        const peakY = h - 180 - Math.sin(i * 0.01) * 100;
        ctx.lineTo(peakX, peakY);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Front mountains (closer, darker)
      ctx.fillStyle = '#5B6B8C';
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let i = 0; i <= w + 100; i += 80) {
        const peakX = i - (offset * 0.5) % 160;
        const peakY = h - 120 - Math.sin(i * 0.015 + 1) * 80;
        ctx.lineTo(peakX, peakY);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Snow caps
      ctx.fillStyle = '#E8F4F8';
      ctx.beginPath();
      for (let i = 0; i <= w + 100; i += 80) {
        const peakX = i - (offset * 0.5) % 160;
        const peakY = h - 120 - Math.sin(i * 0.015 + 1) * 80;
        ctx.moveTo(peakX - 15, peakY + 25);
        ctx.lineTo(peakX, peakY);
        ctx.lineTo(peakX + 15, peakY + 25);
      }
      ctx.fill();
    };

    // Draw prayer flags (Nepali cultural element)
    const drawPrayerFlags = (ctx: CanvasRenderingContext2D, x: number, y: number, frame: number) => {
      const colors = ['#DC2626', '#2563EB', '#F59E0B', '#10B981', '#F3F4F6'];
      const sway = Math.sin(frame * 0.05) * 5;
      
      // String
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 60, y - 30 + sway);
      ctx.stroke();

      // Flags
      colors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(x + 10 + i * 10, y - 25 + sway + i * 2, 8, 12);
      });
    };

    // Draw traditional Nepali temple/stupa silhouette
    const drawTemple = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
      ctx.fillStyle = '#D97706';
      // Base
      ctx.fillRect(x, y - 20 * scale, 30 * scale, 20 * scale);
      // Dome
      ctx.beginPath();
      ctx.arc(x + 15 * scale, y - 20 * scale, 15 * scale, Math.PI, 0);
      ctx.fill();
      // Spire
      ctx.fillRect(x + 13 * scale, y - 45 * scale, 4 * scale, 25 * scale);
      // Top
      ctx.beginPath();
      ctx.arc(x + 15 * scale, y - 45 * scale, 3 * scale, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Sky gradient (Nepali sky)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#1E3A5F');
      skyGrad.addColorStop(0.5, '#3B5998');
      skyGrad.addColorStop(1, '#87CEEB');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Sun
      ctx.fillStyle = 'rgba(255, 223, 128, 0.8)';
      ctx.beginPath();
      ctx.arc(w - 100, 100, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 223, 128, 0.3)';
      ctx.beginPath();
      ctx.arc(w - 100, 100, 75, 0, Math.PI * 2);
      ctx.fill();

      // Mountains
      drawMountains(ctx, w, h, mountainsOffset);

      // Ground (green hills)
      ctx.fillStyle = '#4ADE80';
      ctx.beginPath();
      ctx.moveTo(0, h - 40);
      for (let i = 0; i <= w; i += 30) {
        ctx.lineTo(i, h - 40 - Math.sin(i * 0.02 + frame * 0.01) * 15);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Prayer flags
      drawPrayerFlags(ctx, w - 200, h - 200, frame);
      drawPrayerFlags(ctx, 150, h - 250, frame + 50);

      // Temple silhouette
      drawTemple(ctx, w - 100, h - 40, 1.5);
      drawTemple(ctx, 50, h - 40, 1);

      const s = gameStateRef.current;

      if (s === 'waiting') {
        // Draw bird
        if (birdImgRef.current) {
          ctx.save();
          ctx.translate(bird.x, bird.y);
          ctx.rotate(Math.sin(frame * 0.05) * 0.1);
          ctx.drawImage(birdImgRef.current, -bird.r, -bird.r, bird.r * 2, bird.r * 2);
          ctx.restore();
        } else {
          ctx.font = '40px Arial';
          ctx.fillText('🐦', bird.x - 20, bird.y + 10);
        }

        // Semi-transparent overlay
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, w, h);
        
        // Blur effect for text
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 20;
        ctx.fillStyle = 'white';
        ctx.font = 'bold 36px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('👆 TAP TO START', w / 2, h / 2);
        ctx.restore();
      }
      else if (s === 'playing') {
        bird.vy += bird.g;
        bird.y += bird.vy;
        bird.angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (bird.vy * 0.1)));

        if (bird.y + bird.r > h - 40 || bird.y - bird.r < 0) {
          setGameState('gameover');
          if (scoreRef.current > highScore) setHighScore(scoreRef.current);
        }

        frame++;
        mountainsOffset += 1;
        
        if (frame % 100 === 0) {
          const min = 100, max = h - 180 - min - 60;
          pipes.push({ x: w, th: Math.floor(Math.random() * (max - min) + min), p: false });
        }

        pipes = pipes.filter((p) => {
          p.x -= 3;
          
          // Draw traditional Nepali style pipes (stupa-shaped)
          // Top pipe
          const pipeGrad1 = ctx.createLinearGradient(p.x, 0, p.x + 60, 0);
          pipeGrad1.addColorStop(0, '#DC2626');
          pipeGrad1.addColorStop(0.5, '#EF4444');
          pipeGrad1.addColorStop(1, '#B91C1C');
          ctx.fillStyle = pipeGrad1;
          ctx.fillRect(p.x, 0, 60, p.th);
          
          // Pipe cap (rounded top)
          ctx.fillStyle = '#991B1B';
          ctx.beginPath();
          ctx.ellipse(p.x + 30, p.th, 32, 10, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Bottom pipe
          const pipeGrad2 = ctx.createLinearGradient(p.x, p.th + 160, p.x + 60, p.th + 160);
          pipeGrad2.addColorStop(0, '#DC2626');
          pipeGrad2.addColorStop(0.5, '#EF4444');
          pipeGrad2.addColorStop(1, '#B91C1C');
          ctx.fillStyle = pipeGrad2;
          ctx.fillRect(p.x, p.th + 160, 60, h - p.th - 160);
          
          // Pipe cap (rounded bottom)
          ctx.fillStyle = '#991B1B';
          ctx.beginPath();
          ctx.ellipse(p.x + 30, p.th + 160, 32, 10, 0, 0, Math.PI * 2);
          ctx.fill();

          // Golden decorative bands
          ctx.fillStyle = '#FBBF24';
          ctx.fillRect(p.x + 5, p.th - 15, 50, 5);
          ctx.fillRect(p.x + 5, p.th + 160 + 10, 50, 5);

          const hit = bird.x + bird.r > p.x && bird.x - bird.r < p.x + 60 &&
                     (bird.y - bird.r < p.th || bird.y + bird.r > p.th + 160);
          if (hit) {
            setGameState('gameover');
            if (scoreRef.current > highScore) setHighScore(scoreRef.current);
          }
          if (!p.p && p.x + 60 < bird.x) { p.p = true; setScore(v => v + 1); }
          return p.x > -70;
        });

        // Draw bird with rotation
        if (birdImgRef.current) {
          ctx.save();
          ctx.translate(bird.x, bird.y);
          ctx.rotate(bird.angle);
          ctx.drawImage(birdImgRef.current, -bird.r, -bird.r, bird.r * 2, bird.r * 2);
          ctx.restore();
        } else {
          ctx.font = '40px Arial';
          ctx.fillText('🐦', bird.x - 20, bird.y + 10);
        }

        // Score with glow
        ctx.save();
        ctx.shadowColor = 'rgba(255,255,255,0.8)';
        ctx.shadowBlur = 15;
        ctx.fillStyle = 'white';
        ctx.font = 'bold 56px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(scoreRef.current.toString(), w / 2, 80);
        ctx.restore();
      }
      else {
        // Game over - draw final state
        pipes.forEach((p) => {
          const pipeGrad1 = ctx.createLinearGradient(p.x, 0, p.x + 60, 0);
          pipeGrad1.addColorStop(0, '#DC2626');
          pipeGrad1.addColorStop(0.5, '#EF4444');
          pipeGrad1.addColorStop(1, '#B91C1C');
          ctx.fillStyle = pipeGrad1;
          ctx.fillRect(p.x, 0, 60, p.th);
          ctx.fillRect(p.x, p.th + 160, 60, h - p.th - 160);
        });
        
        if (birdImgRef.current) {
          ctx.save();
          ctx.translate(bird.x, bird.y);
          ctx.rotate(Math.PI / 2);
          ctx.drawImage(birdImgRef.current, -bird.r, -bird.r, bird.r * 2, bird.r * 2);
          ctx.restore();
        } else {
          ctx.font = '40px Arial';
          ctx.fillText('🐦', bird.x - 20, bird.y + 10);
        }
        
        // Dark overlay
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, w, h);
        
        // Game Over text with blur/glow
        ctx.save();
        ctx.shadowColor = 'rgba(239,68,68,0.8)';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 48px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', w / 2, h / 2 - 80);
        ctx.restore();
        
        ctx.fillStyle = 'white';
        ctx.font = '32px system-ui';
        ctx.fillText(`Score: ${scoreRef.current}`, w / 2, h / 2);
        
        ctx.fillStyle = '#fbbf24';
        ctx.font = '28px system-ui';
        ctx.fillText(`Best: ${Math.max(highScore, scoreRef.current)}`, w / 2, h / 2 + 50);
        
        ctx.save();
        ctx.shadowColor = 'rgba(168,85,247,0.8)';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 24px system-ui';
        ctx.fillText('Tap to retry', w / 2, h / 2 + 110);
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { 
      cancelAnimationFrame(animId); 
      window.removeEventListener('resize', resize);
    };
  }, [highScore, imagesLoaded]);

  return (
    <div className="fixed inset-0 bg-black">
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold hover:bg-white/30 transition"
        >
          ← Back
        </button>
        <span className="text-white font-bold text-lg bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">🏆 {highScore}</span>
      </div>
      
      <canvas 
        ref={canvasRef} 
        className="block touch-none cursor-pointer w-full h-full" 
      />
    </div>
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