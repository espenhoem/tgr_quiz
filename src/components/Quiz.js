import React from 'react'
import { useState, useEffect } from 'react';
import logo from '../img/logo.png'

export default function Quiz({data, setStop, questionNumber, setQuestionNumber, gameStarted, setGameStarted}) {

    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");


    useEffect(() => {
        setQuestion(data[questionNumber - 1])
    }, [data, questionNumber]);


const delay = (duration, callback) => {

    setTimeout(() => {
        callback();
    }, duration);

};


const handleClick = (a) => {
    setSelectedAnswer(a);

        if(a.correct) {

            setClassName("answer correct");
            delay(1000, () => {
                setQuestionNumber(prev=> prev + 1)
            
            });

    } else if (questionNumber === 1) {

        setQuestionNumber(1)
        setClassName("answer wrong");    

    }
    
    else {

        delay(1000, () => {
            setQuestionNumber(prev=> prev - 1)
        });
        setClassName("answer wrong");

    }

};




const handleStart = () => {

    setGameStarted(true);

};


  return (
<>


    <div className="quiz">




      {gameStarted ?
(<>
      {questionNumber === 4 ? <><p>Gratulerer du vant!</p></>  : (
<>
<div className="question">{question?.question}</div>
<div className="answers">
{question?.answers.map((a, i) => (
                <div key={i} className={selectedAnswer === a ? className : "answer"} onClick={() => handleClick(a)}>{a.text}</div>
                
                
))}   

</div>
</>


    )}
      
      </>)
      
      : (
      
      <>
        <img className='logo' src={logo} alt="Toyota Logo" />
        <div>Nå din destinasjon i bilquizen!</div>
      <button onClick={handleStart}>Start spill</button>

      </>
      
      )
    }
    </div>

    </>
  )
}
