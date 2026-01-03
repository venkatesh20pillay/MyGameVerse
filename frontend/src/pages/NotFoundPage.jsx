import { useNavigate } from 'react-router-dom';
import { Home, Gamepad2, Search, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const popularGames = [
    { name: 'Snake Game', path: '/snake' },
    { name: 'Tetris', path: '/tetris' },
    { name: 'Pac-Man', path: '/pacman' },
    { name: 'Wordle', path: '/wordle' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* 404 Display */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
              404
            </h1>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Gamepad2 className="w-32 h-32 text-gray-300 animate-pulse" />
                <AlertCircle className="w-12 h-12 text-red-500 absolute -top-2 -right-2" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Game Over - Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Oops! Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist or may have been moved.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Popular Games Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Try These Popular Games Instead
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularGames.map((game, index) => (
                <button
                  key={index}
                  onClick={() => navigate(game.path)}
                  className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-xl transition-all transform hover:scale-105 border border-indigo-200"
                >
                  <Gamepad2 className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <span className="text-sm font-semibold text-gray-900">{game.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h4>
            <p className="text-gray-600 text-sm mb-4">
              If you believe this is a bug or the page should exist, please let us know!
            </p>
            <a
              href="mailto:saverapps20@gmail.com?subject=404 Error Report - Multi Game Verse"
              className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Report this issue</span>
            </a>
          </div>

          {/* Fun Gaming Message */}
          <div className="mt-12 text-gray-500 text-sm">
            <p>💡 Pro Tip: While you're here, why not try one of our games above?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
