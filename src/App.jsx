import { useState } from 'react'

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", scores: [0, 0, 0, 0, 0, 0, 0, 0, 0] }
  ]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;

    const newPlayer = {
      id: Date.now(),
      name: newPlayerName,
      scores: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    };

    setPlayers([...players, newPlayer]);
    setNewPlayerName("");
  };

  const handleAdjustScore = (playerId, holeIndex, direction) => {
    const updatedPlayers = players.map((player) => {
      if (player.id === playerId) {
        const newScores = [...player.scores];
        if (direction === "plus") {
          newScores[holeIndex] += 1;
        } else if (direction === "minus" && newScores[holeIndex] > 0) {
          newScores[holeIndex] -= 1;
        }
        return { ...player, scores: newScores };
      }
      return player;
    });
    setPlayers(updatedPlayers);
  };

  const handleNameChange = (playerId, newName) => {
    const updatedPlayers = players.map((player) => {
      if (player.id === playerId) {
        return { ...player, name: newName };
      }
      return player;
    });
    setPlayers(updatedPlayers);
  };

  const handleDeletePlayer = (playerId) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      setPlayers(players.filter((player) => player.id !== playerId));
    }
  };

  const handleResetAllScores = () => {
    if (window.confirm("Are you sure you want to reset all scores?")) {
      setPlayers(prevPlayers => prevPlayers.map(player => ({
        ...player,
        scores: Array(9).fill(0)
      })));
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center pt-10 pb-20 font-sans">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        
        <h1 className="text-3xl font-black text-center text-red-500 tracking-tight">🥏 PAR-FECT</h1>
        <p className="text-center text-xs uppercase tracking-widest text-gray-400 font-semibold mt-1 mb-6">Scorecard Companion</p>

        <form onSubmit={handleAddPlayer} className="mb-6 flex gap-2">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 text-base"
            placeholder="New Player Name"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-red-500 text-white font-bold px-5 rounded-xl active:bg-emerald-700 active:scale-95 transition-transform"
          >
            Add
          </button>
        </form>

        <div className="space-y-6">
          {players.map((player) => (
            <div key={player.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-3">
                <input
                  type="text"
                  className="font-bold text-lg text-gray-800 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-emerald-500 focus:outline-none flex-1 pb-1"
                  value={player.name}
                  onChange={(e) => handleNameChange(player.id, e.target.value)}
                />
                <button
                  onClick={() => handleDeletePlayer(player.id)}
                  className="text-gray-300 hover:text-red-500 font-bold transition-colors px-2"
                  title="Delete Player"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {player.scores.map((score, holeIndex) => (
                  <div key={holeIndex} className="flex flex-col items-center bg-white p-2 rounded-lg border border-gray-200">
                    <span className="text-xs text-gray-400 font-semibold uppercase mb-1">Hole {holeIndex + 1}</span>
                    
                    <div className="flex items-center justify-between w-full px-1">
                      <button 
                        onClick={() => handleAdjustScore(player.id, holeIndex, "minus")}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full font-bold text-gray-600 active:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="font-black text-lg text-gray-800">{score}</span>
                      <button 
                        onClick={() => handleAdjustScore(player.id, holeIndex, "plus")}
                        className="w-8 h-8 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full font-bold active:bg-emerald-200"
                      >
                        +
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
          <button className="w-full mt-8 rounded-xl p-3 bg-red-500 text-white font-bold active:bg-red-600 active:scale-95 transition-transform shadow-lg"
            onClick={handleResetAllScores}>
            Reset scores
          </button>
      </div>
    </div>
  );
}


export default App
