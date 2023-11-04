import { useNavigate } from "react-router-dom";
import "../styles/start.css";

import Xicon from "../assets/Line 2.png";
import Oicon from "../assets/Ellipse 1.png";

const Start: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="start">
      <div className="start-container">
        <h2 className="title">Tic Tac Toe</h2>

        <div className="container">
          <div className="icons">
            <div className="card">
              <img src={Xicon} alt="" />
            </div>

            <div className="card">
              <img src={Oicon} alt="" />
            </div>
          </div>

          <button className="btn" onClick={() => navigate("/choose")}>
            Let's play
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
