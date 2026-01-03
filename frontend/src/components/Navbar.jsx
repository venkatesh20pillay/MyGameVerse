import { Link, useNavigate } from 'react-router-dom';
import { Home, Info, Shield, Gamepad2 } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Gamepad2 className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Multi Game Verse
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-1 text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center space-x-1 text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link 
              to="/privacy" 
              className="flex items-center space-x-1 text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span>Privacy</span>
            </Link>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => navigate('/')}
          >
            <Home className="w-6 h-6 text-gray-300" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;