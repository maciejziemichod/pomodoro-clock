import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrementSession } from "../actions";

const Timer = () => {
  const sessionTime = useSelector((state) => state.session);
  const time = calcTime(sessionTime);
  const dispatch = useDispatch();
  const shouldRun = useSelector((state) => state.togglePlay);

  useEffect(() => {
    if (shouldRun) {
      const interval = setInterval(() => {
        dispatch(decrementSession(1));
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  });

  return (
    <div className="timer">
      <div id="timer-label">Session/Break</div>
      <div id="time-left">{time}</div>
    </div>
  );
};

const calcTime = (seconds) => {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  const addZeros = (time) => {
    let newTime = time;
    if (time === 0) {
      newTime = "00";
    } else if (Math.floor(time / 10) < 1) {
      newTime = "0" + time;
    }
    return newTime;
  };

  sec = addZeros(sec);
  min = addZeros(min);

  return `${min}:${sec}`;
};

export default Timer;
