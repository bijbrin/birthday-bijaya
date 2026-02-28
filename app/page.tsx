'use client';

import { useEffect, useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Star, Gift, Heart, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

// Game State
interface GameState {
  currentLevel: number;
  completedLevels: number[];
  totalScore: number;
}

// Pre-generate stars for SSR compatibility
const STATIC_STARS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: (i * 2) % 100,
  y: (i * 3) % 100,
  size: (i % 3) + 1,
  duration: 2 + (i % 3),
  delay: i * 0.1,
}));

// Memoized Star Field
const StarField = memo(function StarField() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {STATIC_STARS.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white will-change-transform"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px` }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
});

// Level Button
const LevelButton = memo(function LevelButton({ level, title, icon: Icon, isUnlocked, isCompleted, isCurrent, onClick }: {
  level: number; title: string; icon: React.ElementType; isUnlocked: boolean; isCompleted: boolean; isCurrent: boolean; onClick: () => void;
}) {
  return (
    <motion.button
      onClick={isUnlocked ? onClick : undefined}
      className={`relative w-full max-w-md mx-auto p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0518] ${
        isCompleted ? 'bg-green-500/20 border-green-400/50' : isCurrent ? 'bg-purple-500/30 border-purple-400 shadow-lg shadow-purple-500/30' : isUnlocked ? 'bg-white/5 border-white/20 hover:bg-white/10' : 'bg-gray-900/50 border-gray-700 opacity-50 cursor-not-allowed'
      }`}
      whileHover={isUnlocked ? { scale: 1.02, y: -2 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
      aria-label={`Level ${level}: ${title}${isCompleted ? ' (completed)' : isCurrent ? ' (current)' : isUnlocked ? ' (unlocked)' : ' (locked)'}`}
      aria-disabled={!isUnlocked}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0 ${
          isCompleted ? 'bg-green-500 text-white' : isCurrent ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' : isUnlocked ? 'bg-white/10 text-white' : 'bg-gray-800 text-gray-500'
        }`}>
          {isCompleted ? <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" /> : <Icon className="w-6 h-6 sm:w-7 sm:h-7" />}
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs sm:text-sm font-bold text-white/50">LEVEL {level}</span>
            {isCurrent && <span className="px-2 py-0.5 bg-purple-500 text-xs rounded-full text-white">CURRENT</span>}
          </div>
          <h3 className={`text-lg sm:text-xl font-bold truncate ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>{title}</h3>
        </div>
        <div className="shrink-0">
          {!isUnlocked && <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" aria-hidden="true" />}
          {isCompleted && <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400" aria-hidden="true" />}
          {isCurrent && <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" aria-hidden="true" />}
        </div>
      </div>
      {isCurrent && (
        <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-2xl" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3 }} />
      )}
    </motion.button>
  );
});

// Level Components
const Level1Start = ({ onComplete }: { onComplete: () => void }) => {
  const [clicked, setClicked] = useState(false);
  const handleCelebrate = () => {
    setClicked(true);
    const duration = 3000, animationEnd = Date.now() + duration, defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) { clearInterval(interval); onComplete(); return; }
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: Math.random() * 0.3 + 0.1, y: Math.random() - 0.2 }, colors: ['#7c3aed', '#f472b6', '#fbbf24', '#22d3ee'] });
      confetti({ ...defaults, particleCount, origin: { x: Math.random() * 0.3 + 0.6, y: Math.random() - 0.2 }, colors: ['#7c3aed', '#f472b6', '#fbbf24', '#22d3ee'] });
    }, 250);
  };

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-4 py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', duration: 1 }} className="w-32 h-32 mb-8 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 flex items-center justify-center shadow-2xl shadow-purple-500/50">
        <span className="text-6xl">🎂</span>
      </motion.div>
      <motion.h1 className="text-5xl md:text-7xl font-black text-center mb-4" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">HAPPY BIRTHDAY</span>
      </motion.h1>
      <motion.h2 className="text-3xl md:text-5xl font-bold text-center mb-8" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}><span className="text-white">Bijaya</span></motion.h2>
      <motion.p className="text-lg text-white/60 text-center max-w-md mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>Welcome to your birthday adventure! Complete all levels to unlock your special surprise.</motion.p>
      <motion.button onClick={handleCelebrate} disabled={clicked} className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-xl overflow-hidden disabled:opacity-50" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
        <span className="relative z-10 flex items-center gap-3"><Sparkles className="w-6 h-6" />{clicked ? 'Celebrating...' : 'Start Celebration'}<ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></span>
      </motion.button>
    </motion.div>
  );
};

