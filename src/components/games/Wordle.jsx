import { useState, useEffect, useCallback } from 'react';
import { RotateCcw, HelpCircle, X } from 'lucide-react';
import { WORD_LIST } from "../Wordlist";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
];

const WordleGame = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState('playing');
  const [letterStates, setLetterStates] = useState({});
  const [showHelp, setShowHelp] = useState(false);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setTargetWord(randomWord);
  };

  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setLetterStates({});
    setError('');
    startNewGame();
  };

  const getLetterState = (letter, index, guess) => {
    if (targetWord[index] === letter) return 'correct';
    if (targetWord.includes(letter)) return 'present';
    return 'absent';
  };

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH) {
      setError('Not enough letters');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setError('');
    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    const newLetterStates = { ...letterStates };
    for (let i = 0; i < WORD_LENGTH; i++) {
      const letter = currentGuess[i];
      const state = getLetterState(letter, i, currentGuess);
      
      if (!newLetterStates[letter] || 
          (state === 'correct') ||
          (state === 'present' && newLetterStates[letter] === 'absent')) {
        newLetterStates[letter] = state;
      }
    }
    setLetterStates(newLetterStates);

    if (currentGuess === targetWord) {
      setGameStatus('won');
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameStatus('lost');
    }

    setCurrentGuess('');
  }, [currentGuess, guesses, letterStates, targetWord]);

  const handleKeyPress = useCallback((key) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'BACK' || key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
      setError('');
    } else if (currentGuess.length < WORD_LENGTH && /^[A-Z]$/.test(key)) {
      setCurrentGuess(prev => prev + key);
      setError('');
    }
  }, [currentGuess, gameStatus, submitGuess]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (key === 'ENTER') handleKeyPress('ENTER');
      else if (key === 'BACKSPACE') handleKeyPress('BACK');
      else if (/^[A-Z]$/.test(key)) handleKeyPress(key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  const getKeyClass = (key) => {
    const state = letterStates[key];
    if (state === 'correct') return 'bg-green-600 text-white border-green-600';
    if (state === 'present') return 'bg-yellow-600 text-white border-yellow-600';
    if (state === 'absent') return 'bg-gray-700 text-gray-400 border-gray-700';
    return 'bg-white/10 hover:bg-white/20 text-white border-white/20';
  };

  const getTileClass = (letter, index, rowIndex) => {
    const isSubmitted = rowIndex < guesses.length;
    
    if (!isSubmitted) {
      return letter ? 'border-white/40 scale-105' : 'border-white/20';
    }

    const state = getLetterState(letter, index, guesses[rowIndex]);
    
    if (state === 'correct') return 'wordle-flip bg-green-600 border-green-600';
    if (state === 'present') return 'wordle-flip bg-yellow-600 border-yellow-600';
    return 'wordle-flip bg-gray-700 border-gray-700';
  };

  const getTileDelay = (colIndex) => {
    return `${colIndex * 100}ms`;
  };

  return (
    <div className="bg-radial from-blue-900 to-black flex items-center justify-center px-2 py-4">
      <div className="max-w-lg w-full flex flex-col max-h-screen py-4">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-4 mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white">WORDLE</h1>
            <button
              onClick={() => setShowHelp(true)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
            >
              <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 p-2 bg-red-500/20 border border-red-500/40 rounded-lg text-red-300 text-center text-sm font-medium">
            {error}
          </div>
        )}

        {/* Game Board */}
        <div className={shake ? 'wordle-shake mb-4' : 'mb-4'}>
          <div className="flex flex-col gap-1.5 md:gap-2">
            {[...Array(MAX_GUESSES)].map((_, rowIndex) => {
              const guess = guesses[rowIndex] || '';
              const displayWord = rowIndex === guesses.length ? currentGuess : guess;
              
              return (
                <div key={rowIndex} className="flex gap-1.5 md:gap-2 justify-center">
                  {[...Array(WORD_LENGTH)].map((_, colIndex) => {
                    const letter = displayWord[colIndex] || '';
                    
                    return (
                      <div
                        key={colIndex}
                        className={`
                          w-12 h-12 md:w-14 md:h-14 border-2 rounded-lg
                          flex items-center justify-center
                          text-xl md:text-2xl font-bold text-white
                          transition-all duration-200
                          ${getTileClass(letter, colIndex, rowIndex)}
                        `}
                        style={{ animationDelay: getTileDelay(colIndex) }}
                      >
                        {letter}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Game Status */}
        {gameStatus !== 'playing' && (
          <div className="mb-4 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-center">
            <p className="text-xl md:text-2xl font-bold text-white mb-1">
              {gameStatus === 'won' ? '🎉 You Won!' : '😔 Game Over'}
            </p>
            <p className="text-sm md:text-base text-gray-300 mb-3">
              The word was: <span className="font-bold text-green-400">{targetWord}</span>
            </p>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
          </div>
        )}

        {/* Keyboard */}
        <div className="space-y-1.5 md:space-y-2 mt-auto">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1 justify-center">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  disabled={gameStatus !== 'playing'}
                  className={`
                    ${key === 'ENTER' || key === 'BACK' ? 'px-2 md:px-4 text-xs md:text-sm' : 'w-8 md:w-10 text-sm'} 
                    h-8 md:h-12
                    rounded-lg font-bold
                    transition-all duration-200
                    border-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    active:scale-95
                    ${getKeyClass(key)}
                  `}
                >
                  {key === 'BACK' ? '←' : key}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Reset Button */}
        {gameStatus === 'playing' && (
          <div className="mt-3 text-center">
            <button
              onClick={resetGame}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg font-medium transition-colors border border-white/20 flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-3 h-3" />
              New Game
            </button>
          </div>
        )}
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-white/20 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">How to Play</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p>Guess the WORDLE in 6 tries.</p>
              
              <div>
                <p className="font-semibold text-white mb-2">Rules:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Each guess must be a 5-letter word</li>
                  <li>The color of the tiles will change to show how close your guess was</li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold text-white mb-2">Examples:</p>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      <div className="w-10 h-10 bg-green-600 border-2 border-green-600 rounded flex items-center justify-center text-white font-bold">W</div>
                      <div className="w-10 h-10 bg-gray-700 border-2 border-gray-700 rounded flex items-center justify-center text-white font-bold">O</div>
                      <div className="w-10 h-10 bg-gray-700 border-2 border-gray-700 rounded flex items-center justify-center text-white font-bold">R</div>
                      <div className="w-10 h-10 bg-gray-700 border-2 border-gray-700 rounded flex items-center justify-center text-white font-bold">D</div>
                      <div className="w-10 h-10 bg-gray-700 border-2 border-gray-700 rounded flex items-center justify-center text-white font-bold">S</div>
                    </div>
                    <p className="text-sm"><span className="text-green-400 font-semibold">W</span> is in the word and in the correct spot</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      <div className="w-10 h-10 bg-gray-700 border-2 border-gray-700 rounded flex items-center justify-center text-white font-bold">P</div>
                      <div className="w-10 h-10 bg-yellow-600 border-2 border-yellow-600 rounded flex items-center justify-center text-white font-bold">L</div>
                      <div className="w-10 h-10 bg-gray-700 border-2 border-gray-700 rounded flex items-center justify-center text-white font-bold">A</div>
                      <div className="w-10 h-10 bg-gray-700 border-2 border-gray-700 rounded flex items-center justify-center text-white font-bold">N</div>
                      <div className="w-10 h-10 bg-gray-700 border-2 border-gray-700 rounded flex items-center justify-center text-white font-bold">T</div>
                    </div>
                    <p className="text-sm"><span className="text-yellow-400 font-semibold">L</span> is in the word but in the wrong spot</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      <div className="w-10 h-10 bg-gray-700 border-2 border-gray-700 rounded flex items-center justify-center text-white font-bold">V</div>
                      <div className="w-10 h-10 bg-gray-700 border-2 border-gray-700 rounded flex items-center justify-center text-white font-bold">A</div>
                      <div className="w-10 h-10 bg-gray-700 border-2 border-gray-700 rounded flex items-center justify-center text-white font-bold">G</div>
                      <div className="w-10 h-10 bg-gray-700 border-2 border-gray-700 rounded flex items-center justify-center text-white font-bold">U</div>
                      <div className="w-10 h-10 bg-gray-700 border-2 border-gray-700 rounded flex items-center justify-center text-white font-bold">E</div>
                    </div>
                    <p className="text-sm"><span className="text-gray-400 font-semibold">U</span> is not in the word in any spot</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordleGame;