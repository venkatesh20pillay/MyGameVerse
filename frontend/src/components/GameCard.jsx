import { Link } from 'react-router-dom';
import { Trophy, Clock } from 'lucide-react';

const GameCard = ({ title, description, icon: Icon, path, color }) => {
  const getHighScore = () => {
    const score = localStorage.getItem(`${path}-highscore`);
    return score ? parseInt(score) : 0;
  };

  return (
    <Link to={path}>
      <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
            <Icon className={`w-8 h-8 ${color}`} />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Trophy className="w-4 h-4" />
            <span>Best: {getHighScore()}</span>
          </div>
          <span className="text-indigo-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
            Play →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;