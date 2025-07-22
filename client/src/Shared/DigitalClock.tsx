import { useState, useEffect } from 'react';

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
    const secondsStr = seconds < 10 ? '0' + seconds : seconds.toString();
    const hoursStr = hours < 10 ? '0' + hours : hours.toString();

    return `${hoursStr}:${minutesStr}:${secondsStr} ${ampm}`;
  };

  return (
    <div className='text-base text-gray-400'>
      {formatTime(time) + ' | ' + time.toLocaleDateString()}
    </div>
  );
}

export default DigitalClock;