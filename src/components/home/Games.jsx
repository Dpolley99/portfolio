import { useState } from "react";
import { Gamepad2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import GameModal from "@/components/GameModal";
import { gamesData } from "@/data/gamesData";

const Games = () => {
  const [activeGame, setActiveGame] = useState(null);

  // Show only last 2 games
  const featuredGames = gamesData.slice(0, 2);

  const openGame = (game) => {
    if (!game.comingSoon) {
      setActiveGame(game);
    }
  };

  const closeGame = () => {
    setActiveGame(null);
  };

  return (
    <section id="games" className="py-32 relative">
      <div className="absolute top-1/2 left-1/2 w-150 h-120 bg-highlight/7 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

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
            Hey... If you've made it this far, let me take a moment and thank you for visiting. I build these mini-games to sharpen my problem-solving skills and to practice backend logic as I aspire to move towards full-stack development soon. Feel free to explore and play around—I hope you enjoy them.
          </p>
        </div>

        {/* Games Grid */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {/* Featured Games */}
          {featuredGames.map((game, index) => (
            <div
              key={game.id}
              className={`glass rounded-3xl p-8 border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 lg:hover:scale-102 animate-fade-in ${
                game.comingSoon ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              }`}
              style={{ animationDelay: `${(index + 3) * 100}ms`, width: "330px", height: "330px" }}
              onClick={() => openGame(game)}
            >
              <div className="text-6xl mb-4 text-center">
                {game.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-center justify-items-center">
                {game.title}
                {game.comingSoon && (
                  <span className="m-2 text-xs flex justify-center max-w-30 bg-primary/20 text-primary px-3 py-2 rounded-full">
                    Coming Soon
                  </span>
                )}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 text-center">
                {game.description}
              </p>
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

          {/* See All Games Card */}
          <Link to="/games">
            <div
              className="glass rounded-3xl p-8 border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 lg:hover:scale-102 animate-fade-in cursor-pointer flex flex-col items-center justify-center"
              style={{ animationDelay: "500ms", width: "330px", height: "330px" }}
            >
              <Gamepad2 className="w-20 h-20 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-center">
                See All Games
              </h3>
              <p className="text-muted-foreground text-sm mb-6 text-center">
                Explore all {gamesData.length} games in my collection
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all duration-300">
                View All
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </Link>
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