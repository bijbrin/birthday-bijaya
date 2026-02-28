'use client';

import { useEffect, useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Star, Gift, Heart, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

// Types
interface GameState {
  currentLevel: number;
  completedLevels: number[];
  totalScore: number;
}

// Static stars for background
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: (i * 7) % 100,
  y: (i * 13) % 100,
  size: 1 + (i % 3),
  delay: i * 0.1,
}));

// Background Component
const StarBackground = memo(function StarBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
      {STARS.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2 + Math.random(), delay: star.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
});

// Progress Bar Component
const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center gap-3">
    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div 
        className="h-full rounded-full"
        style={{ background: 'linear-gradient(90deg, #8b5cf6, #ec4899)' }}
        initial={{ width: 0 }}
        animate={{ width: `${(current / total) * 100}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
    <span className="text-sm font-medium text-white/60">{current}/{total}</span>
  </div>
);

// Level 1: Hero
const Level1Hero = ({ onComplete }: { onComplete: () => void }) => {
  const [celebrating, setCelebrating] = useState(false);

  const celebrate = () => {
    setCelebrating(true);
    const end = Date.now() + 3000;
    const frame = () => {
      if (Date.now() > end) { onComplete(); return; }
      confetti({ particleCount: 40, spread: 100, origin: { y: 0.6 }, colors: ['#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4'] });
      requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-6 py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-white/80">Birthday Quest</span>
        </div>
      </motion.div>

      
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="text-center mb-6">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight">
          <span className="gradient-text">HAPPY</span>
          <br />
          <span className="text-white">BIRTHDAY</span>
        </h1>
      </motion.div>

      
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
        <div className="inline-block px-8 py-3 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2))', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="text-3xl md:text-5xl font-bold gradient-text-purple">Bijaya</span>
        </div>
      </motion.div>

      
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg text-white/60 text-center max-w-md mb-12">
        Complete all 5 levels to unlock your birthday surprise
      </motion.p>

      
      <motion.button
        onClick={celebrate}
        disabled={celebrating}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative px-10 py-5 rounded-2xl font-bold text-lg text-white btn-gradient disabled:opacity-70"
      >
        <span className="relative z-10 flex items-center gap-3">
          {celebrating ? 'Celebrating...' : 'Start Adventure'}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </motion.button>
    </motion.div>
  );
};

// Level 2: Stats
const Level2Stats = ({ onComplete }: { onComplete: () => void }) => {
  const [collected, setCollected] = useState<Set<number>>(new Set());

  const stats = [
    { emoji: '💻', label: 'Code Written', color: 'from-cyan-500 to-blue-500' },
    { emoji: '🚀', label: 'Dreams Launched', color: 'from-purple-500 to-pink-500' },
    { emoji: '⚡', label: 'Ideas Sparked', color: 'from-yellow-500 to-orange-500' },
    { emoji: '❤️', label: 'Hearts Touched', color: 'from-pink-500 to-rose-500' },
  ];

  const collect = (i: number) => {
    if (collected.has(i)) return;
    const next = new Set(collected).add(i);
    setCollected(next);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 }, colors: ['#8b5cf6', '#ec4899'] });
    if (next.size === stats.length) setTimeout(onComplete, 600);
  };

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-6 py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-12">
        <span className="text-sm font-bold tracking-wider text-purple-400">LEVEL 2</span>
        <h2 className="text-4xl font-bold text-white mt-2">Collect Achievements</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-lg w-full mb-8">
        {stats.map((stat, i) => {
          const isCollected = collected.has(i);
          return (
            <motion.button
              key={i}
              onClick={() => collect(i)}
              className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                isCollected 
                  ? `bg-gradient-to-br ${stat.color} border-transparent` 
                  : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
              }`}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl mb-3">{stat.emoji}</div>
              <div className="text-3xl font-black text-white mb-1">∞</div>
              <div className="text-sm text-white/80">{stat.label}</div>
              {isCollected && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <ProgressBar current={collected.size} total={stats.length} />
    </motion.div>
  );
};

