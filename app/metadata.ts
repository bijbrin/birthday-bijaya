import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Happy Birthday Bijaya! 🎮 | Birthday Quest Game',
  description: 'An interactive birthday adventure game celebrating Bijaya. Complete all 5 levels to unlock the surprise!',
  keywords: ['birthday', 'game', 'celebration', 'interactive', 'bijaya'],
  authors: [{ name: 'NepClaw' }],
  openGraph: {
    title: 'Happy Birthday Bijaya! 🎂',
    description: 'Play through 5 levels of birthday fun!',
    type: 'website',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Birthday Quest Game'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Happy Birthday Bijaya! 🎮',
    description: 'An interactive birthday adventure game'
  }
};