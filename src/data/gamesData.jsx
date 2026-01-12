import TicTacToe from '../components/games/TicTacToe';
import RockPaperScissors from '../components/games/RockPaperScissors';
import Sudoku from '../components/games/Sudoku';
import WordleGame from '../components/games/Wordle';
import Minesweeper from '../components/games/Minesweeper';

export const gamesData = [
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    description: "Classic strategy game with AI opponent.",
    icon: "❌⭕",
    component: TicTacToe,
    tags: ["Strategy", "AI-Player"],
    comingSoon: false
  },
  {
    id: "rps",
    title: "Rock Paper Scissors",
    description: "Test your luck against the computer. Best of 5 wins!",
    icon: "✊✋✌️",
    component: RockPaperScissors,
    tags: ["Chance", "AI-Player"],
    comingSoon: false
  },
  {
    id: "sudoku",
    title: "Sudoku",
    description: "Number puzzle game with multiple difficulty levels. Coming soon!",
    icon: "🔢",
    component: Sudoku,
    tags: ["Puzzle", "Logic"],
    comingSoon: false
  },
  {
    id: "wordle",
    title: "Wordle",
    description: "Guess the hidden word in six tries. A word challenge for vocabulary.",
    icon: "📝",
    component: WordleGame,
    tags: ["Puzzle", "Word Game", "Logic"],
    comingSoon: false
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    description: "Classic grid-based puzzle game focused on logical deduction and risk assessment.",
    icon: "💣",
    component: Minesweeper,
    tags: ["Puzzle", "Logic"],
    comingSoon: false
  },

];