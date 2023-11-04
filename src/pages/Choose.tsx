import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/choose.css";

import Xicon from "../assets/Line 2.png";
import Oicon from "../assets/Ellipse 1.png";

import single from "../assets/single.png";
import multi from "../assets/multi.png";

interface IChoose {
  turn: string;
  setTurn: (turn: string) => void;
  gameMode: string;
  setGameMode: (gameMode: string) => void;
}

const Choose: React.FC<IChoose> = ({
  turn,
  setTurn,
  gameMode,
  setGameMode,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("BGTic-board");
    localStorage.removeItem("BGTic-scores");
    localStorage.setItem("BGTic-choose", JSON.stringify({ turn, gameMode }));
  }, [turn, gameMode]);

  return (
    <div className="choose ">
      <div className="choose-container">
        <div className="choose-card container">
          <h2>Choose Your Turn</h2>

          <div className="choose-turn">
            <div className="x">
              <span
                className={turn === "X" ? "active-turn" : ""}
                onClick={() => setTurn("X")}
              ></span>
              <div className="card" onClick={() => setTurn("X")}>
                <img src={Xicon} alt="" />
              </div>
            </div>

            <div className="o">
              <span
                className={turn === "O" ? "active-turn" : ""}
                onClick={() => setTurn("O")}
              ></span>
              <div className="card" onClick={() => setTurn("O")}>
                <img src={Oicon} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="choose-card container">
          <h2>Choose Game</h2>

          <div className="choose-turn">
            <div className="x">
              <span
                className={gameMode === "single" ? "active-turn" : ""}
                onClick={() => setGameMode("single")}
              ></span>
              <div className="card" onClick={() => setGameMode("single")}>
                <img src={single} alt="" />
                <h4>Single Player</h4>
              </div>
            </div>

            <div className="o">
              <span
                className={gameMode === "multi" ? "active-turn" : ""}
                onClick={() => setGameMode("multi")}
              ></span>
              <div className="card" onClick={() => setGameMode("multi")}>
                <img src={multi} alt="" />
                <h4>MULTIPLAYER</h4>
              </div>
            </div>
          </div>
        </div>
        <button className="btn" onClick={() => navigate("/home")}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Choose;
