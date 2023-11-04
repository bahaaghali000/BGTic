import "../styles/popup.css";

import Xicon from "../assets/Line 2.png";
import Oicon from "../assets/Ellipse 1.png";

interface IPopup {
  winner: string | undefined;
  scores: { xScore: number; oScore: number };
  handleBackToHome: () => void;
  handleReset: () => void;
}

const Popup: React.FC<IPopup> = ({
  winner,
  scores,
  handleBackToHome,
  handleReset,
}) => {
  return (
    <div className="popup">
      <h3>{winner} Is Winner</h3>

      <div className="total-scores">
        <h5>Total Score:</h5>
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
      </div>

      <div className="actions">
        <button className="popup-btn" onClick={() => handleBackToHome()}>
          Back To Home
        </button>
        <button className="popup-btn" onClick={() => handleReset()}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Popup;
