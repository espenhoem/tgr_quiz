import { useEffect, useState, useRef } from "react";


export default function CountdownTimer() {

const [countdownTimer, setCountdownTimer] = useState(3);


useEffect(() => { 

  
  interval();
  //cleanup
  return () => clearInterval(id.current);
  }, [])

  let id = useRef();

      //interval

      function interval() {
      id.current = setInterval(() => {
          setCountdownTimer(prev => prev - 1);
        }, 1000);
      }

  return '0' + countdownTimer;
}
