import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Trophy, Info, Users, Cpu } from 'lucide-react';

const TicTacToe = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState(null); // 'ai' or '2player'
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });
  const [showRules, setShowRules] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('/tic-tac-toe-scores');
    if (saved) setScores(JSON.parse(saved));
  }, []);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line };
      }
    }
    return null;
  };

  const minimax = (squares, depth, isMaximizing) => {
    const result = calculateWinner(squares);
    
    if (result) {
      return result.winner === 'O' ? 10 - depth : depth - 10;
    }
    
    if (squares.every(square => square !== null)) {
      return 0;
    }

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'O';
          const score = minimax(squares, depth + 1, false);
          squares[i] = null;
          maxScore = Math.max(score, maxScore);
        }
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'X';
          const score = minimax(squares, depth + 1, true);
          squares[i] = null;
          minScore = Math.min(score, minScore);
        }
      }
      return minScore;
    }
  };

  const getAIMove = (squares) => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = 'O';
        const score = minimax(squares, 0, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const handleClick = (index) => {
    if (board[index] || winner || !gameMode) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      updateScores(result.winner);
      return;
    }

    if (newBoard.every(square => square !== null)) {
      setWinner('draw');
      updateScores('draw');
      return;
    }

    setIsXNext(!isXNext);

    // AI move
    if (gameMode === 'ai' && isXNext) {
      setTimeout(() => {
        const aiMove = getAIMove(newBoard);
        if (aiMove !== null) {
          const aiBoard = [...newBoard];
          aiBoard[aiMove] = 'O';
          setBoard(aiBoard);

          const aiResult = calculateWinner(aiBoard);
          if (aiResult) {
            setWinner(aiResult.winner);
            setWinningLine(aiResult.line);
            updateScores(aiResult.winner);
          } else if (aiBoard.every(square => square !== null)) {
            setWinner('draw');
            updateScores('draw');
          } else {
            setIsXNext(true);
          }
        }
      }, 500);
    }
  };

  const updateScores = (result) => {
    const newScores = { ...scores };
    if (result === 'X') newScores.x++;
    else if (result === 'O') newScores.o++;
    else newScores.draws++;
    
    setScores(newScores);
    localStorage.setItem('/tic-tac-toe-scores', JSON.stringify(newScores));
    localStorage.setItem('/tic-tac-toe-highscore', Math.max(newScores.x, newScores.o).toString());
    
    const gamesPlayed = parseInt(localStorage.getItem('total-games-played') || '0');
    localStorage.setItem('total-games-played', (gamesPlayed + 1).toString());
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  const resetScores = () => {
    const newScores = { x: 0, o: 0, draws: 0 };
    setScores(newScores);
    localStorage.setItem('/tic-tac-toe-scores', JSON.stringify(newScores));
  };

  const selectMode = (mode) => {
    setGameMode(mode);
    resetGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Games</span>
          </button>
          <button
            onClick={() => setShowRules(!showRules)}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Info className="w-5 h-5" />
            <span className="font-medium">Rules</span>
          </button>
        </div>

        {showRules && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Play Tic-Tac-Toe</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <span>Choose between playing against AI or with a friend (2 Player mode)</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <span>Players take turns placing X's and O's on a 3x3 grid</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <span>Get three in a row (horizontally, vertically, or diagonally) to win</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <span>In AI mode, you play as X and the AI plays as O</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3"></span>
                <span>The AI uses optimal strategy and is very challenging!</span>
              </li>
            </ul>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tic-Tac-Toe</h1>
          </div>

          {!gameMode ? (
            <div className="flex flex-col items-center space-y-6 py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Choose Game Mode</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                <button
                  onClick={() => selectMode('ai')}
                  className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  <Cpu className="w-12 h-12 mb-3" />
                  <span className="text-xl font-bold">vs AI</span>
                  <span className="text-sm opacity-90 mt-2">Challenge the computer</span>
                </button>
                <button
                  onClick={() => selectMode('2player')}
                  className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  <Users className="w-12 h-12 mb-3" />
                  <span className="text-xl font-bold">2 Players</span>
                  <span className="text-sm opacity-90 mt-2">Play with a friend</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Score Board */}
              <div className="flex justify-center space-x-6 mb-6">
                <div className="text-center bg-blue-50 px-6 py-3 rounded-lg">
                  <p className="text-gray-600 text-sm">X Wins</p>
                  <p className="text-2xl font-bold text-blue-600">{scores.x}</p>
                </div>
                <div className="text-center bg-gray-50 px-6 py-3 rounded-lg">
                  <p className="text-gray-600 text-sm">Draws</p>
                  <p className="text-2xl font-bold text-gray-600">{scores.draws}</p>
                </div>
                <div className="text-center bg-red-50 px-6 py-3 rounded-lg">
                  <p className="text-gray-600 text-sm">O Wins</p>
                  <p className="text-2xl font-bold text-red-600">{scores.o}</p>
                </div>
              </div>

              {/* Status */}
              <div className="text-center mb-6">
                {winner ? (
                  <div className="text-2xl font-bold">
                    {winner === 'draw' ? (
                      <span className="text-gray-600">It's a Draw!</span>
                    ) : (
                      <span className={winner === 'X' ? 'text-blue-600' : 'text-red-600'}>
                        {winner} Wins!
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="text-xl text-gray-700">
                    Current Turn: <span className={`font-bold ${isXNext ? 'text-blue-600' : 'text-red-600'}`}>
                      {isXNext ? 'X' : 'O'}
                    </span>
                  </div>
                )}
              </div>

              {/* Game Board */}
              <div className="flex justify-center mb-6">
                <div className="grid grid-cols-3 gap-3 bg-gray-200 p-3 rounded-xl">
                  {board.map((cell, index) => (
                    <button
                      key={index}
                      onClick={() => handleClick(index)}
                      disabled={cell !== null || winner !== null}
                      className={`w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:hover:scale-100 ${
                        winningLine.includes(index) ? 'bg-yellow-100 ring-2 ring-yellow-400' : ''
                      }`}
                    >
                      <span className={`text-4xl md:text-5xl font-bold ${
                        cell === 'X' ? 'text-blue-600' : cell === 'O' ? 'text-red-600' : ''
                      }`}>
                        {cell}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={resetGame}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>New Game</span>
                </button>
                <button
                  onClick={() => setGameMode(null)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Change Mode
                </button>
                <button
                  onClick={resetScores}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Reset Scores
                </button>
              </div>

              <p className="text-center text-gray-600 text-sm mt-4">
                {gameMode === 'ai' ? 'Playing against AI' : 'Playing with friend'}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;