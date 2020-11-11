/* eslint-disable max-len */
import {React, useState, useEffect} from 'react';
import counterStyle from '../../css/counter.module.css';

/**
 * Counter component to show time until end of rewards epoch.
 * @return {React} Counter section.
 */
export default function Counter() {
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(1);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let curday;
      const nowDate = new Date();
      const dy = 0; // Sunday through Saturday, 0 to 6
      const countertime = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 20, 0, 0); // 20 out of 24 hours = 8pm

      const curtime = nowDate.getTime(); // current time
      const atime = countertime.getTime(); // countdown time
      let seconds = parseInt((atime - curtime) / 1000);
      if (seconds > 0) {
        curday = dy - nowDate.getDay();
      } else {
        curday = dy - nowDate.getDay() - 1;
      }

      // after countdown time
      if (curday < 0) {
        curday += 7;
      } // already after countdown time, switch to next week
      if (seconds <= 0) {
        seconds += (86400 * 7);
      }

      setDays(Math.floor(seconds / 86400));
      seconds %= 86400;
      setHours(Math.floor(seconds / 3600));
      seconds %= 3600;
      setMinutes(Math.floor(seconds / 60));
      setSeconds(seconds %= 60);
    }, 1000);

    // cleanup
    return () => clearInterval(interval);
  });

  return (
    <center>
      <div id={`${counterStyle['countholder']}`} >
        <div>
          <span className={counterStyle.days} id="days">{days}</span>
          <div className="smalltext">Days</div>
        </div>
        <div>
          <span className={counterStyle.hours} id="hours">{((hours < 10) ? '0' : '') + hours}</span>
          <div className="smalltext">Hours</div>
        </div>
        <div>
          <span className={counterStyle.minutes} id="minutes">{((minutes < 10) ? '0' : '') + minutes}</span>
          <div className="smalltext">Minutes</div>
        </div>
        <div>
          <span className={counterStyle.seconds} id="seconds">{seconds}</span>
          <div className="smalltext">Seconds</div>
        </div>
        <p>
          <font size="3">Time until next <b>SOL</b> rewards are send out. (Sunday 12am (UTC) ) Current rewards in the pool: <b>62 SOL</b><span id="user" /></font>
        </p>
      </div >
    </center >
  );
}
