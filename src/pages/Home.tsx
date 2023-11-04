import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import Cell from "../components/Cell";

import Xicon from "../assets/Line 2.png";
import Oicon from "../assets/Ellipse 1.png";
import Popup from "../components/Popup";

interface IHome {
  turn: string;
  setTurn: (turn: string) => void;
  gameMode: string;
  setGameMode: (gameMode: string) => void;
}

const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Home: React.FC<IHome> = ({ turn, setTurn, gameMode, setGameMode }) => {
  const [board, setBoard] = useState<number[]>(
    JSON.parse(localStorage.getItem("BGTic-board")!) || Array(9).fill(null)
  );
  const [scores, setScores] = useState(
    JSON.parse(localStorage.getItem("BGTic-scores")!) || {
      xScore: 0,
      oScore: 0,
    }
  );
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | undefined>();

  const navigate = useNavigate();

  useEffect(() => {
    setTurn(JSON.parse(localStorage.getItem("BGTic-choose")!).turn);
  }, []);

  useEffect(() => {
    setGameMode(JSON.parse(localStorage.getItem("BGTic-choose")!).gameMode);
    localStorage.setItem("BGTic-board", JSON.stringify(board));
    localStorage.setItem("BGTic-scores", JSON.stringify(scores));
  }, [board, scores]);

  const handleBoxClick = (boxIdx: number) => {
    const updatedBoard: any = [...board];
    updatedBoard[boxIdx] = turn;
    setBoard(updatedBoard);

    const winningPlayer = checkWinner(updatedBoard);

    if (winningPlayer) {
      setWinner(winningPlayer);

      setScores((prevScores: any) => ({
        ...prevScores,
        [winningPlayer === "X" ? "xScore" : "oScore"]:
          prevScores[winningPlayer === "X" ? "xScore" : "oScore"] + 1,
      }));

      setGameOver(true);
    }

    setTurn(turn === "X" ? "O" : "X");
  };

  useEffect(() => {
    if (gameMode === "single" && turn === ("X" ? "O" : "X") && !gameOver) {
      const timeoutId = setTimeout(() => {
        makeCPUMove();
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [board, turn, gameMode]);

  const makeCPUMove = () => {
    const emptyCells: any = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((index: number | null) => index !== null);

    if (emptyCells.length > 0) {
      const randomIndex: number = Math.floor(Math.random() * emptyCells.length);
      handleBoxClick(emptyCells[randomIndex]);
    }
  };

  const checkWinner = (board: null[]) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setGameOver(false);
    setWinner(undefined);
    setTurn("X");
  };
  const handleBackToHome = () => {
    handleReset();
    setScores({ xScore: 0, oScore: 0 });
    navigate("/");
    localStorage.removeItem("BGTic-board");
    localStorage.removeItem("BGTic-scores");
  };

  return (
    <div className="home">
      <div className="game-container">
        <h2 className="title">Tic Tac Toe</h2>

        <div className="scores">
          <div className="score score-o">
            <img src={Oicon} alt="" />
            <span>{scores.oScore}</span>
          </div>
          <div className="score score-x">
            <img src={Xicon} alt="" />
            <span>{scores.xScore}</span>
          </div>
        </div>

        <div className="container">
          <div className="board">
            {board.map((value: any, index: number) => (
              <Cell
                key={`box-${index}`}
                value={value}
                onClick={() =>
                  value === null && !gameOver && handleBoxClick(index)
                }
              />
            ))}
          </div>
        </div>
      </div>

      {gameOver && (
        <>
          <Popup
            winner={winner}
            scores={scores}
            handleReset={handleReset}
            handleBackToHome={handleBackToHome}
          />
          <div className="backdrop"></div>
        </>
      )}

      <button onClick={handleReset} className="btn rest-btn">
        Rest
      </button>
    </div>
  );
};

export default Home;
