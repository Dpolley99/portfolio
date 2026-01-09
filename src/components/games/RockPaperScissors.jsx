import { useState, useEffect } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

const choices = [
  { id: 'rock', emoji: '✊', name: 'Rock', beats: 'scissors' },
  { id: 'paper', emoji: '✋', name: 'Paper', beats: 'rock' },
  { id: 'scissors', emoji: '✌️', name: 'Scissors', beats: 'paper' },
];

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [computerPreChoice, setComputerPreChoice] = useState(null); // Computer decides first
  const [result, setResult] = useState(null);
  const [scores, setScores] = useState({ player: 0, computer: 0 });
  const [gameActive, setGameActive] = useState(true);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [matchWinner, setMatchWinner] = useState(null);

  const maxRounds = 5;

  useEffect(() => {
    const saved = localStorage.getItem('rps-scores');
    if (saved) {
      const savedData = JSON.parse(saved);
      setScores(savedData.scores);
      setRoundsPlayed(savedData.roundsPlayed);
    }
    // Computer makes its choice at the start of each round
    makeComputerPreChoice();
  }, []);

  useEffect(() => {
    localStorage.setItem('rps-scores', JSON.stringify({ scores, roundsPlayed }));
  }, [scores, roundsPlayed]);

  useEffect(() => {
    if (roundsPlayed === maxRounds) {
      setGameActive(false);
      if (scores.player > scores.computer) {
        setMatchWinner('player');
      } else if (scores.computer > scores.player) {
        setMatchWinner('computer');
      } else {
        setMatchWinner('draw');
      }
    }
  }, [roundsPlayed, scores]);

  const makeComputerPreChoice = () => {
    const computerPick = choices[Math.floor(Math.random() * choices.length)];
    setComputerPreChoice(computerPick);
  };

  const determineWinner = (player, computer) => {
    if (player.id === computer.id) return 'draw';
    if (player.beats === computer.id) return 'player';
    return 'computer';
  };

  const handleChoice = (choice) => {
    if (!gameActive || showResult) return;

    setPlayerChoice(choice);
    
    // Reveal both choices simultaneously
    setTimeout(() => {
      setComputerChoice(computerPreChoice);
      const winner = determineWinner(choice, computerPreChoice);
      setResult(winner);
      setShowResult(true);

      // Update scores
      if (winner === 'player') {
        setScores(prev => ({ ...prev, player: prev.player + 1 }));
      } else if (winner === 'computer') {
        setScores(prev => ({ ...prev, computer: prev.computer + 1 }));
      }

      setRoundsPlayed(prev => prev + 1);
    }, 300);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScores({ player: 0, computer: 0 });
    setRoundsPlayed(0);
    setGameActive(true);
    setShowResult(false);
    setMatchWinner(null);
    makeComputerPreChoice();
  };

  const resetScores = () => {
    setScores({ player: 0, computer: 0 });
    setRoundsPlayed(0);
    localStorage.setItem('rps-scores', JSON.stringify({ 
      scores: { player: 0, computer: 0 }, 
      roundsPlayed: 0 
    }));
  };

  const nextRound = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setShowResult(false);
    makeComputerPreChoice(); // Computer makes new choice for next round
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Match Status */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">
          Best of {maxRounds}
        </h3>
        <p className="text-muted-foreground">
          Round {roundsPlayed} / {maxRounds}
        </p>
      </div>

      {/* Scoreboard */}
      <div className="glass rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Score</h3>
          <button
            onClick={resetScores}
            className="flex items-center gap-1 text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-primary">{scores.player}</div>
            <div className="text-sm text-muted-foreground mt-1">You</div>
          </div>
          <div className="bg-highlight/10 rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-highlight">{scores.computer}</div>
            <div className="text-sm text-muted-foreground mt-1">Computer</div>
          </div>
        </div>
      </div>

      {/* Match Winner */}
      {matchWinner && (
        <div className={`text-center mb-6 p-6 rounded-xl ${
          matchWinner === 'player' ? 'bg-green-500/10 border border-green-500/30' :
          matchWinner === 'computer' ? 'bg-red-500/10 border border-red-500/30' :
          'bg-muted/50 border border-border'
        }`}>
          <Trophy className={`w-16 h-16 mx-auto mb-3 ${
            matchWinner === 'player' ? 'text-green-500' :
            matchWinner === 'computer' ? 'text-red-500' :
            'text-muted-foreground'
          }`} />
          <p className={`text-2xl font-bold ${
            matchWinner === 'player' ? 'text-green-500' :
            matchWinner === 'computer' ? 'text-red-500' :
            'text-foreground'
          }`}>
            {matchWinner === 'player' ? '🎉 You Won the Match!' :
             matchWinner === 'computer' ? '💻 Computer Won the Match!' :
             "It's a Tie!"}
          </p>
          <button
            onClick={resetGame}
            className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Game Area */}
      {!matchWinner && (
        <>
          {/* Choices Display */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Player Choice */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Your Choice</p>
              <div className={`glass rounded-2xl p-8 h-40 flex items-center justify-center transition-all ${
                playerChoice ? 'border-2 border-primary' : 'border border-border'
              }`}>
                {playerChoice ? (
                  <div>
                    <div className="text-6xl mb-2">{playerChoice.emoji}</div>
                    <div className="text-sm font-medium">{playerChoice.name}</div>
                  </div>
                ) : (
                  <div className="text-4xl text-muted-foreground">?</div>
                )}
              </div>
            </div>

            {/* Computer Choice */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Computer Choice</p>
              <div className={`glass rounded-2xl p-8 h-40 flex items-center justify-center transition-all ${
                computerChoice ? 'border-2 border-highlight' : 'border border-border'
              }`}>
                {computerChoice ? (
                  <div>
                    <div className="text-6xl mb-2">{computerChoice.emoji}</div>
                    <div className="text-sm font-medium">{computerChoice.name}</div>
                  </div>
                ) : (
                  <div className="text-4xl text-muted-foreground">?</div>
                )}
              </div>
            </div>
          </div>

          {/* Result Message */}
          {showResult && result && (
            <div className={`text-center mb-6 p-4 rounded-xl animate-fade-in ${
              result === 'player' ? 'bg-green-500/10 text-green-500' :
              result === 'computer' ? 'bg-red-500/10 text-red-500' :
              'bg-muted/50'
            }`}>
              <p className="text-xl font-bold">
                {result === 'player' ? '🎉 You Won This Round!' :
                 result === 'computer' ? '💻 Computer Won This Round!' :
                 "It's a Draw!"}
              </p>
            </div>
          )}

          {/* Choice Buttons */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                disabled={!gameActive || showResult}
                className={`glass rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-primary/50 border border-border ${
                  !gameActive || showResult ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                } ${playerChoice?.id === choice.id ? 'border-2 border-primary' : ''}`}
              >
                <div className="text-5xl mb-2">{choice.emoji}</div>
                <div className="text-sm font-medium">{choice.name}</div>
              </button>
            ))}
          </div>

          {/* Next Round Button */}
          {showResult && gameActive && (
            <button
              onClick={nextRound}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-lg"
            >
              Next Round
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RockPaperScissors;