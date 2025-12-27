import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, RotateCcw, Trophy, Info, X } from 'lucide-react';

const FRUITS = ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🥝'];
const BOMB = '💣';

const FruitNinjaGame = () => {
  const navigate = useNavigate();
  const [fruits, setFruits] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [slashLines, setSlashLines] = useState([]);
  const [combo, setCombo] = useState(0);
  const canvasRef = useRef(null);
  const spawnTimerRef = useRef(null);
  const comboTimerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('/fruit-ninja-highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const resetGame = () => {
    setFruits([]);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setStarted(false);
    setSlashLines([]);
    setCombo(0);
  };

  const spawnFruit = () => {
    const isBomb = Math.random() < 0.2;
    const fruit = {
      id: Date.now() + Math.random(),
      icon: isBomb ? BOMB : FRUITS[Math.floor(Math.random() * FRUITS.length)],
      isBomb,
      x: Math.random() * 80 + 10,
      y: 100,
      velocityY: -(Math.random() * 8 + 10),
      velocityX: (Math.random() - 0.5) * 4,
      rotation: Math.random() * 360,
      sliced: false
    };
    setFruits(prev => [...prev, fruit]);
  };

  useEffect(() => {
    if (!started || gameOver) return;

    spawnTimerRef.current = setInterval(() => {
      spawnFruit();
    }, 1000);

    const animationInterval = setInterval(() => {
      setFruits(prevFruits => {
        const newFruits = prevFruits
          .map(fruit => ({
            ...fruit,
            y: fruit.y + fruit.velocityY,
            x: fruit.x + fruit.velocityX,
            velocityY: fruit.velocityY + 0.5,
            rotation: fruit.rotation + 5
          }))
          .filter(fruit => {
            if (fruit.sliced) return false;
            if (fruit.y > 100) {
              if (!fruit.isBomb) {
                setLives(prev => {
                  const newLives = prev - 1;
                  if (newLives <= 0) {
                    setGameOver(true);
                    const gamesPlayed = parseInt(localStorage.getItem('total-games-played') || '0');
                    localStorage.setItem('total-games-played', (gamesPlayed + 1).toString());
                  }
                  return newLives;
                });
              }
              return false;
            }
            return true;
          });
        return newFruits;
      });
    }, 30);

    return () => {
      clearInterval(spawnTimerRef.current);
      clearInterval(animationInterval);
    };
  }, [started, gameOver]);

  const sliceFruit = (fruitId) => {
    setFruits(prevFruits => {
      const fruit = prevFruits.find(f => f.id === fruitId);
      if (!fruit || fruit.sliced) return prevFruits;

      if (fruit.isBomb) {
        setGameOver(true);
        const gamesPlayed = parseInt(localStorage.getItem('total-games-played') || '0');
        localStorage.setItem('total-games-played', (gamesPlayed + 1).toString());
        return prevFruits;
      }

      setScore(prev => {
        const points = 10 + (combo * 5);
        const newScore = prev + points;
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('/fruit-ninja-highscore', newScore.toString());
        }
        return newScore;
      });

      setCombo(prev => prev + 1);
      
      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => setCombo(0), 1000);

      return prevFruits.map(f => 
        f.id === fruitId ? { ...f, sliced: true } : f
      );
    });
  };

  const handleMouseMove = (e) => {
    if (!started || gameOver) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setSlashLines(prev => [...prev.slice(-5), { x, y, id: Date.now() }]);

    fruits.forEach(fruit => {
      if (!fruit.sliced) {
        const distance = Math.sqrt(
          Math.pow(fruit.x - x, 2) + Math.pow(fruit.y - y, 2)
        );
        if (distance < 8) {
          sliceFruit(fruit.id);
        }
      }
    });
  };

  const handleTouchMove = (e) => {
    if (!started || gameOver) return;
    e.preventDefault();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;

    setSlashLines(prev => [...prev.slice(-5), { x, y, id: Date.now() }]);

    fruits.forEach(fruit => {
      if (!fruit.sliced) {
        const distance = Math.sqrt(
          Math.pow(fruit.x - x, 2) + Math.pow(fruit.y - y, 2)
        );
        if (distance < 8) {
          sliceFruit(fruit.id);
        }
      }
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSlashLines(prev => prev.slice(1));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Games</span>
          </button>
          <button
            onClick={() => setShowRules(!showRules)}
            className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
          >
            <Info className="w-5 h-5" />
            <span className="font-medium">Rules</span>
          </button>
        </div>

        {showRules && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-red-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Play Fruit Ninja</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-3"></span>
                <span>Swipe across fruits to slice them (mouse or touch)</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-3"></span>
                <span>Each fruit sliced = 10 points + combo bonus</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-3"></span>
                <span>DO NOT slice bombs - instant game over!</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-3"></span>
                <span>You lose a life if a fruit falls without being sliced</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-3"></span>
                <span>Build combos by slicing fruits quickly in succession</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-3"></span>
                <span>Test your reflexes and accuracy!</span>
              </li>
            </ul>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Fruit Ninja</h1>
          </div>

          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Score</p>
              <p className="text-3xl font-bold text-red-600">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Lives</p>
              <div className="flex space-x-1 justify-center">
                {[...Array(lives)].map((_, i) => (
                  <span key={i} className="text-2xl">❤️</span>
                ))}
                {[...Array(3 - lives)].map((_, i) => (
                  <span key={i} className="text-2xl opacity-30">❤️</span>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <p className="text-gray-600 text-sm">Best</p>
              </div>
              <p className="text-3xl font-bold text-yellow-600">{highScore}</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              ref={canvasRef}
              className="relative bg-gradient-to-b from-orange-100 to-yellow-100 rounded-xl overflow-hidden shadow-2xl cursor-crosshair"
              style={{ width: '100%', maxWidth: 600, height: 500 }}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onClick={() => !started && !gameOver && setStarted(true)}
            >
              {/* Slash trail */}
              {slashLines.length > 1 && (
                <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                  <polyline
                    points={slashLines.map(line => `${line.x}%,${line.y}%`).join(' ')}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              {/* Fruits */}
              {fruits.map(fruit => (
                <div
                  key={fruit.id}
                  className="absolute text-5xl transition-transform cursor-pointer select-none"
                  style={{
                    left: `${fruit.x}%`,
                    top: `${fruit.y}%`,
                    transform: `translate(-50%, -50%) rotate(${fruit.rotation}deg)`,
                    filter: fruit.sliced ? 'blur(2px) opacity(0.5)' : 'none'
                  }}
                >
                  {fruit.icon}
                </div>
              ))}

              {/* Combo indicator */}
              {combo > 1 && started && !gameOver && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-white px-4 py-2 rounded-full font-bold text-xl animate-pulse">
                  {combo}x COMBO!
                </div>
              )}

              {/* Game Over Overlay */}
              {gameOver && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <h2 className="text-4xl font-bold mb-2">Game Over!</h2>
                    <p className="text-2xl mb-4">Score: {score}</p>
                    {score === highScore && score > 0 && (
                      <p className="text-yellow-400 mb-4 flex items-center justify-center space-x-2">
                        <Trophy className="w-6 h-6" />
                        <span>New High Score!</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Start Screen */}
              {!started && !gameOver && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <Play className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-2xl font-bold mb-2">Click to Start!</p>
                    <p className="text-lg">Swipe to slice fruits</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setStarted(true)}
                disabled={started && !gameOver}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Start</span>
              </button>
              <button
                onClick={resetGame}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>

            <p className="text-gray-600 text-sm mt-4 text-center">
              Move your mouse/finger to slice fruits | Avoid bombs!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FruitNinjaGame;