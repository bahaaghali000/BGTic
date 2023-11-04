import "../styles/cell.css";

import Xicon from "../assets/Group 2.png";
import Oicon from "../assets/Group 1.png";

interface ICell {
  value: null | string;
  onClick: () => void;
}

const Cell: React.FC<ICell> = ({ value, onClick }) => {
  return (
    <button className="cell" onClick={onClick}>
      {value && <img src={value === "X" ? Xicon : Oicon} alt="" />}
    </button>
  );
};

export default Cell;