const Level2Stats = ({ onComplete }: { onComplete: () => void }) => {
  const [collected, setCollected] = useState<number[]>([]);
  const stats = [
    { icon: '💻', label: 'Code Written', color: 'from-cyan-400 to-blue-500' },
    { icon: '🚀', label: 'Dreams Launched', color: 'from-purple-400 to-pink-500' },
    { icon: '⚡', label: 'Ideas Sparked', color: 'from-yellow-400 to-orange-500' },
    { icon: '❤️', label: 'Hearts Touched', color: 'from-pink-400 to-red-500' },
  ];
  const collectStat = (index: number) => {
    if (collected.includes(index)) return;
    const newCollected = [...collected, index];
    setCollected(newCollected);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 }, colors: ['#7c3aed', '#f472b6'] });
    if (newCollected.length === stats.length) setTimeout(onComplete, 500);
  };

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-4 py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-12"><span className="text-purple-400 font-bold tracking-wider">LEVEL 2</span><h2 className="text-4xl font-bold text-white mt-2">Collect Your Achievements</h2><p className="text-white/60 mt-2">Click each card to collect</p></div>
      <div className="grid grid-cols-2 gap-4 max-w-2xl w-full">
        {stats.map((stat, i) => (
          <motion.button key={i} onClick={() => collectStat(i)} className={`relative p-6 rounded-2xl border-2 transition-all ${collected.includes(i) ? 'bg-gradient-to-br ' + stat.color + ' border-transparent' : 'bg-white/5 border-white/20 hover:bg-white/10'}`} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="text-4xl mb-3">{stat.icon}</div><div className="text-3xl font-black text-white mb-1">∞</div><div className="text-sm text-white/80">{stat.label}</div>
            {collected.includes(i) && <motion.div className="absolute top-2 right-2" initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle2 className="w-6 h-6 text-white" /></motion.div>}
          </motion.button>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-2"><span className="text-white/60">Progress:</span><div className="w-48 h-3 bg-white/10 rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" initial={{ width: 0 }} animate={{ width: `${(collected.length / stats.length) * 100}%` }} /></div><span className="text-white font-bold">{collected.length}/{stats.length}</span></div>
    </motion.div>
  );
};

const Level3Wishes = ({ onComplete }: { onComplete: () => void }) => {
  const [opened, setOpened] = useState<number[]>([]);
  const wishes = [
    { icon: '🎂', title: 'Sweet Success', text: 'May your code always compile on the first try' },
    { icon: '🚀', title: 'Sky High', text: 'May your dreams reach heights beyond the clouds' },
    { icon: '✨', title: 'Sparkle On', text: 'May your creativity never dim, always shine' },
    { icon: '🔥', title: 'Stay Lit', text: 'May your passion burn brighter every single day' },
    { icon: '💎', title: 'Pure Gold', text: 'May your ideas be precious and your impact profound' },
    { icon: '🌟', title: 'Star Power', text: 'May you always be the star of your own story' },
  ];
  const openWish = (index: number) => {
    if (opened.includes(index)) return;
    const newOpened = [...opened, index];
    setOpened(newOpened);
    if (newOpened.length === wishes.length) setTimeout(onComplete, 800);
  };

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-4 py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-12"><span className="text-pink-400 font-bold tracking-wider">LEVEL 3</span><h2 className="text-4xl font-bold text-white mt-2">Open Your Birthday Wishes</h2><p className="text-white/60 mt-2">Click each gift to reveal</p></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
        {wishes.map((wish, i) => (
          <motion.button key={i} onClick={() => openWish(i)} className="relative h-40" initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }} transition={{ delay: i * 0.1 }}>
            <AnimatePresence mode="wait">
              {!opened.includes(i) ? (
                <motion.div key="closed" className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-purple-500/30" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} exit={{ rotateY: 90, opacity: 0 }}><Gift className="w-12 h-12 text-white" /></motion.div>
              ) : (
                <motion.div key="open" className="absolute inset-0 bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center" initial={{ rotateY: -90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }}>
                  <div className="text-4xl mb-2">{wish.icon}</div><h3 className="text-lg font-bold text-white mb-1">{wish.title}</h3><p className="text-sm text-white/70">{wish.text}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
      <div className="mt-8 text-center"><span className="text-white/60">{opened.length} of {wishes.length} wishes opened</span></div>
    </motion.div>
  );
};

const Level4Timeline = ({ onComplete }: { onComplete: () => void }) => {
  const [activeStage, setActiveStage] = useState(0);
  const stages = [
    { year: 'Past', title: 'The Foundation', desc: 'Every line of code, every late night, every breakthrough', icon: '📚' },
    { year: 'Present', title: 'The Celebration', desc: 'This moment. You. Here. Now. Being celebrated.', icon: '🎉' },
    { year: 'Future', title: 'The Horizon', desc: 'Infinite possibilities waiting for your touch', icon: '🔮' },
  ];
  const activateStage = (index: number) => {
    if (index > activeStage) return;
    setActiveStage(index + 1);
    if (index + 1 === stages.length) setTimeout(onComplete, 500);
  };

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-4 py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-12"><span className="text-cyan-400 font-bold tracking-wider">LEVEL 4</span><h2 className="text-4xl font-bold text-white mt-2">Your Journey Timeline</h2><p className="text-white/60 mt-2">Click each stage to progress</p></div>
      <div className="max-w-2xl w-full space-y-4">
        {stages.map((stage, i) => (
          <motion.button key={i} onClick={() => activateStage(i)} disabled={i > activeStage} className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${i < activeStage ? 'bg-green-500/20 border-green-400/50' : i === activeStage ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400' : 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'}`} whileHover={i <= activeStage ? { scale: 1.02, x: 10 } : {}} whileTap={i <= activeStage ? { scale: 0.98 } : {}} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}>
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${i < activeStage ? 'bg-green-500' : i === activeStage ? 'bg-purple-500' : 'bg-gray-700'}`}>{i < activeStage ? <CheckCircle2 className="w-7 h-7 text-white" /> : <span>{stage.icon}</span>}</div>
              <div className="flex-1"><span className={`text-sm font-bold ${i <= activeStage ? 'text-purple-400' : 'text-gray-500'}`}>{stage.year}</span><h3 className={`text-xl font-bold ${i <= activeStage ? 'text-white' : 'text-gray-500'}`}>{stage.title}</h3><p className={`text-sm ${i <= activeStage ? 'text-white/70' : 'text-gray-600'}`}>{stage.desc}</p></div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

const Level5Final = ({ onRestart }: { onRestart: () => void }) => {
  const [celebrated, setCelebrated] = useState(false);
  const megaCelebrate = () => {
    setCelebrated(true);
    const duration = 5000, animationEnd = Date.now() + duration;
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) { clearInterval(interval); return; }
      confetti({ particleCount: 100, spread: 360, origin: { x: Math.random(), y: Math.random() * 0.5 }, colors: ['#7c3aed', '#f472b6', '#fbbf24', '#22d3ee', '#ffffff'] });
    }, 100);
  };

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-4 py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.8 }} className="w-40 h-40 mb-8 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/50"><Trophy className="w-20 h-20 text-white" /></motion.div>
      <div className="text-center max-w-2xl"><span className="text-yellow-400 font-bold tracking-wider">LEVEL 5 - FINAL</span><h1 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6">YOU DID IT!</h1><p className="text-xl text-white/80 mb-8">Happy Birthday Bijaya! You've completed all levels of your birthday adventure. May this year bring you closer to everything you dream of.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button onClick={megaCelebrate} className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl font-bold text-lg text-white" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Sparkles className="w-5 h-5 inline mr-2" />{celebrated ? 'Celebrated! 🎉' : 'Mega Celebration'}</motion.button>
          <motion.button onClick={onRestart} className="px-8 py-4 bg-white/10 border border-white/20 rounded-2xl font-bold text-lg text-white" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Play Again</motion.button>
        </div>
      </div>
      <div className="mt-12 flex justify-center gap-2">{['🎉', '🎂', '🎈', '🎁', '✨', '🌟', '💫', '🔥'].map((emoji, i) => (
        <motion.span key={i} className="text-3xl" animate={{ y: [0, -20, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}>{emoji}</motion.span>
      ))}</div>
    </motion.div>
  );
};

// Main Game
export default function BirthdayGame() {
  const [gameState, setGameState] = useState<GameState>({ currentLevel: 1, completedLevels: [], totalScore: 0 });
  const completeLevel = (level: number) => setGameState(prev => ({ ...prev, completedLevels: [...prev.completedLevels, level], currentLevel: level + 1, totalScore: prev.totalScore + 100 }));
  const selectLevel = (level: number) => setGameState(prev => ({ ...prev, currentLevel: level }));
  const restart = () => setGameState({ currentLevel: 1, completedLevels: [], totalScore: 0 });
  const levels = [
    { id: 1, title: 'Start Celebration', icon: Sparkles },
    { id: 2, title: 'Collect Achievements', icon: Trophy },
    { id: 3, title: 'Open Wishes', icon: Gift },
    { id: 4, title: 'Journey Timeline', icon: Star },
    { id: 5, title: 'Final Surprise', icon: Heart },
  ];

  return (
    <main className="relative min-h-screen bg-[#0f0518] overflow-x-hidden">
      <StarField />
      <div className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-2xl">🎂</span><span className="text-white font-bold hidden sm:block">Bijaya's Birthday Quest</span></div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white/10 rounded-full"><span className="text-white/60 text-sm">Score: </span><span className="text-white font-bold">{gameState.totalScore}</span></div>
            <div className="px-4 py-2 bg-purple-500/20 rounded-full"><span className="text-purple-400 font-bold">Level {gameState.currentLevel}/5</span></div>
          </div>
        </div>
      </div>

      {gameState.currentLevel <= 5 && (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
          <div className="space-y-3">{levels.map((level) => {
            const isCompleted = gameState.completedLevels.includes(level.id), isCurrent = gameState.currentLevel === level.id, isUnlocked = level.id <= gameState.currentLevel;
            return (
              <motion.button key={level.id} onClick={() => isUnlocked && selectLevel(level.id)} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isCompleted ? 'bg-green-500 text-white' : isCurrent ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50' : isUnlocked ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`} whileHover={isUnlocked ? { scale: 1.1 } : {}} whileTap={isUnlocked ? { scale: 0.95 } : {}}><level.icon className="w-5 h-5" /></motion.button>
            );
          })}</div>
        </div>
      )}

      <div className="pt-20">
        <AnimatePresence mode="wait">
          {gameState.currentLevel === 1 && <Level1Start key="level1" onComplete={() => completeLevel(1)} />}
          {gameState.currentLevel === 2 && <Level2Stats key="level2" onComplete={() => completeLevel(2)} />}
          {gameState.currentLevel === 3 && <Level3Wishes key="level3" onComplete={() => completeLevel(3)} />}
          {gameState.currentLevel === 4 && <Level4Timeline key="level4" onComplete={() => completeLevel(4)} />}
          {gameState.currentLevel === 5 && <Level5Final key="level5" onRestart={restart} />}
        </AnimatePresence>
      </div>

      <footer className="py-8 text-center text-white/40 text-sm"><p>Made with ❤️ for Bijaya | Level {gameState.currentLevel} of 5</p></footer>
    </main>
  );
}