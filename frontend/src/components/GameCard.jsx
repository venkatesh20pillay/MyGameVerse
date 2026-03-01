import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const GameCard = ({ title, description, icon: Icon, path, color }) => {
  const getHighScore = () => {
    const score = localStorage.getItem(`${path}-highscore`);
    return score ? parseInt(score) : 0;
  };

  return (
    <Link to={path} aria-label={`Play ${title} - ${description}`}>
      <article className="group relative bg-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 border border-gray-700 hover:border-cyan-500/50 hover:-translate-y-1 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gray-700/50 group-hover:scale-110 transition-transform`} role="img" aria-label={`${title} icon`}>
            <Icon className={`w-8 h-8 ${color}`} aria-hidden="true" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <Trophy className="w-4 h-4 text-yellow-500" aria-hidden="true" />
            <span>Best: {getHighScore()}</span>
          </div>
          <span className="text-cyan-400 font-medium text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true">
            Play →
          </span>
        </div>
      </article>
    </Link>
  );
};

export default GameCard;