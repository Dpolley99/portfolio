import { useState } from "react";
import { Gamepad2 } from "lucide-react";
import GameModal from "@/components/GameModal";
import TicTacToe from "@/components/games/TicTacToe";
import RockPaperScissors from "@/components/games/RockPaperScissors";
import Sudoku from "@/components/games/Sudoku";

const games = [
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    description: "Classic strategy game with AI opponent. Flip a coin to decide who goes first!",
    icon: "❌⭕",
    component: TicTacToe,
    tags: ["Strategy", "AI", "2-Player"],
  },
  {
    id: "rps",
    title: "Rock Paper Scissors",
    description: "Test your luck against the computer. Best of 5 wins!",
    icon: "✊✋✌️",
    component: RockPaperScissors,
    tags: ["Chance", "Quick"],
  },
  {
    id: "sudoku",
    title: "Sudoku",
    description: "Number puzzle game with multiple difficulty levels. Coming soon!",
    icon: "🔢",
    component: Sudoku,
    tags: ["Puzzle", "Logic"],
  },
];

const Games = () => {
  const [activeGame, setActiveGame] = useState(null);

  const openGame = (game) => {
    if (!game.comingSoon) {
      setActiveGame(game);
    }
  };

  const closeGame = () => {
    setActiveGame(null);
  };

  return (
    <section id="games" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 w-200 h-120 bg-highlight/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Interactive Games
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Play some{" "}
            <span className="font-serif italic font-normal text-white">
              fun games.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            If you’ve made it this far, thank you for your time. I build these mini-games to sharpen my problem-solving skills and to practice backend logic as I move toward full-stack development. Feel free to explore and play around—I hope you enjoy them.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {games.map((game, index) => (
            <div
              key={game.id}
              className={`glass rounded-3xl p-8 border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 animate-fade-in ${
                game.comingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
              }`}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
              onClick={() => openGame(game)}
            >
              {/* Game Icon */}
              <div className="text-6xl mb-4 text-center">
                {game.icon}
              </div>

              {/* Game Title */}
              <h3 className="text-xl font-bold mb-3 text-center">
                {game.title}
                {game.comingSoon && (
                  <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </h3>

              {/* Game Description */}
              <p className="text-muted-foreground text-sm mb-4 text-center">
                {game.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-surface px-3 py-1 rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Play Button */}
              {!game.comingSoon && (
                <div className="mt-6 text-center">
                  <button className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium">
                    <Gamepad2 className="w-5 h-5" />
                    Play Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Game Modal */}
      {activeGame && (
        <GameModal
          isOpen={!!activeGame}
          onClose={closeGame}
          title={activeGame.title}
        >
          {activeGame.component && <activeGame.component />}
        </GameModal>
      )}
    </section>
  );
};

export default Games;