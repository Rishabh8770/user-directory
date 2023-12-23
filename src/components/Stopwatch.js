import React, { useState, useEffect } from "react";

export default function Stopwatch(running) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(running);
  const [previousTime, setPreviousTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime((prevTime) => prevTime + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndPause = () => {
    if (isRunning) {
      clearInterval();
      setPreviousTime(time);
    } else {
      setPreviousTime(Date.now());
    }
    setIsRunning(!isRunning);
  };

  return (
    <div className="stopwatch-container d-flex p-2">
      <div className="stopwatch-time mr-2 p-2" style={{border: "1px solid grey", backgroundColor: "black", color: "#fff"}}>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </div>
      <div className="stopwatch-buttons mt-1">
        <button className="stopwatch-button" onClick={startAndPause}>
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
}
