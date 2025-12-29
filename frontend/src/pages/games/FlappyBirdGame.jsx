import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, RotateCcw, Trophy, Info } from 'lucide-react';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const BIRD_SIZE = 40;
const PIPE_WIDTH = 60;
const PIPE_GAP = 150;
const GRAVITY = 0.5;
const JUMP_STRENGTH = -8;

const FlappyBirdGame = () => {
  const navigate = useNavigate();
  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const gameLoopRef = useRef(null);
  const pipeTimerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('/flappy-bird-highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const jump = useCallback(() => {
    if (gameOver) return;
    if (!started) setStarted(true);
    setBirdVelocity(JUMP_STRENGTH);
  }, [gameOver, started]);

  const resetGame = () => {
    setBirdY(GAME_HEIGHT / 2);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setStarted(false);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    const handleClick = () => jump();

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
    };
  }, [jump]);

  useEffect(() => {
    if (!started || gameOver) return;

    gameLoopRef.current = setInterval(() => {
      // Update bird position
      setBirdVelocity(prev => prev + GRAVITY);
      setBirdY(prev => {
        const newY = prev + birdVelocity;
        
        // Check ground and ceiling collision
        if (newY <= 0 || newY >= GAME_HEIGHT - BIRD_SIZE) {
          setGameOver(true);
          const gamesPlayed = parseInt(localStorage.getItem('total-games-played') || '0');
          localStorage.setItem('total-games-played', (gamesPlayed + 1).toString());
          return prev;
        }
        
        return newY;
      });

      // Move pipes
      setPipes(prevPipes => {
        const newPipes = prevPipes
          .map(pipe => ({ ...pipe, x: pipe.x - 3 }))
          .filter(pipe => pipe.x > -PIPE_WIDTH);

        // Check collision
        newPipes.forEach(pipe => {
          const birdLeft = GAME_WIDTH / 2 - BIRD_SIZE / 2;
          const birdRight = GAME_WIDTH / 2 + BIRD_SIZE / 2;
          const birdTop = birdY;
          const birdBottom = birdY + BIRD_SIZE;

          if (
            birdRight > pipe.x &&
            birdLeft < pipe.x + PIPE_WIDTH &&
            (birdTop < pipe.height || birdBottom > pipe.height + PIPE_GAP)
          ) {
            setGameOver(true);
            const gamesPlayed = parseInt(localStorage.getItem('total-games-played') || '0');
            localStorage.setItem('total-games-played', (gamesPlayed + 1).toString());
          }

          // Check if bird passed pipe
          if (pipe.x + PIPE_WIDTH < GAME_WIDTH / 2 && !pipe.scored) {
            pipe.scored = true;
            setScore(prev => {
              const newScore = prev + 1;
              if (newScore > highScore) {
                setHighScore(newScore);
                localStorage.setItem('/flappy-bird-highscore', newScore.toString());
              }
              return newScore;
            });
          }
        });

        return newPipes;
      });
    }, 20);

    return () => clearInterval(gameLoopRef.current);
  }, [started, gameOver, birdVelocity, birdY, highScore]);

  useEffect(() => {
    if (!started || gameOver) return;

    pipeTimerRef.current = setInterval(() => {
      const minHeight = 50;
      const maxHeight = GAME_HEIGHT - PIPE_GAP - 50;
      const height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
      
      setPipes(prev => [...prev, { x: GAME_WIDTH, height, scored: false }]);
    }, 2000);

    return () => clearInterval(pipeTimerRef.current);
  }, [started, gameOver]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-700 hover:text-cyan-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Games</span>
          </button>
          <button
            onClick={() => setShowRules(!showRules)}
            className="flex items-center space-x-2 text-gray-700 hover:text-cyan-600 transition-colors"
          >
            <Info className="w-5 h-5" />
            <span className="font-medium">Rules</span>
          </button>
        </div>

        {showRules && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-cyan-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Play Flappy Bird</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-600 rounded-full mt-2 mr-3"></span>
                <span>Click, tap, or press SPACE/UP arrow to make the bird flap</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-600 rounded-full mt-2 mr-3"></span>
                <span>Navigate through gaps between pipes</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-600 rounded-full mt-2 mr-3"></span>
                <span>Each pipe passed = 1 point</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-600 rounded-full mt-2 mr-3"></span>
                <span>Avoid hitting pipes, ground, or ceiling</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-600 rounded-full mt-2 mr-3"></span>
                <span>Simple controls, challenging gameplay!</span>
              </li>
            </ul>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Flappy Bird</h1>
          </div>

          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Score</p>
              <p className="text-3xl font-bold text-cyan-600">{score}</p>
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
              className="relative bg-gradient-to-b from-cyan-300 to-cyan-400 rounded-xl overflow-hidden shadow-2xl cursor-pointer"
              style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
              onClick={jump}
            >
              {/* Background clouds */}
              <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-20 h-12 bg-white rounded-full opacity-70" />
                <div className="absolute top-40 right-20 w-24 h-14 bg-white rounded-full opacity-70" />
                <div className="absolute top-80 left-32 w-20 h-12 bg-white rounded-full opacity-70" />
              </div>

              {/* Ground */}
              <div className="absolute bottom-0 w-full h-20 bg-green-600" />

              {/* Bird */}
              <img
                src="https://customer-assets.emergentagent.com/job_87d90b3d-c607-4715-962e-75fc56d14e8a/artifacts/arzgq626_ChatGPT%20Image%20Dec%2029%2C%202025%2C%2011_09_31%20PM.png"
                alt="Bird"
                className="absolute transition-all duration-75 shadow-lg"
                style={{
                  width: BIRD_SIZE,
                  height: BIRD_SIZE,
                  left: GAME_WIDTH / 2 - BIRD_SIZE / 2,
                  top: birdY,
                  transform: `rotate(${Math.min(Math.max(birdVelocity * 3, -20), 45)}deg)`,
                  imageRendering: 'auto'
                }}
              />

              {/* Pipes */}
              {pipes.map((pipe, index) => (
                <div key={index}>
                  {/* Top pipe */}
                  <div
                    className="absolute bg-green-500 border-4 border-green-600 rounded-b-lg"
                    style={{
                      width: PIPE_WIDTH,
                      height: pipe.height,
                      left: pipe.x,
                      top: 0
                    }}
                  />
                  {/* Bottom pipe */}
                  <div
                    className="absolute bg-green-500 border-4 border-green-600 rounded-t-lg"
                    style={{
                      width: PIPE_WIDTH,
                      height: GAME_HEIGHT - pipe.height - PIPE_GAP - 20,
                      left: pipe.x,
                      bottom: 20
                    }}
                  />
                </div>
              ))}

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
                    <p className="text-2xl font-bold mb-2">Click or Press Space</p>
                    <p className="text-lg">to Start!</p>
                  </div>
                </div>
              )}

              {/* Score Display */}
              {started && !gameOver && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <p className="text-6xl font-bold text-white drop-shadow-lg">{score}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!started) jump();
                }}
                disabled={started && !gameOver}
                className="flex items-center space-x-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Start</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetGame();
                }}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>

            <p className="text-gray-600 text-sm mt-4 text-center">
              Click, tap, or press SPACE/UP to flap
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlappyBirdGame;