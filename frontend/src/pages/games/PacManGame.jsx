import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, Trophy, Info, Heart } from 'lucide-react';

const GRID_SIZE = 19;
const CELL_SIZE = 25;

const createMaze = () => {
  const maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
    [1,3,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,3,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
    [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
    [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
    [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
    [1,1,1,1,2,1,0,1,1,0,1,1,0,1,2,1,1,1,1],
    [0,0,0,0,2,0,0,1,0,0,0,1,0,0,2,0,0,0,0],
    [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
    [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
    [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
    [1,3,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,3,1],
    [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
    [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
    [1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];
  return maze;
};

const PacManGame = () => {
  const navigate = useNavigate();
  const [maze, setMaze] = useState(createMaze());
  const [pacman, setPacman] = useState({ x: 9, y: 1 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [ghosts, setGhosts] = useState([
    { x: 8, y: 9, color: 'bg-red-500' },
    { x: 9, y: 9, color: 'bg-pink-500' },
    { x: 10, y: 9, color: 'bg-cyan-500' },
    { x: 9, y: 10, color: 'bg-orange-500' }
  ]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [powerMode, setPowerMode] = useState(false);
  const directionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('/pacman-highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const resetGame = () => {
    setMaze(createMaze());
    setPacman({ x: 9, y: 1 });
    setDirection({ x: 0, y: 0 });
    directionRef.current = { x: 0, y: 0 };
    setGhosts([
      { x: 8, y: 9, color: 'bg-red-500' },
      { x: 9, y: 9, color: 'bg-pink-500' },
      { x: 10, y: 9, color: 'bg-cyan-500' },
      { x: 9, y: 10, color: 'bg-orange-500' }
    ]);
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameOver(false);
    setIsPaused(true);
    setPowerMode(false);
  };

  const canMove = (x, y) => {
    if (y < 0 || y >= maze.length || x < 0 || x >= maze[0].length) return false;
    return maze[y][x] !== 1;
  };

  const movePacman = useCallback(() => {
    if (gameOver || isPaused) return;

    const newX = pacman.x + directionRef.current.x;
    const newY = pacman.y + directionRef.current.y;

    if (canMove(newX, newY)) {
      setPacman({ x: newX, y: newY });

      const newMaze = maze.map(row => [...row]);
      if (maze[newY][newX] === 2) {
        setScore(prev => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('/pacman-highscore', newScore.toString());
          }
          return newScore;
        });
        newMaze[newY][newX] = 0;
      } else if (maze[newY][newX] === 3) {
        setScore(prev => {
          const newScore = prev + 50;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('/pacman-highscore', newScore.toString());
          }
          return newScore;
        });
        newMaze[newY][newX] = 0;
        setPowerMode(true);
        setTimeout(() => setPowerMode(false), 5000);
      }
      setMaze(newMaze);

      // Check if level complete
      const dotsLeft = newMaze.flat().filter(cell => cell === 2 || cell === 3).length;
      if (dotsLeft === 0) {
        setLevel(prev => prev + 1);
        setMaze(createMaze());
        setPacman({ x: 9, y: 1 });
      }
    }
  }, [pacman, maze, gameOver, isPaused, highScore]);

  const moveGhosts = useCallback(() => {
    if (gameOver || isPaused || powerMode) return;

    setGhosts(prevGhosts => prevGhosts.map(ghost => {
      const directions = [
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 }
      ];

      const validMoves = directions.filter(dir => 
        canMove(ghost.x + dir.x, ghost.y + dir.y)
      );

      if (validMoves.length > 0) {
        const move = validMoves[Math.floor(Math.random() * validMoves.length)];
        return {
          ...ghost,
          x: ghost.x + move.x,
          y: ghost.y + move.y
        };
      }
      return ghost;
    }));
  }, [gameOver, isPaused, powerMode, maze]);

  useEffect(() => {
    const interval = setInterval(() => {
      movePacman();
      if (Math.random() > 0.5) moveGhosts();
    }, 200 - (level - 1) * 20);
    
    return () => clearInterval(interval);
  }, [movePacman, moveGhosts, level]);

  useEffect(() => {
    const collision = ghosts.some(ghost => ghost.x === pacman.x && ghost.y === pacman.y);
    if (collision && !powerMode) {
      const newLives = lives - 1;
      if (newLives <= 0) {
        setGameOver(true);
        const gamesPlayed = parseInt(localStorage.getItem('total-games-played') || '0');
        localStorage.setItem('total-games-played', (gamesPlayed + 1).toString());
      } else {
        setLives(newLives);
        setPacman({ x: 9, y: 1 });
      }
    }
  }, [pacman, ghosts, lives, powerMode]);

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
        setDirection(newDir);
        directionRef.current = newDir;
        if (isPaused) setIsPaused(false);
      }

      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, isPaused]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Games</span>
          </button>
          <button
            onClick={() => setShowRules(!showRules)}
            className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
          >
            <Info className="w-5 h-5" />
            <span className="font-medium">Rules</span>
          </button>
        </div>

        {showRules && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-orange-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Play Pac-Man</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 mr-3"></span>
                <span>Use arrow keys to navigate Pac-Man through the maze</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 mr-3"></span>
                <span>Eat all dots to complete the level and advance</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 mr-3"></span>
                <span>Small dots = 10 points, Large dots (power pellets) = 50 points</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 mr-3"></span>
                <span>Avoid ghosts or lose a life</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 mr-3"></span>
                <span>Eat power pellets to temporarily become invincible</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 mr-3"></span>
                <span>Game speed increases with each level (progressive difficulty)</span>
              </li>
            </ul>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pac-Man</h1>
              <p className="text-gray-600">Difficulty: <span className="font-semibold text-orange-600">Hard</span></p>
            </div>
            <div className="flex space-x-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm">Score</p>
                <p className="text-2xl font-bold text-orange-600">{score}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Level</p>
                <p className="text-2xl font-bold text-yellow-600">{level}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Lives</p>
                <div className="flex space-x-1">
                  {[...Array(lives)].map((_, i) => (
                    <Heart key={i} className="w-6 h-6 text-red-500 fill-red-500" />
                  ))}
                </div>
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

          <div className="flex flex-col items-center">
            <div 
              className="relative bg-black rounded-lg shadow-2xl"
              style={{ 
                width: GRID_SIZE * CELL_SIZE, 
                height: maze.length * CELL_SIZE 
              }}
            >
              {maze.map((row, y) => (
                <div key={y} className="flex">
                  {row.map((cell, x) => (
                    <div
                      key={`${x}-${y}`}
                      className="relative"
                      style={{ width: CELL_SIZE, height: CELL_SIZE }}
                    >
                      {cell === 1 && <div className="w-full h-full bg-blue-600 border border-blue-700" />}
                      {cell === 2 && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-yellow-300 rounded-full" />
                        </div>
                      )}
                      {cell === 3 && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-yellow-300 rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {/* Pac-Man */}
              <div
                className="absolute bg-yellow-400 rounded-full transition-all duration-100"
                style={{
                  width: CELL_SIZE - 4,
                  height: CELL_SIZE - 4,
                  left: pacman.x * CELL_SIZE + 2,
                  top: pacman.y * CELL_SIZE + 2
                }}
              />

              {/* Ghosts */}
              {ghosts.map((ghost, i) => (
                <div
                  key={i}
                  className={`absolute ${powerMode ? 'bg-blue-300' : ghost.color} rounded-t-full transition-all duration-200`}
                  style={{
                    width: CELL_SIZE - 4,
                    height: CELL_SIZE - 4,
                    left: ghost.x * CELL_SIZE + 2,
                    top: ghost.y * CELL_SIZE + 2
                  }}
                />
              ))}

              {gameOver && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-lg">
                  <div className="text-center text-white p-6">
                    <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
                    <p className="text-xl mb-2">Score: {score}</p>
                    <p className="text-lg">Level: {level}</p>
                  </div>
                </div>
              )}

              {isPaused && !gameOver && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-lg">
                  <div className="text-white text-center">
                    <Pause className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-lg">Paused</p>
                  </div>
                </div>
              )}

              {powerMode && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  POWER MODE!
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col items-center space-y-4">
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  disabled={gameOver}
                  className="flex items-center space-x-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
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

              <p className="text-gray-600 text-sm text-center">
                Use arrow keys to move | Press SPACE to pause
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacManGame;
