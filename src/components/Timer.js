import React, { useState, useEffect } from "react";
import './Timer.css';

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    
    const targetTime = new Date().getTime() + 2 * 60 * 60 * 1000; 

    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeLeft = targetTime - currentTime;

      if (timeLeft <= 0) {
        clearInterval(intervalId); 
      } else {
        setTimeRemaining(timeLeft);
      }
    }, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="timer-container">
      <h2 className="timer-heading">Order Time Remaining</h2>
      <div className="timer">
        {timeRemaining > 0 ? formatTime(timeRemaining) : "00:00:00"}
      </div>
      {timeRemaining <= 0 && <p className="timer-message">Time's up! Your order has been completed.</p>}
    </div>
  );
};

export default Timer;