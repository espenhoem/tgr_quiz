import { useEffect, useRef } from "react"

export default function Timer({play, lost, setGameStarted, setStop, seconds, setSeconds, milliseconds, setMilliseconds}) {




useEffect(() => { 


  if(seconds === 0 && milliseconds === 0) 
  
  {

    play(lost);
    setGameStarted(false);


  
  return setStop(true);


  }

  if(milliseconds === 0) {
    
    setSeconds(prev => prev - 1);
    setMilliseconds(10);

  }

  interval();
  //cleanup
  return () => {
    clearInterval(id.current);
  }

  }, [milliseconds, seconds])

  let id = useRef();

      //interval

      function interval() {
      id.current = setInterval(() => {
          setMilliseconds(prev => prev - 1);
        }, 100);
      }

return (

<>
{(seconds >= 10) ? seconds : '0' + seconds}:{(milliseconds === 10) ? (milliseconds + '0').substring(1,3) : '0' + milliseconds}
</>

)

}
