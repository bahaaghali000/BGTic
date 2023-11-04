import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Start from "../pages/Start";
import Choose from "../pages/Choose";

const Routing = () => {
  const [xPlaying, setXPlaying] = useState<string>("X");
  const [gameMode, setGameMode] = useState<string>("single");

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" />} />
      <Route
        path="/home"
        element={
          <Home
            turn={xPlaying}
            setTurn={setXPlaying}
            gameMode={gameMode}
            setGameMode={setGameMode}
          />
        }
      />
      <Route path="/welcome" element={<Start />} />
      <Route
        path="/choose"
        element={
          <Choose
            turn={xPlaying}
            setTurn={setXPlaying}
            gameMode={gameMode}
            setGameMode={setGameMode}
          />
        }
      />
    </Routes>
  );
};

export default Routing;
