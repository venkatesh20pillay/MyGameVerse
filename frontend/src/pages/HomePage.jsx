import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import GameCard from '../components/GameCard';
import { Sparkles, Zap, Target, Grid3x3, AlignJustify, Bird, Ghost } from 'lucide-react';

const HomePage = () => {
  const games = [
    {
      title: 'Snake Game',
      description: 'Classic snake game with progressive difficulty. Eat food, grow longer, avoid walls and yourself!',
      icon: Zap,
      path: '/snake',
      color: 'text-green-600'
    },
    {
      title: 'Tic Tac Toe',
      description: 'Challenge the AI or play with a friend. Three in a row wins!',
      icon: Grid3x3,
      path: '/tic-tac-toe',
      color: 'text-blue-600'
    },
    {
      title: 'Wordle',
      description: 'Unlimited word guessing game. Find the 5-letter word in 6 tries!',
      icon: AlignJustify,
      path: '/wordle',
      color: 'text-yellow-600'
    },
    {
      title: 'Tetris',
      description: 'Arrange falling blocks to clear lines. Speed increases as you progress!',
      icon: Target,
      path: '/tetris',
      color: 'text-purple-600'
    },
    {
      title: 'Pac-Man',
      description: 'Navigate mazes, eat dots, avoid ghosts. Multiple challenging levels!',
      icon: Ghost,
      path: '/pacman',
      color: 'text-orange-600'
    },
    {
      title: 'Flappy Bird',
      description: 'Tap to flap through pipes. Simple controls, challenging gameplay!',
      icon: Bird,
      path: '/flappy-bird',
      color: 'text-cyan-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Classic Games,
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Modern Experience
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Play timeless arcade classics reimagined for today. No downloads, no accounts – just pure gaming fun.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>6 Games Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>100% Free</span>
            </div>
          </div>
        </div>

        {/* Ad Space Placeholder */}
        <div className="mb-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-8 border border-gray-300 border-dashed min-h-[120px]">
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Play</h3>
            <p className="text-gray-600 text-sm">No installation required. Start playing immediately in your browser.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Progress</h3>
            <p className="text-gray-600 text-sm">Your scores and achievements are saved locally on your device.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Optimized</h3>
            <p className="text-gray-600 text-sm">Fully responsive design with touch controls for mobile gaming.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">© 2025 My Game Verse. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="/about" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">About Us</a>
              <a href="/privacy" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;