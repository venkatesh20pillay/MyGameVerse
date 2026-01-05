import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import GameCard from '../components/GameCard';
import SEO from '../components/SEO';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <SEO 
        path="/"
        title="Free Classic Arcade Games Online"
        description="Play 6 classic arcade games free online - Snake, Tetris, Pac-Man, Wordle, Tic-Tac-Toe & Flappy Bird. No downloads, instant play, mobile-optimized."
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Classic Games,
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Modern Experience
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Play timeless arcade classics reimagined for today. No downloads, no accounts – just pure gaming fun with Snake, Tetris, Pac-Man, Wordle, Tic-Tac-Toe, and Flappy Bird.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></div>
              <span>6 Games Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
              <span>100% Free</span>
            </div>
          </div>
        </div>

        {/* Ad Space Placeholder */}
        <div className="mb-12 bg-gray-800/30 rounded-xl p-8 border border-gray-700 border-dashed min-h-[120px]">
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <article className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">Instant Play</h2>
            <p className="text-gray-400 text-sm">No installation required. Start playing immediately in your browser on any device.</p>
          </article>
          <article className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">Save Progress</h2>
            <p className="text-gray-400 text-sm">Your scores and achievements are saved locally on your device for continuous gameplay.</p>
          </article>
          <article className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">Mobile Optimized</h2>
            <p className="text-gray-400 text-sm">Fully responsive design with touch controls optimized for mobile and tablet gaming.</p>
          </article>
        </div>

        {/* SEO Content Section */}
        <article className="mt-20 bg-gray-800/50 rounded-2xl shadow-lg p-8 md:p-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6">Play Classic Arcade Games Online - Free & Unblocked</h2>
          <div className="prose prose-lg max-w-none text-gray-300">
            <p className="mb-4">
              Welcome to Multi Game Verse, your premier destination for playing classic arcade games online for free. Our collection features 6 timeless games that have entertained millions: <a href="/snake" className="text-cyan-400 hover:text-cyan-300 font-medium">Snake</a>, <a href="/tetris" className="text-cyan-400 hover:text-cyan-300 font-medium">Tetris</a>, <a href="/pacman" className="text-cyan-400 hover:text-cyan-300 font-medium">Pac-Man</a>, <a href="/wordle" className="text-cyan-400 hover:text-cyan-300 font-medium">Wordle</a>, <a href="/tic-tac-toe" className="text-cyan-400 hover:text-cyan-300 font-medium">Tic-Tac-Toe</a>, and <a href="/flappy-bird" className="text-cyan-400 hover:text-cyan-300 font-medium">Flappy Bird</a>.
            </p>
            <p className="mb-4">
              Each game is carefully optimized for modern browsers with smooth gameplay, responsive controls, and mobile-friendly interfaces. Whether you're looking to kill time, challenge your reflexes, or relive nostalgic gaming moments, we've got you covered. Check out our <a href="/about" className="text-cyan-400 hover:text-cyan-300 font-medium">about page</a> to learn more about our mission.
            </p>
            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Why Play Games on Multi Game Verse?</h3>
            <ul className="space-y-2 mb-4 text-gray-300">
              <li>✓ <strong className="text-white">No Downloads Required:</strong> Play instantly in your web browser</li>
              <li>✓ <strong className="text-white">100% Free:</strong> All games completely free with no hidden costs</li>
              <li>✓ <strong className="text-white">Unblocked Games:</strong> Access from school, work, or anywhere</li>
              <li>✓ <strong className="text-white">Mobile Friendly:</strong> Play on phone, tablet, or desktop</li>
              <li>✓ <strong className="text-white">Privacy First:</strong> No registration, no personal data collection - read our <a href="/privacy" className="text-cyan-400 hover:text-cyan-300 font-medium">privacy policy</a></li>
              <li>✓ <strong className="text-white">Save Your Progress:</strong> High scores saved locally on your device</li>
            </ul>
            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Our Game Collection</h3>
            <p className="mb-4">
              From the strategic puzzle-solving of <a href="/tetris" className="text-cyan-400 hover:text-cyan-300 font-medium">Tetris</a> to the fast-paced action of <a href="/flappy-bird" className="text-cyan-400 hover:text-cyan-300 font-medium">Flappy Bird</a>, our games offer something for everyone. Challenge the AI in <a href="/tic-tac-toe" className="text-cyan-400 hover:text-cyan-300 font-medium">Tic-Tac-Toe</a>, test your vocabulary with unlimited <a href="/wordle" className="text-cyan-400 hover:text-cyan-300 font-medium">Wordle</a> puzzles, navigate mazes in <a href="/pacman" className="text-cyan-400 hover:text-cyan-300 font-medium">Pac-Man</a>, or grow your snake to record lengths in our <a href="/snake" className="text-cyan-400 hover:text-cyan-300 font-medium">Snake Game</a>. Each game features progressive difficulty levels to keep you engaged and challenged.
            </p>
          </div>
        </article>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About Column */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Multi Game Verse</h3>
              <p className="text-gray-400 text-sm mb-4">
                Play classic arcade games online for free. No downloads, no registration required.
              </p>
            </div>
            
            {/* Games Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Games</h3>
              <ul className="space-y-2">
                <li><a href="/snake" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Snake Game</a></li>
                <li><a href="/tic-tac-toe" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Tic Tac Toe</a></li>
                <li><a href="/wordle" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Wordle Unlimited</a></li>
                <li><a href="/tetris" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Tetris</a></li>
                <li><a href="/pacman" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Pac-Man</a></li>
                <li><a href="/flappy-bird" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Flappy Bird</a></li>
              </ul>
            </div>
            
            {/* Quick Links Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Home</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">About Us</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            {/* Contact Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="mailto:saverapps20@gmail.com" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Email Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-500 text-sm">© 2025 Multi Game Verse. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="/about" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">About Us</a>
                <a href="/privacy" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;