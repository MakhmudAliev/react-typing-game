import React, { useState, useEffect, useRef } from "react";

function App() {
  const REMAINING_TIME = 5;
  const [timeRemaining, setTimeRemaining] = useState(REMAINING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const textboxRef = useRef(null);

  const editText = (e) => {
    setText(e.target.value);
  };

  const countWords = () => {
    const arr = text
      .trim()
      .split(" ")
      .filter((word) => word !== "");
    setWordCount(arr.length);
  };

  const startGame = () => {
    setTimeRemaining(REMAINING_TIME);
    setText("");
    setIsTimeRunning(true);
    setWordCount(0);
    textboxRef.current.disabled = false;
    textboxRef.current.focus();
  };

  const endGame = () => {
    setTimeRemaining(REMAINING_TIME);
    setIsTimeRunning(false);
    countWords();
  };

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [isTimeRunning, timeRemaining]);

  return (
    <div>
      <h1>How fast can you type?</h1>
      <textarea
        ref={textboxRef}
        value={text}
        onChange={editText}
        disabled={!isTimeRunning}
      />
      <h4>Time remaining: {timeRemaining}</h4>
      <button onClick={startGame} disabled={isTimeRunning}>
        Start
      </button>
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;
