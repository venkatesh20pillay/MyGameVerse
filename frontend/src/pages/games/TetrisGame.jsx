import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, Trophy, Info } from 'lucide-react';
import SEO from '../../components/SEO';

const ROWS = 20;
const COLS = 10;

const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: 'bg-cyan-500' },
  O: { shape: [[1, 1], [1, 1]], color: 'bg-yellow-500' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: 'bg-purple-500' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'bg-green-500' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'bg-red-500' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: 'bg-blue-600' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: 'bg-orange-500' }
};

const TetrisGame = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(Array(ROWS).fill().map(() => Array(COLS).fill(null)));
  const [currentPiece, setCurrentPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showRules, setShowRules] = useState(true);
  const [speed, setSpeed] = useState(1000);

  useEffect(() => {
    const saved = localStorage.getItem('/tetris-highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const createNewPiece = useCallback(() => {
    const pieces = Object.keys(TETROMINOES);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return {
      type: randomPiece,
      shape: TETROMINOES[randomPiece].shape,
      color: TETROMINOES[randomPiece].color
    };
  }, []);

  const resetGame = () => {
    setBoard(Array(ROWS).fill().map(() => Array(COLS).fill(null)));
    setCurrentPiece(createNewPiece());
    setPosition({ x: Math.floor(COLS / 2) - 1, y: 0 });
    setGameOver(false);
    setIsPaused(true);
    setScore(0);
    setLevel(1);
    setLines(0);
    setSpeed(1000);
  };

  useEffect(() => {
    if (!currentPiece) {
      setCurrentPiece(createNewPiece());
      setPosition({ x: Math.floor(COLS / 2) - 1, y: 0 });
    }
  }, [currentPiece, createNewPiece]);

  const checkCollision = (piece, pos) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
          if (newY >= 0 && board[newY][newX]) return true;
        }
      }
    }
    return false;
  };

  const mergePiece = () => {
    const newBoard = board.map(row => [...row]);
    currentPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
            newBoard[boardY][boardX] = currentPiece.color;
          }
        }
      });
    });
    return newBoard;
  };

  const clearLines = (newBoard) => {
    let linesCleared = 0;
    for (let y = ROWS - 1; y >= 0; y--) {
      if (newBoard[y].every(cell => cell !== null)) {
        newBoard.splice(y, 1);
        newBoard.unshift(Array(COLS).fill(null));
        linesCleared++;
        y++;
      }
    }
    
    if (linesCleared > 0) {
      const points = [0, 100, 300, 500, 800][linesCleared] * level;
      const newScore = score + points;
      const newLines = lines + linesCleared;
      const newLevel = Math.floor(newLines / 10) + 1;
      
      setScore(newScore);
      setLines(newLines);
      setLevel(newLevel);
      setSpeed(Math.max(100, 1000 - (newLevel - 1) * 100));
      
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('/tetris-highscore', newScore.toString());
      }
    }
    
    return newBoard;
  };

  const moveDown = useCallback(() => {
    if (gameOver || isPaused || !currentPiece) return;

    const newPos = { x: position.x, y: position.y + 1 };
    if (!checkCollision(currentPiece, newPos)) {
      setPosition(newPos);
    } else {
      const mergedBoard = mergePiece();
      const clearedBoard = clearLines(mergedBoard);
      setBoard(clearedBoard);
      
      const newPiece = createNewPiece();
      const startPos = { x: Math.floor(COLS / 2) - 1, y: 0 };
      
      if (checkCollision(newPiece, startPos)) {
        setGameOver(true);
        const gamesPlayed = parseInt(localStorage.getItem('total-games-played') || '0');
        localStorage.setItem('total-games-played', (gamesPlayed + 1).toString());
      } else {
        setCurrentPiece(newPiece);
        setPosition(startPos);
      }
    }
  }, [gameOver, isPaused, currentPiece, position, board]);

  useEffect(() => {
    const interval = setInterval(moveDown, speed);
    return () => clearInterval(interval);
  }, [moveDown, speed]);

  const move = (dir) => {
    if (gameOver || !currentPiece) return;
    const newPos = { x: position.x + dir, y: position.y };
    if (!checkCollision(currentPiece, newPos)) {
      setPosition(newPos);
    }
  };

  const rotate = () => {
    if (gameOver || !currentPiece) return;
    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    );
    const rotatedPiece = { ...currentPiece, shape: rotated };
    if (!checkCollision(rotatedPiece, position)) {
      setCurrentPiece(rotatedPiece);
    }
  };

  const drop = () => {
    if (gameOver || !currentPiece) return;
    let newPos = { ...position };
    while (!checkCollision(currentPiece, { x: newPos.x, y: newPos.y + 1 })) {
      newPos.y++;
    }
    setPosition(newPos);
    moveDown();
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;
      
      switch(e.key) {
        case 'ArrowLeft': e.preventDefault(); move(-1); break;
        case 'ArrowRight': e.preventDefault(); move(1); break;
        case 'ArrowDown': e.preventDefault(); moveDown(); break;
        case 'ArrowUp': e.preventDefault(); rotate(); break;
        case ' ': e.preventDefault(); drop(); break;
        case 'p': setIsPaused(prev => !prev); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, move, moveDown, rotate, drop]);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    if (currentPiece && !gameOver) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardY = position.y + y;
            const boardX = position.x + x;
            if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        });
      });
    }
    
    return displayBoard;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-8 px-4">
      <SEO 
        path="/tetris"
        title="Tetris - Play Free Online"
        description="Play Tetris online for free. Arrange falling blocks to clear lines. Classic puzzle game with progressive difficulty and high score tracking."
      />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Games</span>
          </button>
          <button
            onClick={() => setShowRules(!showRules)}
            className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-colors"
          >
            <Info className="w-5 h-5" />
            <span className="font-medium">Rules</span>
          </button>
        </div>

        {showRules && (
          <div className="bg-gray-800/50 rounded-xl p-6 mb-6 shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">How to Play Tetris</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3"></span>
                <span>Use arrow keys: Left/Right to move, Up to rotate, Down to soft drop</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3"></span>
                <span>Press SPACE for hard drop (instantly drop piece)</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3"></span>
                <span>Complete horizontal lines to clear them and earn points</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3"></span>
                <span>Clear multiple lines at once for bonus points</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3"></span>
                <span>Game speed increases every 10 lines (progressive difficulty)</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3"></span>
                <span>Game ends when pieces reach the top</span>
              </li>
            </ul>
          </div>
        )}

        <div className="bg-gray-800/50 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Tetris</h1>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-start gap-6">
            {/* Game Board */}
            <div className="flex flex-col items-center">
              <div 
                className="relative bg-gray-950 rounded-lg p-1 shadow-2xl border border-gray-700"
                style={{ width: COLS * 30 + 8, height: ROWS * 30 + 8 }}
              >
                <div className="grid gap-[1px]" style={{ gridTemplateRows: `repeat(${ROWS}, 30px)` }}>
                  {renderBoard().map((row, y) => (
                    <div key={y} className="grid gap-[1px]" style={{ gridTemplateColumns: `repeat(${COLS}, 30px)` }}>
                      {row.map((cell, x) => (
                        <div
                          key={x}
                          className={`w-[30px] h-[30px] ${cell || 'bg-gray-900'} border border-gray-800 rounded-sm`}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {gameOver && (
                  <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-lg">
                    <div className="text-center text-white p-6">
                      <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
                      <p className="text-xl mb-2">Score: {score}</p>
                      <p className="text-lg">Lines: {lines}</p>
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
              </div>

              {/* Mobile Controls */}
              <div className="grid grid-cols-3 gap-2 mt-4 md:hidden">
                <button onClick={() => move(-1)} className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">←</button>
                <button onClick={rotate} className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">↻</button>
                <button onClick={() => move(1)} className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">→</button>
                <button onClick={moveDown} className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">↓</button>
                <button onClick={drop} className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">Drop</button>
                <button onClick={() => setIsPaused(!isPaused)} className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">
                  {isPaused ? 'Play' : 'Pause'}
                </button>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="space-y-4 w-full md:w-auto">
              <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/30">
                <p className="text-gray-400 text-sm mb-1">Score</p>
                <p className="text-3xl font-bold text-purple-400">{score}</p>
              </div>
              <div className="bg-pink-500/20 rounded-xl p-4 border border-pink-500/30">
                <p className="text-gray-400 text-sm mb-1">Level</p>
                <p className="text-3xl font-bold text-pink-400">{level}</p>
              </div>
              <div className="bg-cyan-500/20 rounded-xl p-4 border border-cyan-500/30">
                <p className="text-gray-400 text-sm mb-1">Lines</p>
                <p className="text-3xl font-bold text-cyan-400">{lines}</p>
              </div>
              <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-500/30">
                <div className="flex items-center space-x-1 mb-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <p className="text-gray-400 text-sm">Best</p>
                </div>
                <p className="text-3xl font-bold text-yellow-500">{highScore}</p>
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  disabled={gameOver}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                  <span>{isPaused ? 'Start' : 'Pause'}</span>
                </button>
                <button
                  onClick={resetGame}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            ←/→ Move | ↑ Rotate | ↓ Soft Drop | SPACE Hard Drop | P Pause
          </p>
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;