import React, { useState, useEffect } from 'react';
import { RotateCcw, Flag, Bomb, Trophy, Clock } from 'lucide-react';

const Minesweeper = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [board, setBoard] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [flagged, setFlagged] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stats, setStats] = useState({ easy: { wins: 0, losses: 0 }, hard: { wins: 0, losses: 0 } });
  const [flagMode, setFlagMode] = useState(false);

  const DIFFICULTIES = {
    easy: { rows: 8, cols: 8, mines: 10 },
    hard: { rows: 12, cols: 12, mines: 25 }
  };

  useEffect(() => {
    const saved = localStorage.getItem('minesweeper-stats');
    if (saved) {
      setStats(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('minesweeper-stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    let interval;
    if (isPlaying && !gameOver && !won) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameOver, won]);

  const initGame = (level) => {
    setDifficulty(level);
    const { rows, cols, mines } = DIFFICULTIES[level];
    
    const newBoard = Array(rows).fill(null).map(() => Array(cols).fill(0));
    
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      
      if (newBoard[row][col] !== 'M') {
        newBoard[row][col] = 'M';
        minesPlaced++;
      }
    }
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (newBoard[r][c] !== 'M') {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && newBoard[nr][nc] === 'M') {
                count++;
              }
            }
          }
          newBoard[r][c] = count;
        }
      }
    }
    
    setBoard(newBoard);
    setRevealed(Array(rows).fill(null).map(() => Array(cols).fill(false)));
    setFlagged(Array(rows).fill(null).map(() => Array(cols).fill(false)));
    setGameOver(false);
    setWon(false);
    setTimer(0);
    setIsPlaying(false);
  };

  const revealCell = (row, col) => {
    if (!isPlaying) setIsPlaying(true);
    
    if (revealed[row][col] || gameOver || won) return;
    
    // If in flag mode, toggle flag instead
    if (flagMode) {
      if (!revealed[row][col]) {
        const newFlagged = flagged.map(r => [...r]);
        newFlagged[row][col] = !newFlagged[row][col];
        setFlagged(newFlagged);
      }
      return;
    }
    
    // Don't reveal if flagged
    if (flagged[row][col]) return;
    
    const newRevealed = revealed.map(r => [...r]);
    
    const reveal = (r, c) => {
      if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return;
      if (newRevealed[r][c] || flagged[r][c]) return;
      
      newRevealed[r][c] = true;
      
      if (board[r][c] === 'M') {
        setGameOver(true);
        setStats(prev => ({
          ...prev,
          [difficulty]: { ...prev[difficulty], losses: prev[difficulty].losses + 1 }
        }));
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === 'M') {
              newRevealed[i][j] = true;
            }
          }
        }
        return;
      }
      
      if (board[r][c] === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            reveal(r + dr, c + dc);
          }
        }
      }
    };
    
    reveal(row, col);
    setRevealed(newRevealed);
    checkWin(newRevealed);
  };

  const toggleFlag = (row, col, e) => {
    if (e) e.preventDefault();
    if (!isPlaying) setIsPlaying(true);
    
    if (revealed[row][col] || gameOver || won) return;
    
    const newFlagged = flagged.map(r => [...r]);
    newFlagged[row][col] = !newFlagged[row][col];
    setFlagged(newFlagged);
  };

  const checkWin = (revealedBoard) => {
    const { rows, cols, mines } = DIFFICULTIES[difficulty];
    let revealedCount = 0;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (revealedBoard[r][c] && board[r][c] !== 'M') {
          revealedCount++;
        }
      }
    }
    
    const totalCells = rows * cols;
    if (revealedCount === totalCells - mines) {
      setWon(true);
      setStats(prev => ({
        ...prev,
        [difficulty]: { ...prev[difficulty], wins: prev[difficulty].wins + 1 }
      }));
    }
  };

  const resetGame = () => {
    setDifficulty(null);
    setBoard([]);
    setRevealed([]);
    setFlagged([]);
    setGameOver(false);
    setWon(false);
    setTimer(0);
    setIsPlaying(false);
    setFlagMode(false);
  };

  const resetStats = () => {
    const newStats = { easy: { wins: 0, losses: 0 }, hard: { wins: 0, losses: 0 } };
    setStats(newStats);
    localStorage.setItem('minesweeper-stats', JSON.stringify(newStats));
  };

  const getCellColor = (value) => {
    const colors = {
      1: 'text-blue-400',
      2: 'text-green-400',
      3: 'text-red-400',
      4: 'text-purple-400',
      5: 'text-yellow-400',
      6: 'text-pink-400',
      7: 'text-cyan-400',
      8: 'text-orange-400'
    };
    return colors[value] || '';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const flagsRemaining = () => {
    if (!difficulty) return 0;
    const flagCount = flagged.flat().filter(Boolean).length;
    return DIFFICULTIES[difficulty].mines - flagCount;
  };

  // Difficulty Selection Screen
  if (!difficulty) {
    return (
      <div className="flex items-center justify-center min-h-125">
        <div className="text-center max-w-md w-full">
          <Bomb className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-2">Minesweeper</h2>
          <p className="text-muted-foreground mb-8">Choose your difficulty</p>
          
          <div className="grid grid-cols-1 gap-4 mb-8">
            <button
              onClick={() => initGame('easy')}
              className="glass p-8 rounded-xl hover:bg-primary/10 transition group"
            >
              <h3 className="text-xl font-bold mb-2">Easy</h3>
              <p className="text-sm text-muted-foreground">8x8 Grid • 10 Mines</p>
            </button>
            
            <button
              onClick={() => initGame('hard')}
              className="glass p-8 rounded-xl hover:bg-highlight/10 transition group"
            >
              <h3 className="text-xl font-bold mb-2">Hard</h3>
              <p className="text-sm text-muted-foreground">12x12 Grid • 25 Mines</p>
            </button>
          </div>

          <div className="glass rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Statistics</h3>
              <button
                onClick={resetStats}
                className="flex items-center gap-1 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              >
                <RotateCcw size={12} />
                Reset
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-primary/10 rounded p-2">
                <div className="font-bold text-primary">Easy</div>
                <div className="text-xs text-muted-foreground">
                  {stats.easy.wins}W - {stats.easy.losses}L
                </div>
              </div>
              <div className="bg-highlight/10 rounded p-2">
                <div className="font-bold text-highlight">Hard</div>
                <div className="text-xs text-muted-foreground">
                  {stats.hard.wins}W - {stats.hard.losses}L
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game Board
  const cellSize = difficulty === 'easy' ? 'w-8 h-8 sm:w-10 sm:h-10 text-base sm:text-lg' : 'w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm';

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-12 gap-y-2 mb-4">
        <div className="glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center gap-2 justify-center">
          <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
          <span className="font-bold text-base sm:text-lg">{flagsRemaining()}</span>
        </div>
        
        <div className="glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center gap-2 justify-center">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <span className="font-bold text-base sm:text-lg">{formatTime(timer)}</span>
        </div>
        
        <button
          onClick={resetGame}
          className="flex items-center gap-2 justify-center bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-red-600 transition text-sm sm:text-base"
        >
          <RotateCcw size={14} className="sm:w-4 sm:h-4" />
          New Game
        </button>
      </div>

      {/* Flag Mode Toggle */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setFlagMode(!flagMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
            flagMode 
              ? 'bg-yellow-500 text-white' 
              : 'glass hover:bg-primary/10'
          }`}
        >
          <Flag className="w-5 h-5" />
          {flagMode ? 'Flag Mode: ON' : 'Flag Mode: OFF'}
        </button>
      </div>

      {(gameOver || won) && (
        <div className={`text-center mb-4 p-4 rounded-lg ${
          won ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            {won ? <Trophy className="w-6 h-6" /> : <Bomb className="w-6 h-6" />}
            <p className="text-2xl font-bold">
              {won ? '🎉 You Win!' : '💥 Game Over!'}
            </p>
          </div>
          <p className="text-sm">
            {won ? `Completed in ${formatTime(timer)}` : 'You hit a mine!'}
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <div className="glass p-2 sm:p-4 rounded-xl inline-block">
          <div className="flex flex-col gap-0.5 sm:gap-1">
            {board.map((row, r) => (
              <div key={r} className="flex gap-0.5 sm:gap-1">
                {row.map((cell, c) => (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => revealCell(r, c)}
                    onContextMenu={(e) => toggleFlag(r, c, e)}
                    className={`${cellSize} font-bold rounded transition-all flex items-center justify-center ${
                      revealed[r][c]
                        ? cell === 'M'
                          ? 'bg-red-500/30 text-red-400'
                          : 'bg-muted/30'
                        : flagged[r][c]
                        ? 'bg-yellow-500/30 hover:bg-yellow-500/40'
                        : 'bg-primary/20 hover:bg-primary/30 cursor-pointer'
                    } ${!revealed[r][c] && !flagged[r][c] ? 'shadow-md' : ''}`}
                    disabled={gameOver || won}
                  >
                    {revealed[r][c] ? (
                      cell === 'M' ? (
                        <Bomb size={difficulty === 'easy' ? 16 : 12} className="sm:w-5 sm:h-5" />
                      ) : cell === 0 ? (
                        ''
                      ) : (
                        <span className={getCellColor(cell)}>{cell}</span>
                      )
                    ) : flagged[r][c] ? (
                      <Flag size={difficulty === 'easy' ? 12 : 10} className="text-red-400 sm:w-4 sm:h-4" />
                    ) : (
                      ''
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-xs sm:text-sm text-muted-foreground">
        <p>Click to reveal • Toggle flag mode to place flags</p>
      </div>
    </div>
  );
};

export default Minesweeper;