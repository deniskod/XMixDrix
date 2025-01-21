import { useState } from "react";
import "./App.css";

type Cell = "X" | "O" | null;

const App = () => {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState<"X" | "O" | "Draw" | null>(null);

  const handleClick = (index: number): void => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    checkWinner(newBoard);
  };

  const checkWinner = (board: Cell[]): void => {
    const winningCombinations: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        alert(`${board[a]} Wins!`);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner("Draw");
    }
  };

  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className="game">
      <h1 style={{ color: "#565656" }}>X Mix Drix</h1>
      {!winner && (
        <div className="turn">{isXTurn ? "X's Turn" : "O's Turn"}</div>
      )}
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleClick(index)}>
            {cell && (
              <img
                src={`/${cell === "X" ? "X-image.png" : "O-image.png"}`}
                alt={cell}
                className="icon"
              />
            )}
          </div>
        ))}
      </div>
      {winner && (
        <button className="reset" onClick={resetGame}>
          Play Again
        </button>
      )}
    </div>
  );
};

export default App;
