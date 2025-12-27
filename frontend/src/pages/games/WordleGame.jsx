import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Info, Trophy } from 'lucide-react';

const WORD_LIST = [
  'REACT', 'GAMES', 'CHESS', 'MUSIC', 'DANCE', 'BEACH', 'PHONE', 'LIGHT', 'PLANT', 'HORSE',
  'MAGIC', 'BREAD', 'CHAIR', 'PIANO', 'STONE', 'CLOUD', 'TIGER', 'SMILE', 'DREAM', 'SHARK',
  'HOUSE', 'WORLD', 'BRAIN', 'PEACE', 'EAGLE', 'SWORD', 'ROYAL', 'HAPPY', 'QUICK', 'FANCY',
  'PARTY', 'GLORY', 'OCEAN', 'FROST', 'BRAVE', 'PEARL', 'FLAME', 'STORM', 'CROWN', 'FAITH'
];

const WordleGame = () => {
  const navigate = useNavigate();
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [stats, setStats] = useState({ played: 0, won: 0, streak: 0 });
  const [showRules, setShowRules] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('/wordle-stats');
    if (saved) setStats(JSON.parse(saved));
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setTargetWord(randomWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setWon(false);
  };

  const handleKeyPress = (key) => {
    if (gameOver) return;

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        return;
      }

      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (currentGuess === targetWord) {
        setWon(true);
        setGameOver(true);
        updateStats(true);
      } else if (newGuesses.length >= 6) {
        setGameOver(true);
        updateStats(false);
      }
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
      setCurrentGuess(prev => prev + key);
    }
  };

  const updateStats = (didWin) => {
    const newStats = {
      played: stats.played + 1,
      won: stats.won + (didWin ? 1 : 0),
      streak: didWin ? stats.streak + 1 : 0
    };
    setStats(newStats);
    localStorage.setItem('/wordle-stats', JSON.stringify(newStats));
    localStorage.setItem('/wordle-highscore', newStats.won.toString());
    
    const gamesPlayed = parseInt(localStorage.getItem('total-games-played') || '0');
    localStorage.setItem('total-games-played', (gamesPlayed + 1).toString());
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') handleKeyPress('ENTER');
      else if (e.key === 'Backspace') handleKeyPress('BACKSPACE');
      else if (/^[a-zA-Z]$/.test(e.key)) handleKeyPress(e.key.toUpperCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameOver]);

  const getCellColor = (letter, position, word) => {
    if (!word) return 'bg-gray-100 border-gray-300';
    
    if (letter === targetWord[position]) {
      return 'bg-green-500 text-white border-green-500';
    } else if (targetWord.includes(letter)) {
      return 'bg-yellow-500 text-white border-yellow-500';
    } else {
      return 'bg-gray-400 text-white border-gray-400';
    }
  };

  const getKeyColor = (key) => {
    let color = 'bg-gray-300 hover:bg-gray-400';
    
    for (let guess of guesses) {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === key) {
          if (guess[i] === targetWord[i]) {
            return 'bg-green-500 text-white';
          } else if (targetWord.includes(key)) {
            color = 'bg-yellow-500 text-white';
          } else {
            color = 'bg-gray-500 text-white';
          }
        }
      }
    }
    return color;
  };

  const keyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-700 hover:text-yellow-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Games</span>
          </button>
          <button
            onClick={() => setShowRules(!showRules)}
            className="flex items-center space-x-2 text-gray-700 hover:text-yellow-600 transition-colors"
          >
            <Info className="w-5 h-5" />
            <span className="font-medium">Rules</span>
          </button>
        </div>

        {showRules && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-yellow-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Play Wordle</h3>
            <ul className="space-y-2 text-gray-600 mb-4">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 mr-3"></span>
                <span>Guess the 5-letter word in 6 tries</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 mr-3"></span>
                <span>Each guess must be a valid 5-letter word</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 mr-3"></span>
                <span>After each guess, the color of tiles will change to show how close you are</span>
              </li>
            </ul>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-green-500 text-white flex items-center justify-center font-bold rounded">W</div>
                <span className="text-sm text-gray-600">Letter is in the word and in correct position</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-yellow-500 text-white flex items-center justify-center font-bold rounded">O</div>
                <span className="text-sm text-gray-600">Letter is in the word but in wrong position</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gray-400 text-white flex items-center justify-center font-bold rounded">R</div>
                <span className="text-sm text-gray-600">Letter is not in the word</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Wordle Unlimited</h1>
            <p className="text-gray-600">Difficulty: <span className="font-semibold text-yellow-600">Medium</span></p>
          </div>

          {/* Stats */}
          <div className="flex justify-center space-x-6 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.played}</p>
              <p className="text-gray-600 text-sm">Played</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.won}</p>
              <p className="text-gray-600 text-sm">Won</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{stats.streak}</p>
              <p className="text-gray-600 text-sm">Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0}%
                </p>
              </div>
              <p className="text-gray-600 text-sm">Win Rate</p>
            </div>
          </div>

          {/* Game Board */}
          <div className="flex flex-col items-center mb-6">
            <div className={`space-y-2 ${shake ? 'animate-shake' : ''}`}>
              {[...Array(6)].map((_, rowIndex) => {
                const guess = guesses[rowIndex];
                const isCurrentRow = rowIndex === guesses.length && !gameOver;
                const displayWord = isCurrentRow ? currentGuess.padEnd(5, ' ') : (guess || '     ');
                
                return (
                  <div key={rowIndex} className="flex space-x-2">
                    {[...Array(5)].map((_, colIndex) => {
                      const letter = displayWord[colIndex];
                      const cellClass = guess 
                        ? getCellColor(letter, colIndex, guess)
                        : isCurrentRow && letter !== ' '
                        ? 'bg-white border-gray-400 animate-pop'
                        : 'bg-white border-gray-300';
                      
                      return (
                        <div
                          key={colIndex}
                          className={`w-14 h-14 border-2 rounded flex items-center justify-center text-2xl font-bold transition-all ${
                            cellClass
                          }`}
                        >
                          {letter !== ' ' && letter}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Game Over Message */}
          {gameOver && (
            <div className="text-center mb-6">
              {won ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-green-600">Congratulations! 🎉</p>
                  <p className="text-gray-600">You guessed the word in {guesses.length} tries!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-red-600">Game Over!</p>
                  <p className="text-gray-600">The word was: <span className="font-bold text-yellow-600">{targetWord}</span></p>
                </div>
              )}
              <button
                onClick={startNewGame}
                className="mt-4 flex items-center space-x-2 mx-auto px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Play Again</span>
              </button>
            </div>
          )}

          {/* Keyboard */}
          <div className="space-y-2">
            {keyboard.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-1">
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeyPress(key)}
                    className={`${
                      key === 'ENTER' || key === 'BACKSPACE' ? 'px-4' : 'w-10'
                    } h-12 rounded font-semibold text-sm transition-colors ${
                      getKeyColor(key)
                    }`}
                  >
                    {key === 'BACKSPACE' ? '⌫' : key}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-sm mt-4">
            Type or click letters to guess. Press Enter to submit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordleGame;