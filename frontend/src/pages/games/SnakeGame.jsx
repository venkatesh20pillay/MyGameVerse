import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, Trophy, Info } from 'lucide-react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_SPEED = 150;

const SnakeGame = () => {
  const navigate = useNavigate();
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [level, setLevel] = useState(1);
  const [showRules, setShowRules] = useState(true);
  const directionRef = useRef(INITIAL_DIRECTION);

  useEffect(() => {
    const saved = localStorage.getItem('/snake-highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(generateFood());
    setGameOver(false);
    setIsPaused(true);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setLevel(1);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const newHead = {
        x: prevSnake[0].x + directionRef.current.x,
        y: prevSnake[0].y + directionRef.current.y
      };

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true);
        const gamesPlayed = parseInt(localStorage.getItem('total-games-played') || '0');
        localStorage.setItem('total-games-played', (gamesPlayed + 1).toString());
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        const gamesPlayed = parseInt(localStorage.getItem('total-games-played') || '0');
        localStorage.setItem('total-games-played', (gamesPlayed + 1).toString());
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(generateFood());
        const newScore = score + 10;
        setScore(newScore);
        
        // Update high score
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('/snake-highscore', newScore.toString());
        }

        // Increase difficulty every 50 points
        if (newScore % 50 === 0 && speed > 50) {
          setSpeed(prev => Math.max(50, prev - 20));
          setLevel(prev => prev + 1);
        }

        return newSnake;
      }

      return newSnake.slice(0, -1);
    });
  }, [gameOver, isPaused, food, score, highScore, speed, generateFood]);

  useEffect(() => {
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [moveSnake, speed]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;

      const keyMap = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }
      };

      const newDir = keyMap[e.key];
      if (newDir) {
        e.preventDefault();
        // Prevent 180-degree turns
        if (newDir.x !== -directionRef.current.x || newDir.y !== -directionRef.current.y) {
          setDirection(newDir);
          directionRef.current = newDir;
        }
      }

      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver]);

  const handleDirectionClick = (newDir) => {
    if (gameOver) return;
    if (newDir.x !== -directionRef.current.x || newDir.y !== -directionRef.current.y) {
      setDirection(newDir);
      directionRef.current = newDir;
      if (isPaused) setIsPaused(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Games</span>
          </button>
          <button
            onClick={() => setShowRules(!showRules)}
            className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
          >
            <Info className="w-5 h-5" />
            <span className="font-medium">Rules</span>
          </button>
        </div>

        {/* Rules Panel */}
        {showRules && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Play Snake</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3"></span>
                <span>Use arrow keys or on-screen buttons to control the snake's direction</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3"></span>
                <span>Eat the red food to grow longer and earn 10 points</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3"></span>
                <span>Avoid hitting the walls or your own tail</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3"></span>
                <span>Game speed increases every 50 points (progressive difficulty)</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3"></span>
                <span>Press SPACE to pause/resume the game</span>
              </li>
            </ul>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Snake Game</h1>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
            <div className="flex space-x-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm">Score</p>
                <p className="text-2xl font-bold text-green-600">{score}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Level</p>
                <p className="text-2xl font-bold text-emerald-600">{level}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  <p className="text-gray-600 text-sm">Best</p>
                </div>
                <p className="text-2xl font-bold text-yellow-600">{highScore}</p>
              </div>
            </div>
          </div>

          {/* Game Board */}
          <div className="flex flex-col items-center">
            <div 
              className="relative bg-green-900 rounded-lg shadow-inner"
              style={{ 
                width: GRID_SIZE * CELL_SIZE, 
                height: GRID_SIZE * CELL_SIZE,
                border: '4px solid #166534'
              }}
            >
              {/* Snake */}
              {snake.map((segment, index) => {
                const isHead = index === 0;
                
                return (
                  <div
                    key={index}
                    className={`absolute transition-all rounded-full ${
                      isHead ? 'bg-green-400' : 'bg-green-500'
                    }`}
                    style={{
                      width: CELL_SIZE - 2,
                      height: CELL_SIZE - 2,
                      left: segment.x * CELL_SIZE,
                      top: segment.y * CELL_SIZE,
                      zIndex: isHead ? 10 : 5
                    }}
                  >
                    {/* Snake head eyes - always visible, no animation */}
                    {isHead && (
                      <>
                        <div
                          className="absolute w-1.5 h-1.5 bg-white rounded-full"
                          style={{ top: '6px', left: '5px' }}
                        >
                          <div className="absolute w-1 h-1 bg-black rounded-full top-0 left-0.5" />
                        </div>
                        <div
                          className="absolute w-1.5 h-1.5 bg-white rounded-full"
                          style={{ top: '6px', right: '5px' }}
                        >
                          <div className="absolute w-1 h-1 bg-black rounded-full top-0 left-0.5" />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
              
              {/* Food */}
              <div
                className="absolute bg-red-500 rounded-full animate-pulse"
                style={{
                  width: CELL_SIZE - 4,
                  height: CELL_SIZE - 4,
                  left: food.x * CELL_SIZE + 2,
                  top: food.y * CELL_SIZE + 2
                }}
              />

              {/* Game Over Overlay */}
              {gameOver && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-lg">
                  <div className="text-center text-white p-6">
                    <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
                    <p className="text-xl mb-4">Score: {score}</p>
                    {score === highScore && score > 0 && (
                      <p className="text-yellow-400 mb-4 flex items-center justify-center space-x-2">
                        <Trophy className="w-5 h-5" />
                        <span>New High Score!</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Pause Overlay */}
              {isPaused && !gameOver && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="text-white text-center">
                    <Pause className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-lg">Paused</p>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="mt-6 flex flex-col items-center space-y-4">
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  disabled={gameOver}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                  <span>{isPaused ? 'Start' : 'Pause'}</span>
                </button>
                <button
                  onClick={resetGame}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Mobile Direction Controls */}
              <div className="grid grid-cols-3 gap-2 md:hidden">
                <div></div>
                <button
                  onClick={() => handleDirectionClick({ x: 0, y: -1 })}
                  className="p-4 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                >
                  ↑
                </button>
                <div></div>
                <button
                  onClick={() => handleDirectionClick({ x: -1, y: 0 })}
                  className="p-4 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() => handleDirectionClick({ x: 0, y: 1 })}
                  className="p-4 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                >
                  ↓
                </button>
                <button
                  onClick={() => handleDirectionClick({ x: 1, y: 0 })}
                  className="p-4 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                >
                  →
                </button>
              </div>

              <p className="text-gray-600 text-sm text-center">
                Use arrow keys or on-screen buttons to move | Press SPACE to pause
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;