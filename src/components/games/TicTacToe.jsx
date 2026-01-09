import React, { useState, useEffect } from 'react';
import { RotateCcw, Coins } from 'lucide-react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ wins: 0, losses: 0, draws: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [computerSymbol, setComputerSymbol] = useState(null);
  const [showCoinFlip, setShowCoinFlip] = useState(true);
  const [coinFlipping, setCoinFlipping] = useState(false);
  const [coinResult, setCoinResult] = useState(null);
  const [playerChoice, setPlayerChoice] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('tictactoe-scores');
    if (saved) {
      setScores(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tictactoe-scores', JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    if (!isPlayerTurn && !winner && !gameOver && playerSymbol && computerSymbol) {
      setTimeout(() => makeComputerMove(board), 500);
    }
  }, [isPlayerTurn, winner, gameOver, playerSymbol, computerSymbol]);

  const flipCoin = (choice) => {
    setPlayerChoice(choice);
    setCoinFlipping(true);
    
    setTimeout(() => {
      const result = Math.random() < 0.5 ? 'heads' : 'tails';
      setCoinResult(result);
      setCoinFlipping(false);
      
      setTimeout(() => {
        const playerWon = result === choice;
        if (playerWon) {
          setPlayerSymbol('X');
          setComputerSymbol('O');
          setIsPlayerTurn(true);
        } else {
          setPlayerSymbol('O');
          setComputerSymbol('X');
          setIsPlayerTurn(false);
        }
        setShowCoinFlip(false);
      }, 1500);
    }, 1500);
  };

  const checkWinner = (currentBoard) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }

    if (currentBoard.every(cell => cell !== null)) {
      return 'draw';
    }

    return null;
  };

  const makeComputerMove = (currentBoard) => {
    if (checkWinner(currentBoard) || currentBoard.every(cell => cell !== null)) return;

    let move = findWinningMove(currentBoard, computerSymbol);
    
    if (move === -1) {
      move = findWinningMove(currentBoard, playerSymbol);
    }
    
    if (move === -1 && currentBoard[4] === null) {
      move = 4;
    }
    
    if (move === -1) {
      const corners = [0, 2, 6, 8];
      const availableCorners = corners.filter(i => currentBoard[i] === null);
      if (availableCorners.length > 0) {
        move = availableCorners[Math.floor(Math.random() * availableCorners.length)];
      }
    }
    
    if (move === -1) {
      const available = currentBoard.map((cell, i) => cell === null ? i : null).filter(i => i !== null);
      move = available[Math.floor(Math.random() * available.length)];
    }

    const newBoard = [...currentBoard];
    newBoard[move] = computerSymbol;
    setBoard(newBoard);
    
    const result = checkWinner(newBoard);
    if (result) {
      handleGameEnd(result);
    } else {
      setIsPlayerTurn(true);
    }
  };

  const findWinningMove = (currentBoard, player) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      const values = [currentBoard[a], currentBoard[b], currentBoard[c]];
      const playerCount = values.filter(v => v === player).length;
      const emptyCount = values.filter(v => v === null).length;

      if (playerCount === 2 && emptyCount === 1) {
        if (currentBoard[a] === null) return a;
        if (currentBoard[b] === null) return b;
        if (currentBoard[c] === null) return c;
      }
    }
    return -1;
  };

  const handleCellClick = (index) => {
    if (board[index] || !isPlayerTurn || winner || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const result = checkWinner(newBoard);
    if (result) {
      handleGameEnd(result);
    }
  };

  const handleGameEnd = (result) => {
    setWinner(result);
    setGameOver(true);
    
    if (result === playerSymbol) {
      setScores(prev => ({ ...prev, wins: prev.wins + 1 }));
    } else if (result === computerSymbol) {
      setScores(prev => ({ ...prev, losses: prev.losses + 1 }));
    } else if (result === 'draw') {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setGameOver(false);
    setPlayerSymbol(null);
    setComputerSymbol(null);
    setShowCoinFlip(true);
    setCoinFlipping(false);
    setCoinResult(null);
    setPlayerChoice(null);
    setIsPlayerTurn(false);
  };

  const resetScores = () => {
    setScores({ wins: 0, losses: 0, draws: 0 });
    localStorage.setItem('tictactoe-scores', JSON.stringify({ wins: 0, losses: 0, draws: 0 }));
  };

  if (showCoinFlip) {
    return (
      <div className="flex items-center justify-center min-h-125">
        <div className="text-center max-w-md w-full">
          <p className="text-muted-foreground mb-8">Let's flip a coin to decide who goes first!</p>
          
          <div className="flex flex-col items-center">
            {!coinFlipping && !coinResult && (
              <>
                <Coins className="w-24 h-24 text-primary mb-6" />
                <p className="text-lg mb-6">Choose heads or tails:</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => flipCoin('heads')}
                    className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition shadow-lg text-lg"
                  >
                    Heads
                  </button>
                  <button
                    onClick={() => flipCoin('tails')}
                    className="bg-highlight text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition shadow-lg text-lg"
                  >
                    Tails
                  </button>
                </div>
              </>
            )}
            
            {coinFlipping && (
              <div className="text-center">
                <div className="animate-bounce mb-4">
                  <Coins className="w-32 h-32 text-primary animate-spin" />
                </div>
                <p className="text-xl">Flipping coin...</p>
              </div>
            )}
            
            {!coinFlipping && coinResult && (
              <div className="text-center">
                <Coins className="w-32 h-32 text-primary mb-4" />
                <p className="text-2xl font-bold mb-2">
                  Result: {coinResult.toUpperCase()}
                </p>
                <p className={`text-xl ${coinResult === playerChoice ? 'text-green-500' : 'text-red-500'}`}>
                  {coinResult === playerChoice ? '🎉 You won! You go first with X' : '💻 Computer won! Computer goes first with X'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <p className="text-center text-muted-foreground mb-6">
        You are <span className="font-bold text-primary">{playerSymbol}</span>, Computer is <span className="font-bold text-highlight">{computerSymbol}</span>
      </p>
      
      <div className="glass rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Scoreboard</h3>
          <button
            onClick={resetScores}
            className="flex items-center gap-1 text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-green-500/10 rounded p-2">
            <div className="text-2xl font-bold text-green-500">{scores.wins}</div>
            <div className="text-xs text-muted-foreground">Wins</div>
          </div>
          <div className="bg-red-500/10 rounded p-2">
            <div className="text-2xl font-bold text-red-500">{scores.losses}</div>
            <div className="text-xs text-muted-foreground">Losses</div>
          </div>
          <div className="bg-muted/50 rounded p-2">
            <div className="text-2xl font-bold">{scores.draws}</div>
            <div className="text-xs text-muted-foreground">Draws</div>
          </div>
        </div>
      </div>

      {winner && (
        <div className={`text-center mb-4 p-3 rounded-lg ${
          winner === playerSymbol ? 'bg-green-500/10 text-green-500' :
          winner === computerSymbol ? 'bg-red-500/10 text-red-500' :
          'bg-muted/50'
        }`}>
          <p className="text-xl font-bold">
            {winner === playerSymbol ? '🎉 You Win!' : winner === computerSymbol ? '💻 Computer Wins!' : "It's a Draw!"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-6">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            className={`aspect-square text-5xl font-bold rounded-xl transition-all ${
              cell === 'X' ? 'bg-red-500/20 text-red-500' :
              cell === 'O' ? 'bg-blue-500/20 text-blue-500' :
              'glass hover:bg-primary/10'
            } ${!cell && isPlayerTurn && !gameOver ? 'cursor-pointer' : 'cursor-not-allowed'} shadow-md`}
            disabled={!isPlayerTurn || gameOver || cell !== null}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-lg"
      >
        New Game (Flip Coin Again)
      </button>
    </div>
  );
};

export default TicTacToe;