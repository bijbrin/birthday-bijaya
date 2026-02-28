'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift, Code, Rocket, Zap, Crown } from 'lucide-react';

const generateStars = () => Array.from({ length: 150 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 4 + 2,
  delay: Math.random() * 5,
}));

const StarField = () => {
  const [stars] = useState(() => generateStars());
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

const generateParticles = () => {
  const emojis = ['🎉', '✨', '🎂', '🎈', '🎁', '🌟', '💫', '🔥'];
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: emojis[i % emojis.length],
    x: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 10 + 10,
  }));
};

const FloatingParticles = () => {
  const [particles] = useState(() => generateParticles());
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-2xl"
          style={{ left: `${p.x}%` }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 1, 1, 0], rotate: [0, 360] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
};

const Hero = ({ onCelebrate }: { onCelebrate: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ opacity, scale }}>
      <motion.div className="absolute w-[600px] h-[600px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', y: y1, left: '-10%', top: '10%' }} />
      <motion.div className="absolute w-[500px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)', y: y2, right: '-5%', bottom: '20%' }} />
      <div className="relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <motion.div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass mb-8" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring', stiffness: 200 }} whileHover={{ scale: 1.05 }}>
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium tracking-wider uppercase">Today is Special</span>
          </motion.div>
        </motion.div>

        <motion.h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          <span className="gradient-text">Happy</span><br />
          <motion.span className="inline-block" animate={{ textShadow: ['0 0 20px rgba(251,191,36,0.5)', '0 0 40px rgba(244,114,182,0.8)', '0 0 20px rgba(251,191,36,0.5)'] }} transition={{ duration: 3, repeat: Infinity }}>Birthday</motion.span>
        </motion.h1>

        <motion.div className="relative inline-block" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}>
          <motion.h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Bijaya</span>
          </motion.h2>
          <motion.div className="absolute -top-12 left-1/2 -translate-x-1/2" animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }}>
            <Crown className="w-16 h-16 text-yellow-400 drop-shadow-lg" />
          </motion.div>
        </motion.div>

        <motion.p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          Another orbit around the sun. Another year of building dreams.
        </motion.p>

        <motion.button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onCelebrate}>
          <span className="relative z-10 flex items-center gap-2"><Sparkles className="w-5 h-5" />Celebrate!</span>
          <motion.div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600" initial={{ x: '100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
        </motion.button>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <motion.div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <motion.div className="w-1.5 h-1.5 rounded-full bg-white/60" animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const Stats = () => {
  const stats = [
    { icon: Code, value: '∞', label: 'Lines of Code', color: 'from-cyan-400 to-blue-500' },
    { icon: Rocket, value: '∞', label: 'Dreams Launched', color: 'from-purple-400 to-pink-500' },
    { icon: Zap, value: '∞', label: 'Ideas Sparked', color: 'from-yellow-400 to-orange-500' },
    { icon: Heart, value: '∞', label: 'Hearts Touched', color: 'from-pink-400 to-red-500' },
  ];

  return (
    <section className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}>
          {stats.map((stat, i) => (
            <motion.div key={i} className="relative group" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <div className="glass rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-500">
                <motion.div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-4`} whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div className="text-5xl font-black mb-2 gradient-text" whileInView={{ scale: [0.5, 1.2, 1] }} transition={{ duration: 0.5, delay: i * 0.1 }}>{stat.value}</motion.div>
                <p className="text-white/60 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Wishes = () => {
  const wishes = [
    { icon: '🎂', title: 'Sweet Success', text: 'May your code always compile on the first try' },
    { icon: '🚀', title: 'Sky High', text: 'May your dreams reach heights beyond the clouds' },
    { icon: '✨', title: 'Sparkle On', text: 'May your creativity never dim, always shine' },
    { icon: '🔥', title: 'Stay Lit', text: 'May your passion burn brighter every single day' },
    { icon: '💎', title: 'Pure Gold', text: 'May your ideas be precious and your impact profound' },
    { icon: '🌟', title: 'Star Power', text: 'May you always be the star of your own story' },
  ];

  return (
    <section className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6" whileHover={{ scale: 1.05 }}>
            <Gift className="w-5 h-5 text-pink-400" />
            <span className="text-sm font-medium">Wishes for You</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Six Wishes</span><br />
            <span className="text-white/80">for Your Journey</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish, i) => (
            <motion.div key={i} className="group relative" initial={{ opacity: 0, y: 50, rotateX: -15 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} whileHover={{ y: -10, scale: 1.02 }}>
              <div className="glass rounded-3xl p-8 h-full hover:bg-white/10 transition-all duration-500">
                <div className="text-6xl mb-4 floating" style={{ animationDelay: `${i * 0.5}s` }}>{wish.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{wish.title}</h3>
                <p className="text-white/60 leading-relaxed">{wish.text}</p>
                <motion.div className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full opacity-20 blur-xl" style={{ background: 'linear-gradient(135deg, #f472b6, #7c3aed)' }} animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Timeline = () => {
  const milestones = [
    { year: 'Past', title: 'The Foundation', desc: 'Every line of code, every late night, every breakthrough' },
    { year: 'Now', title: 'The Celebration', desc: 'This moment. You. Here. Now. Being celebrated.' },
    { year: 'Future', title: 'The Horizon', desc: 'Infinite possibilities waiting for your touch' },
  ];

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6"><span className="gradient-text">Your Timeline</span></h2>
        </motion.div>

        <div className="relative">
          <motion.div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2" style={{ background: 'linear-gradient(to bottom, #7c3aed, #f472b6, #22d3ee)' }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} />

          {milestones.map((milestone, i) => (
            <motion.div key={i} className={`relative flex items-center gap-8 mb-20 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`} initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 0.6 }}>
              <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <motion.div className="glass rounded-2xl p-6 inline-block" whileHover={{ scale: 1.05 }}>
                  <span className="text-purple-400 font-bold text-sm tracking-wider">{milestone.year}</span>
                  <h3 className="text-2xl font-bold mt-2 mb-2">{milestone.title}</h3>
                  <p className="text-white/60">{milestone.desc}</p>
                </motion.div>
              </div>
              <motion.div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 z-10 pulse-glow" whileHover={{ scale: 1.5 }} />
              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalMessage = ({ onCelebrate }: { onCelebrate: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <motion.div className="text-8xl mb-8" animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🎂</motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="gradient-text">Happy Birthday</span><br />
            <span className="text-white">Bijaya!</span>
          </h2>

          <motion.p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            May this year bring you closer to everything you dream of. Keep building. Keep creating. Keep being you.
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
            <motion.button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onCelebrate}>
              <span className="flex items-center gap-2"><Sparkles className="w-5 h-5" />Celebrate Again!</span>
            </motion.button>
          </motion.div>

          <motion.div className="mt-16 flex justify-center gap-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
            {['🎉', '🎂', '🎈', '🎁', '✨', '🌟'].map((emoji, i) => (
              <motion.span key={i} className="text-4xl" animate={{ y: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}>{emoji}</motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default function BirthdayPage() {
  const triggerConfetti = useCallback(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#7c3aed', '#f472b6', '#fbbf24', '#22d3ee', '#ffffff'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#7c3aed', '#f472b6', '#fbbf24', '#22d3ee', '#ffffff'] });
    }, 250);
  }, []);

  useEffect(() => {
    const timer = setTimeout(triggerConfetti, 1500);
    return () => clearTimeout(timer);
  }, [triggerConfetti]);

  return (
    <main className="relative min-h-screen bg-[#1a0b2e]">
      <StarField />
      <FloatingParticles />
      <Hero onCelebrate={triggerConfetti} />
      <Stats />
      <Wishes />
      <Timeline />
      <FinalMessage onCelebrate={triggerConfetti} />
      <footer className="py-8 text-center text-white/40 text-sm"><p>Made with ❤️ for Bijaya</p></footer>
    </main>
  );
}