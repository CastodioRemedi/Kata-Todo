import { useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';
import { intervalToDuration } from 'date-fns';

const TaskTimer = ({ seconds }) => {
  const [CS, setCS] = useState({ seconds: seconds, isMinus: false });
  const [isCounting, setIsCounting] = useState(false);
  const intervalRef = useRef(null);

  const formatTimeTo2Sym = (t) => (String(t).length === 2 ? t : `0${t}`);

  const getTimerString = (sec) => {
    let zero = new Date(1970, 0, 1);
    let current = new Date(1970, 0, 1).setSeconds(sec);

    let interval = intervalToDuration({
      start: zero,
      end: current,
    });

    let dateString = [];
    let timerString = [];
    if (interval.years) dateString.push(`${interval.years} years`);
    if (interval.months) dateString.push(`${interval.months} months`);
    if (interval.days) dateString.push(`${interval.days} days`);
    if (interval.hours) timerString.push(formatTimeTo2Sym(interval.hours));
    timerString.push(formatTimeTo2Sym(interval.minutes));
    timerString.push(formatTimeTo2Sym(interval.seconds));

    const res = `${dateString.join(' ')} ${timerString.join(':')}`;
    return res;
  };

  const toggleCounting = () => {
    if (!isCounting) {
      setIsCounting(true);
      intervalRef.current = setInterval(() => {
        setCS(({ seconds, isMinus }) => {
          let newSeconds;
          let setMinus = isMinus;

          if (seconds > 0 && !isMinus) {
            newSeconds = seconds - 1;
          } else {
            newSeconds = seconds + 1;
            setMinus = true;
          }

          return { seconds: newSeconds, isMinus: setMinus };
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      setIsCounting(false);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  let classNames = 'description';
  classNames += CS.isMinus ? ' alert' : '';

  let button = <button onClick={toggleCounting} className={`icon icon-${isCounting ? 'pause' : 'play'}`}></button>;
  let timer = getTimerString(CS.seconds);
  return (
    <span className={classNames}>
      {CS.isMinus ? '-' : ''}
      {timer}
      {button}
    </span>
  );
};

TaskTimer.defaultProps = {
  seconds: 0,
};

TaskTimer.propTypes = {
  seconds: propTypes.number.isRequired,
};

export default TaskTimer;
