import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SnakeGame from './pages/games/SnakeGame';
import TicTacToe from './pages/games/TicTacToe';
import WordleGame from './pages/games/WordleGame';
import TetrisGame from './pages/games/TetrisGame';
import PacManGame from './pages/games/PacManGame';
import FlappyBirdGame from './pages/games/FlappyBirdGame';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/snake" element={<SnakeGame />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/wordle" element={<WordleGame />} />
          <Route path="/tetris" element={<TetrisGame />} />
          <Route path="/pacman" element={<PacManGame />} />
          <Route path="/flappy-bird" element={<FlappyBirdGame />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;