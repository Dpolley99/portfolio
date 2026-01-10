import { useState, useEffect } from 'react';
import { RotateCcw, Lightbulb, Trophy } from 'lucide-react';

const Sudoku = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [gridSize, setGridSize] = useState(4);
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  const maxHints = 3;

  useEffect(() => {
    if (difficulty) {
      generatePuzzle();
    }
  }, [difficulty]);

  const selectDifficulty = (level) => {
    setDifficulty(level);
    setGridSize(level === 'easy' ? 4 : 9);
    setIsComplete(false);
    setMistakes(0);
    setHintsUsed(0);
  };

  const generatePuzzle = () => {
    const size = difficulty === 'easy' ? 4 : 9;
    const newSolution = generateSolution(size);
    const newBoard = createPuzzle(newSolution, size);
    
    setSolution(newSolution);
    setBoard(newBoard);
    setInitialBoard(JSON.parse(JSON.stringify(newBoard)));
    setSelectedCell(null);
  };

  const generateSolution = (size) => {
    const grid = Array(size).fill(null).map(() => Array(size).fill(0));
    fillGrid(grid, size);
    return grid;
  };

  const fillGrid = (grid, size) => {
    const boxSize = Math.sqrt(size);
    
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (grid[row][col] === 0) {
          const numbers = shuffleArray([...Array(size)].map((_, i) => i + 1));
          
          for (let num of numbers) {
            if (isValid(grid, row, col, num, size, boxSize)) {
              grid[row][col] = num;
              
              if (fillGrid(grid, size)) {
                return true;
              }
              
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const isValid = (grid, row, col, num, size, boxSize) => {
    // Check row
    for (let x = 0; x < size; x++) {
      if (grid[row][x] === num) return false;
    }
    
    // Check column
    for (let x = 0; x < size; x++) {
      if (grid[x][col] === num) return false;
    }
    
    // Check box
    const boxRow = Math.floor(row / boxSize) * boxSize;
    const boxCol = Math.floor(col / boxSize) * boxSize;
    
    for (let i = 0; i < boxSize; i++) {
      for (let j = 0; j < boxSize; j++) {
        if (grid[boxRow + i][boxCol + j] === num) return false;
      }
    }
    
    return true;
  };

  const createPuzzle = (solution, size) => {
    const puzzle = JSON.parse(JSON.stringify(solution));
    const cellsToRemove = difficulty === 'easy' ? 8 : 40;
    
    let removed = 0;
    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        removed++;
      }
    }
    
    return puzzle;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCellClick = (row, col) => {
    if (initialBoard[row][col] === 0 && !isComplete) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (num) => {
    if (!selectedCell || isComplete) return;
    
    const { row, col } = selectedCell;
    const newBoard = [...board];
    newBoard[row][col] = num;
    setBoard(newBoard);
    
    // Check if incorrect
    if (num !== 0 && solution[row][col] !== num) {
      setMistakes(prev => prev + 1);
    }
    
    // Check if complete
    checkCompletion(newBoard);
  };

  const checkCompletion = (currentBoard) => {
    const size = gridSize;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (currentBoard[row][col] === 0 || currentBoard[row][col] !== solution[row][col]) {
          return false;
        }
      }
    }
    setIsComplete(true);
    return true;
  };

  const useHint = () => {
    if (hintsUsed >= maxHints || isComplete) return;
    
    const size = gridSize;
    const emptyCells = [];
    
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }
    
    if (emptyCells.length === 0) return;
    
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = [...board];
    newBoard[randomCell.row][randomCell.col] = solution[randomCell.row][randomCell.col];
    setBoard(newBoard);
    setHintsUsed(prev => prev + 1);
    
    checkCompletion(newBoard);
  };

  const resetGame = () => {
    setDifficulty(null);
    setBoard([]);
    setSolution([]);
    setInitialBoard([]);
    setSelectedCell(null);
    setIsComplete(false);
    setMistakes(0);
    setHintsUsed(0);
  };

  if (!difficulty) {
    return (
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">Choose Difficulty</h3>
        <p className="text-muted-foreground mb-8">
          Select a difficulty level to start playing
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => selectDifficulty('easy')}
            className="w-full glass rounded-xl p-6 border border-primary/30 hover:border-primary/50 transition-all hover:-translate-y-1"
          >
            <div className="text-3xl mb-2">🟢</div>
            <h4 className="text-xl font-bold mb-2">Easy</h4>
            <p className="text-sm text-muted-foreground">4×4 Grid • Numbers 1-4</p>
          </button>
          
          <button
            onClick={() => selectDifficulty('hard')}
            className="w-full glass rounded-xl p-6 border border-highlight/30 hover:border-highlight/50 transition-all hover:-translate-y-1"
          >
            <div className="text-3xl mb-2">🔴</div>
            <h4 className="text-xl font-bold mb-2">Hard</h4>
            <p className="text-sm text-muted-foreground">9×9 Grid • Numbers 1-9</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold items-center">
            Sudoku <span className='text-sm'>- {difficulty === 'easy' ? 'Easy' : 'Hard'}</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            {gridSize}×{gridSize} Grid
          </p>
        </div>
        <button
          onClick={resetGame}
          className="flex text-xs items-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:opacity-90 transition"
        >
          <RotateCcw size={16} />
          Change Level
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-500">{mistakes}</div>
          <div className="text-xs text-muted-foreground">Mistakes</div>
        </div>
        <div className="glass rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">{hintsUsed}/{maxHints}</div>
          <div className="text-xs text-muted-foreground">Hints Used</div>
        </div>
        <div className="glass rounded-lg p-4 text-center">
          <button
            onClick={useHint}
            disabled={hintsUsed >= maxHints || isComplete}
            className={`w-full flex flex-col items-center ${
              hintsUsed >= maxHints || isComplete ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'
            }`}
          >
            <Lightbulb size={24} className="text-highlight mb-1" />
            <div className="text-xs text-muted-foreground">Get Hint</div>
          </button>
        </div>
      </div>

      {/* Victory Message */}
      {isComplete && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6 text-center animate-fade-in">
          <Trophy className="w-16 h-16 mx-auto mb-3 text-green-500" />
          <p className="text-2xl font-bold text-green-500 mb-2">🎉 Congratulations!</p>
          <p className="text-muted-foreground mb-4">
            You solved the puzzle with {mistakes} mistake{mistakes !== 1 ? 's' : ''}!
          </p>
          <button
            onClick={generatePuzzle}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            New Puzzle
          </button>
        </div>
      )}

      {/* Sudoku Grid */}
      <div className="mb-6 overflow-x-auto flex justify-center">
        <div 
          className="inline-grid gap-0 bg-border p-0.5 rounded-sm lg:rounded-lg mx-auto"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isInitial = initialBoard[rowIndex][colIndex] !== 0;
              const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
              const isIncorrect = cell !== 0 && cell !== solution[rowIndex][colIndex];
              const boxSize = Math.sqrt(gridSize);
              const rightBorder = (colIndex + 1) % boxSize === 0 && colIndex !== gridSize - 1;
              const bottomBorder = (rowIndex + 1) % boxSize === 0 && rowIndex !== gridSize - 1;
              
              return (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`
                    ${gridSize === 4 ? 'w-16 h-16 text-2xl' : 'w-9 h-9 text-md'}
                    font-bold transition-all
                    ${isInitial ? 'bg-surface cursor-not-allowed' : 'glass cursor-pointer hover:bg-primary/10'}
                    ${isSelected ? 'ring-2 ring-primary' : ''}
                    ${isIncorrect ? 'text-red-500' : isInitial ? 'text-foreground' : 'text-primary'}
                    ${rightBorder ? 'border-r-2 border-border' : ''}
                    ${bottomBorder ? 'border-b-2 border-border' : ''}
                  `}
                  disabled={isInitial || isComplete}
                >
                  {cell !== 0 ? cell : ''}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Number Pad */}
      <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
        {[...Array(gridSize)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => handleNumberInput(i + 1)}
            disabled={!selectedCell || isComplete}
            className={`glass rounded-lg p-4 text-2xl font-bold transition-all hover:bg-primary/10 ${
              !selectedCell || isComplete ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handleNumberInput(0)}
          disabled={!selectedCell || isComplete}
          className={`glass rounded-lg p-4 text-xl font-bold transition-all hover:bg-red-500/10 text-red-500 ${
            !selectedCell || isComplete ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Sudoku;