// Level 3: Wishes
const Level3Wishes = ({ onComplete }: { onComplete: () => void }) => {
  const [opened, setOpened] = useState<Set<number>>(new Set());

  const wishes = [
    { icon: '🎂', title: 'Sweet Success', text: 'May your code always compile' },
    { icon: '🚀', title: 'Sky High', text: 'Dream beyond the clouds' },
    { icon: '✨', title: 'Sparkle On', text: 'Creativity never dims' },
    { icon: '🔥', title: 'Stay Lit', text: 'Passion burns brighter' },
    { icon: '💎', title: 'Pure Gold', text: 'Ideas are precious' },
    { icon: '🌟', title: 'Star Power', text: 'Shine in your story' },
  ];

  const open = (i: number) => {
    if (opened.has(i)) return;
    const next = new Set(opened).add(i);
    setOpened(next);
    if (next.size === wishes.length) setTimeout(onComplete, 800);
  };

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-6 py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-12">
        <span className="text-sm font-bold tracking-wider text-pink-400">LEVEL 3</span>
        <h2 className="text-4xl font-bold text-white mt-2">Open Your Wishes</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl w-full">
        {wishes.map((wish, i) => {
          const isOpened = opened.has(i);
          return (
            <motion.button
              key={i}
              onClick={() => open(i)}
              className="relative h-36"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <AnimatePresence mode="wait">
                {!isOpened ? (
                  <motion.div
                    key="closed"
                    className="absolute inset-0 rounded-2xl flex items-center justify-center cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
                    whileHover={{ scale: 1.03 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Gift className="w-10 h-10 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    className="absolute inset-0 rounded-2xl p-4 flex flex-col items-center justify-center text-center glass"
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-3xl mb-2">{wish.icon}</div>
                    <h3 className="font-bold text-white text-sm">{wish.title}</h3>
                    <p className="text-xs text-white/60 mt-1">{wish.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8"><ProgressBar current={opened.size} total={wishes.length} /></div>
    </motion.div>
  );
};

// Level 4: Timeline
const Level4Timeline = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(0);

  const stages = [
    { emoji: '📚', year: 'Past', title: 'Foundation', desc: 'Every line of code' },
    { emoji: '🎉', year: 'Now', title: 'Celebration', desc: 'This moment, being celebrated' },
    { emoji: '🔮', year: 'Future', title: 'Horizon', desc: 'Infinite possibilities' },
  ];

  const activate = (i: number) => {
    if (i > stage) return;
    setStage(i + 1);
    if (i + 1 === stages.length) setTimeout(onComplete, 500);
  };

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-6 py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-12">
        <span className="text-sm font-bold tracking-wider text-cyan-400">LEVEL 4</span>
        <h2 className="text-4xl font-bold text-white mt-2">Your Journey</h2>
      </div>

      <div className="max-w-md w-full space-y-4">
        {stages.map((s, i) => {
          const isDone = i < stage, isActive = i === stage, isLocked = i > stage;
          return (
            <motion.button
              key={i}
              onClick={() => activate(i)}
              disabled={isLocked}
              className={`w-full p-5 rounded-2xl border text-left transition-all ${
                isDone ? 'bg-green-500/10 border-green-500/30' : isActive ? 'bg-purple-500/10 border-purple-500/50' : 'bg-white/[0.02] border-white/5 opacity-50'
              }`}
              whileHover={!isLocked ? { x: 8 } : {}}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${isDone ? 'bg-green-500' : isActive ? 'bg-purple-500' : 'bg-gray-800'}`}>
                  {isDone ? <CheckCircle2 className="w-6 h-6 text-white" /> : <span>{s.emoji}</span>}
                </div>
                <div>
                  <span className={`text-xs font-bold ${isActive ? 'text-purple-400' : 'text-white/40'}`}>{s.year}</span>
                  <h3 className="font-bold text-white">{s.title}</h3>
                  <p className="text-sm text-white/50">{s.desc}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

// Level 5: Final
const Level5Final = ({ onRestart }: { onRestart: () => void }) => {
  const [done, setDone] = useState(false);

  const megaCelebrate = () => {
    setDone(true);
    const end = Date.now() + 5000;
    const frame = () => {
      if (Date.now() > end) return;
      confetti({ particleCount: 100, spread: 360, origin: { x: Math.random(), y: Math.random() * 0.5 }, colors: ['#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4', '#ffffff'] });
      requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-6 py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="w-32 h-32 mb-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6)' }}>
        <Trophy className="w-16 h-16 text-white" />
      </motion.div>

      <div className="text-center max-w-lg">
        <span className="text-sm font-bold tracking-wider text-yellow-400">LEVEL 5 - COMPLETE</span>
        <h1 className="text-5xl md:text-6xl font-black text-white mt-4 mb-6">YOU DID IT!</h1>
        <p className="text-lg text-white/70 mb-8">Happy Birthday Bijaya! You've conquered all levels. May this year bring everything you dream of.</p>

        <div className="flex flex-wrap justify-center gap-4">
          <motion.button onClick={megaCelebrate} className="px-8 py-4 rounded-xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #f59e0b, #ec4899)' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Sparkles className="w-5 h-5 inline mr-2" />{done ? 'Celebrated! 🎉' : 'Celebrate'}
          </motion.button>
          <motion.button onClick={onRestart} className="px-8 py-4 rounded-xl font-bold text-white glass glass-hover" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Play Again
          </motion.button>
        </div>
      </div>

      <div className="mt-12 flex gap-3">{['🎉', '🎂', '🎈', '🎁', '✨', '🌟'].map((e, i) => (
        <motion.span key={i} className="text-3xl" animate={{ y: [0, -12, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}>{e}</motion.span>
      ))}</div>
    </motion.div>
  );
};

// Main
export default function BirthdayGame() {
  const [game, setGame] = useState<GameState>({ currentLevel: 1, completedLevels: [], totalScore: 0 });

  const complete = (level: number) => setGame(g => ({ ...g, completedLevels: [...g.completedLevels, level], currentLevel: level + 1, totalScore: g.totalScore + 100 }));
  const select = (level: number) => setGame(g => ({ ...g, currentLevel: level }));
  const restart = () => setGame({ currentLevel: 1, completedLevels: [], totalScore: 0 });

  const levels = [
    { id: 1, icon: Sparkles },
    { id: 2, icon: Trophy },
    { id: 3, icon: Gift },
    { id: 4, icon: Star },
    { id: 5, icon: Heart },
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
      <StarBackground />

      
      <header className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
              <span className="text-xl">🎂</span>
            </div>
            <span className="font-bold text-white hidden sm:block">Birthday Quest</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-full glass"><span className="text-white/60 text-sm">Score: </span><span className="font-bold text-white">{game.totalScore}</span></div>
            <div className="px-4 py-2 rounded-full" style={{ background: 'rgba(139,92,246,0.2)' }}><span className="font-bold text-purple-300">{game.currentLevel}/5</span></div>
          </div>
        </div>
      </header>

      
      {game.currentLevel <= 5 && (
        <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
          <div className="space-y-2">{levels.map((l) => {
            const done = game.completedLevels.includes(l.id), current = game.currentLevel === l.id, unlocked = l.id <= game.currentLevel;
            return (
              <motion.button key={l.id} onClick={() => unlocked && select(l.id)} className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${done ? 'bg-green-500 text-white' : current ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/40' : unlocked ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-800 text-gray-600'}`} whileHover={unlocked ? { scale: 1.1 } : {}} whileTap={unlocked ? { scale: 0.95 } : {}}>
                <l.icon className="w-5 h-5" />
              </motion.button>
            );
          })}</div>
        </nav>
      )}

      
      <div className="pt-24">
        <AnimatePresence mode="wait">
          {game.currentLevel === 1 && <Level1Hero key="l1" onComplete={() => complete(1)} />}
          {game.currentLevel === 2 && <Level2Stats key="l2" onComplete={() => complete(2)} />}
          {game.currentLevel === 3 && <Level3Wishes key="l3" onComplete={() => complete(3)} />}
          {game.currentLevel === 4 && <Level4Timeline key="l4" onComplete={() => complete(4)} />}
          {game.currentLevel === 5 && <Level5Final key="l5" onRestart={restart} />}
        </AnimatePresence>
      </div>

      <footer className="py-6 text-center text-white/30 text-sm">Made with ❤️ for Bijaya</footer>
    </main>
  );
}