'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const useNameFromParams = () => {
  const [name, setName] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get('name');
      console.log('URL params:', window.location.search);
      console.log('Name param:', nameParam);
      if (nameParam) {
        setName(decodeURIComponent(nameParam));
      }
    }
  }, []);
  return name;
};

// Firework component
const Firework = ({ x, y, onDone }: { x: number; y: number; onDone: () => void }) => {
  const colors = ['#ff007a', '#7000ff', '#00f2ff', '#ffd700', '#ff6b6b', '#22c55e'];
  return (
    <motion.div
      style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, zIndex: 5, pointerEvents: 'none' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      onAnimationComplete={onDone}
    >
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: colors[i % colors.length],
            left: 0,
            top: 0
          }}
          initial={{ x: 0, y: 0, scale: 1 }}
          animate={{
            x: Math.cos((i * 30 * Math.PI) / 180) * 100,
            y: Math.sin((i * 30 * Math.PI) / 180) * 100,
            scale: 0
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  );
};

const ThankYouScreen = ({ name, onPlay }: { name: string; onPlay: () => void }) => {
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number }[]>([]);
  const fwIdRef = useRef(0);

  // Auto fireworks every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const id = fwIdRef.current++;
      setFireworks(prev => [...prev, { 
        id, 
        x: 10 + Math.random() * 80, 
        y: 5 + Math.random() * 60 
      }]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const removeFirework = (id: number) => {
    setFireworks(prev => prev.filter(fw => fw.id !== id));
  };

  // Generate emojis with animation
  const [emojis] = useState(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      char: ['✨', '🎉', '💖', '⭐', '🎈', '🎊', '🎂', '🎁', '🎵', '🌸'][i % 10],
      left: Math.floor(Math.random() * 90) + 5,
      top: Math.floor(Math.random() * 90) + 5,
      size: Math.floor(Math.random() * 20) + 20,
      delay: Math.random() * 3
    }))
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
    }}>
      {/* Background blur */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at 30% 40%, rgba(112, 0, 255, 0.5) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255, 0, 122, 0.5) 0%, transparent 50%)',
        filter: 'blur(60px)'
      }} />

      {/* Random floating emojis */}
      {emojis.map(e => (
        <div
          key={e.id}
          style={{
            position: 'absolute',
            left: `${e.left}%`,
            top: `${e.top}%`,
            fontSize: `${e.size}px`,
            opacity: 0.6,
            animation: `float 3s ease-in-out ${e.delay}s infinite`,
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {e.char}
        </div>
      ))}

      {/* Fireworks */}
      {fireworks.map(fw => (
        <Firework 
          key={fw.id} 
          x={fw.x} 
          y={fw.y} 
          onDone={() => removeFirework(fw.id)} 
        />
      ))}

      {/* Center container */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            maxWidth: '320px',
            padding: '24px',
            borderRadius: '24px',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}
        >
          <h1 style={{
            fontSize: '36px',
            fontWeight: 900,
            marginBottom: '8px',
            background: 'linear-gradient(to bottom, #fff, #aaa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Thank You
          </h1>

          {name ? (
            <p style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '8px'
            }}>
              Thank You {name}!
            </p>
          ) : (
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '12px'
            }}>
              For all the birthday wishes 🎂
            </p>
          )}

          <p style={{
            fontSize: '13px',
            fontStyle: 'italic',
            color: '#00f2ff',
            marginBottom: '20px'
          }}>
            "Grateful for another year and amazing people like you."
          </p>

          {/* Big Play Button */}
          <button
            onClick={onPlay}
            style={{
              width: '100%',
              padding: '16px 24px',
              fontSize: '18px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: 'white',
              background: 'linear-gradient(45deg, #ff007a, #7000ff)',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(255,0,122,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '24px' }}>🎮</span>
            <span>Play to Win!</span>
            <span style={{ fontSize: '24px' }}>🏆</span>
          </button>

          <p style={{
            marginTop: '16px',
            fontSize: '18px',
            fontFamily: 'cursive, Georgia, serif',
            color: '#fff'
          }}>
            — {name || 'Bijaya'}
          </p>

          <p style={{
            marginTop: '8px',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.5)'
          }}>
            👆 Tap 🌲 Dodge ⭐ Score
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

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

  useEffect(() => {
    const saved = localStorage.getItem('bijaya-highscore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem('bijaya-highscore', highScore.toString());
  }, [highScore]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { birdImgRef.current = img; setBirdLoaded(true); };
    img.onerror = () => setBirdLoaded(true);
    img.src = '/bird.png';
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
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

    const resetGame = () => { birdY = canvas.height / 2; birdVy = 0; pipes = []; frame = 0; setScore(0); };
    
    const jump = () => {
      setGameState(prev => {
        if (prev === 'waiting') { birdVy = -7; return 'playing'; }
        else if (prev === 'playing') { birdVy = -7; return prev; }
        else if (prev === 'gameover') { resetGame(); return 'waiting'; }
        return prev;
      });
    };

    canvas.addEventListener('click', jump);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); jump(); }, { passive: false });

    const drawMountains = (offset: number) => {
      const w = canvas.width, h = canvas.height;
      ctx.fillStyle = '#8B7355';
      ctx.beginPath();
      for (let i = 0; i <= w; i += 50) { ctx.lineTo(i, h - (Math.sin((i + offset * 0.3) * 0.01) * 80 + 150)); }
      ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();

      ctx.fillStyle = '#A0522D';
      ctx.beginPath();
      for (let i = 0; i <= w; i += 40) { ctx.lineTo(i, h - (Math.sin((i + offset * 0.5) * 0.015) * 60 + 100)); }
      ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();

      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      for (let i = 0; i <= w; i += 30) { ctx.lineTo(i, h - (Math.sin((i + offset * 0.8) * 0.02) * 40 + 60)); }
      ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();
    };

    const drawBird = (x: number, y: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      if (birdImgRef.current && birdLoaded) {
        ctx.drawImage(birdImgRef.current, -birdR, -birdR, birdR * 2, birdR * 2);
      } else {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath(); ctx.arc(0, 0, birdR - 4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#FFA500'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(6, -4, 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#FF8C00'; ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(18, 4); ctx.lineTo(10, 8); ctx.fill();
      }
      ctx.restore();
    };

    const draw = () => {
      const w = canvas.width, h = canvas.height;
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#1e3c72'); grad.addColorStop(0.5, '#87CEEB'); grad.addColorStop(1, '#E0F6FF');
      ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h);

      const s = gameStateRef.current;
      if (s === 'playing') mountainsOffset += 1;
      drawMountains(mountainsOffset);

      if (s === 'waiting') {
        drawBird(birdX, birdY, 0);
        ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'white'; ctx.font = 'bold 32px system-ui'; ctx.textAlign = 'center';
        ctx.fillText('👆 TAP TO START', w / 2, h / 2);
      }
      else if (s === 'playing') {
        birdVy += 0.4; birdY += birdVy;
        if (birdY + birdR > h - 20 || birdY - birdR < 0) {
          setGameState('gameover');
          if (scoreRef.current > highScore) setHighScore(scoreRef.current);
        }
        frame++;
        if (frame % 100 === 0) {
          const min = 100, gap = 160, max = h - gap - min - 100;
          pipes.push({ x: w, th: Math.floor(Math.random() * (max - min) + min), p: false, gap });
        }
        pipes = pipes.filter((p) => {
          p.x -= 3;
          ctx.fillStyle = '#D2691E'; ctx.fillRect(p.x, 0, 60, p.th); ctx.fillRect(p.x, p.th + 160, 60, h - p.th - 160);
          const hit = birdX + birdR > p.x && birdX - birdR < p.x + 60 && (birdY - birdR < p.th || birdY + birdR > p.th + 160);
          if (hit) { setGameState('gameover'); if (scoreRef.current > highScore) setHighScore(scoreRef.current); }
          if (!p.p && p.x + 60 < birdX) { p.p = true; setScore(v => v + 1); }
          return p.x > -60;
        });
        drawBird(birdX, birdY, Math.min(Math.max(birdVy * 0.05, -0.5), 0.5));
        ctx.fillStyle = 'white'; ctx.font = 'bold 56px system-ui'; ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 10;
        ctx.fillText(scoreRef.current.toString(), w / 2, 80); ctx.shadowBlur = 0;
      }
      else {
        drawBird(birdX, birdY, 0.5);
        ctx.fillStyle = 'rgba(0,0,0,0.75)'; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#ef4444'; ctx.font = 'bold 42px system-ui'; ctx.textAlign = 'center';
        ctx.fillText('Game Over!', w / 2, h / 2 - 140);
        ctx.fillStyle = 'white'; ctx.font = '30px system-ui';
        ctx.fillText(`Score: ${scoreRef.current}`, w / 2, h / 2 - 80);
        ctx.fillStyle = '#fbbf24'; ctx.font = '26px system-ui';
        ctx.fillText(`Your Best: ${Math.max(highScore, scoreRef.current)}`, w / 2, h / 2 - 40);
        ctx.fillStyle = '#00f2ff'; ctx.font = '22px system-ui';
        ctx.fillText(`Bijaya's Best: 20`, w / 2, h / 2);
        const playerBest = Math.max(highScore, scoreRef.current);
        if (playerBest > 20) { ctx.fillStyle = '#22c55e'; ctx.font = 'bold 24px system-ui'; ctx.fillText('🏆 You beat the Birthday Boy!', w / 2, h / 2 + 40); }
        else if (playerBest === 20) { ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 24px system-ui'; ctx.fillText('🤝 You tied with Bijaya!', w / 2, h / 2 + 40); }
        else { ctx.fillStyle = '#ff007a'; ctx.font = 'bold 24px system-ui'; ctx.fillText('💪 Can you beat the creator?', w / 2, h / 2 + 40); }
        ctx.fillStyle = '#00dbde'; ctx.font = 'bold 20px system-ui';
        ctx.fillText('👆 Tap to Retry', w / 2, h / 2 + 90);
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [highScore, birdLoaded]);

  useEffect(() => () => { setGameState('waiting'); setScore(0); }, []);

  const handleBack = () => { setGameState('waiting'); setScore(0); onBack(); };

  return (
    <motion.div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 20 }}><button onClick={handleBack} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>← Back</button></div>
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 20 }}><span style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 'bold' }}>🏆 {highScore}</span></div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', touchAction: 'none', cursor: 'pointer' }} />
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
    <Suspense fallback={<div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}><span style={{ color: 'white', fontSize: '24px' }}>Loading... ✨</span></div>}>
      <AppContent />
    </Suspense>
  );
}
