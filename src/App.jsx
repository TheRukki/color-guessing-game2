import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [colorOptions, setColorOptions] = useState([]);
  const [targetColor, setTargetColor] = useState("");
  const [gameStatus, setGameStatus] = useState("");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const startGame = () => {
    setIsGameStarted(true);
    setScore(0);
    setGameStatus("");
    generateRandomColors();
    playMusic();
  };

  const generateRandomColors = () => {
    const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF33FF", "#33FFFF"];
    const shuffledColors = colors.sort(() => Math.random() - 0.5);
    setColorOptions(shuffledColors);
    setTargetColor(
      shuffledColors[Math.floor(Math.random() * shuffledColors.length)]
    );
  };

  const checkColorSelection = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setGameStatus("Correct!");
      generateRandomColors();
    } else {
      setGameStatus("Wrong! Try again.");
    }
  };

  const playMusic = () => {
    const audio = new Audio("song/notlike.mp3");
    audio.currentTime = 5;
    audio.play();
    setIsMusicPlaying(true);
  };

  const toggleMusic = () => {
    const audio = new Audio("song/notlike.mp3");
    audio.currentTime = 5;
    if (isMusicPlaying) {
      audio.pause();
      setIsMusicPlaying(false);
    } else {
      audio.play();
      setIsMusicPlaying(true);
    }
  };

  return (
    <div className="container">
      <h1>Color Guessing Game</h1>
      <p data-testid="gameInstructions">
        Select the correct color that matches the target color
      </p>

      {isGameStarted && (
        <>
          <div
            id="colorBox"
            style={{ backgroundColor: targetColor }}
            data-testid="colorBox"
          ></div>
          <div id="colorOptions">
            {colorOptions.map((color, index) => (
              <button
                key={index}
                style={{ backgroundColor: color }}
                onClick={() => checkColorSelection(color)}
                data-testid="colorOption"
              ></button>
            ))}
          </div>
          <div id="score" data-testid="score">
            Score: {score}
          </div>
          <div id="gameStatus" data-testid="gameStatus">
            {gameStatus}
          </div>
        </>
      )}

      <button
        id="newGameButton"
        onClick={startGame}
        data-testid="newGameButton"
      >
        Start Game
      </button>
      <div className="music-modal">
        <button className="pause-button" onClick={toggleMusic}>
          {isMusicPlaying ? "Pause Music" : "Play Music"}
        </button>
      </div>
    </div>
  );
}

export default App;
