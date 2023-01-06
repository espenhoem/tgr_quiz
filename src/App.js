import React, { useState, useMemo, useEffect } from 'react';
import Timer from './components/Timer';
import CountdownTimer from './components/CountdownTimer';
import car from './img/car.png';
import logo from './img/logo-tgr.png';
import './app.css';
import ScoreIndicator from './components/ScoreIndicator';
import countdown from './sounds/countdown.mp3';
import correct from './sounds/correct.mp3';
import wrong from './sounds/wrong.mp3';
import background from './sounds/background.mp3';
import victory from './sounds/victory.mp3';
import lost from './sounds/lost.mp3';
import Confetti from 'react-confetti';

function App() {

  const [stop, setStop] = useState(false);
  const [congratulations, setCongratulations] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [intro, setIntro] = useState(true);
  const [question, setQuestion] = useState(0);
  const [questionsList, setQuestionsList] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [correctCount, setCorrectCount] = useState(0);
  const [countdownTimer, setCountdownTimer] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [move, setMove] = useState('');
  const [seconds, setSeconds] = useState(60);
  const [milliseconds, setMilliseconds] = useState(10);  


  const numberOfQuestions = [
    {id: 0 },
    {id: 1 },
    {id: 2 },
    {id: 3 },
    {id: 4 },
    {id: 5 },
    {id: 6 },
    {id: 7 }
  ];

  const data = useMemo(() => {

    return [
       {
         id: 1,
         question: "Toyota-ambassadør Fredric Aasbø har blitt kåret til verdensmester i drifting __ ganger.",
         answers: [
           {
             text: "4",
             correct: false,
           },
           {
             text: "2",
             correct: false,
           },
           {
             text: "3",
             correct: true,
           }
         ]
       },
   
   
       {
         id: 2,
         question: "Hvilken Toyota-modell bruker Toyota-ambassadør Fredric Aasbø til drifting?",
         answers: [
           {
             text: "GT86",
             correct: false,
           },
           {
             text: "GR86",
             correct: false,
           },
           {
             text: "GR Supra",
             correct: true,
           }
         ]
       },
   
   
       {
         id: 3,
         question: "Ca. hvor mange mennesker bor i California?",
         answers: [
           {
             text: "Ca. 40 millioner",
             correct: true,
           },
           {
             text: "Ca. 30 millioner",
             correct: false,
           },
           {
             text: "Ca. 20 millioner",
             correct: false,
           }
         ]
       },


       {
         id: 4,
         question: "California sporsmål nummer to",
         answers: [
           {
             text: "Svar 1",
             correct: false,
           },
           {
             text: "Svar 2",
             correct: true,
           },
           {
             text: "Svar 3",
             correct: false,
           }
         ]
       },

       {
         id: 5,
         question: "Hva betyr det japanske ordet “Kaizen”?",
         answers: [
           {
             text: "Kallenavnet til Toyota-presidenten Akio Toyoda",
             correct: false,
           },
           {
             text: "Kaizen betyr “Kontinuerlig Forbedring\"",
             correct: true,
           },
           {
             text: "Kaizen er en måte å møblere på.",
             correct: false,
           }
         ]
       },

       {
         id: 6,
         question: "Toyota GR Supra kan fra 2023 fås med...",
         answers: [
           {
             text: "Manuell girkasse",
             correct: true,
           },
           {
             text: "Parasoll",
             correct: false,
           },
           {
             text: "Ekstra ratt",
             correct: false,
           }
         ]
       },

       {
         id: 7,
         question: "Hvilken modell er oppfølgeren til velkjente Toyota GT86?",
         answers: [
           {
             text: "GR Supra",
             correct: false,
           },
           {
             text: "GR86",
             correct: true,
           },
           {
             text: "GR Yaris",
             correct: false,
           }
         ]
       },

       {
         id: 8,
         question: "Hva er Toyota Gazoo Racing?",
         answers: [
           {
             text: "Toyotas satsing motorsport",
             correct: true,
           },
           {
             text: "Toyotas in-house rockeband",
             correct: false,
           },
           {
             text: "Toyotas innendørs bilbane",
             correct: false,
           }
         ]
       },

       {
         id: 9,
         question: "Gazoo racing spørsmål nummer to",
         answers: [
           {
             text: "Svaralternativ 1",
             correct: false,
           },
           {
             text: "Svaralternativ 2",
             correct: false,
           },
           {
             text: "Svaralternativ 3",
             correct: true,
           }
         ]
       },


       {
         id: 10,
         question: "Team Toyota-spørsmål",
         answers: [
           {
             text: "Alternativ A",
             correct: false,
           },
           {
             text: "Alternativ B",
             correct: true,
           },
           {
             text: "Alternativ C",
             correct: false,
           }
         ]
       },

       {
         id: 11,
         question: "Et annet Team Toyota-spørsmål",
         answers: [
           {
             text: "Option 1",
             correct: true,
           },
           {
             text: "Option 2",
             correct: true,
           },
           {
             text: "Option 3",
             correct: false,
           }
         ]
       }




     ];
   

   }, []); 


   const generateQuestionList = () => {


      
    data.sort(() => Math.random() - 0.5)


    const newArray = [...data, ...data, ...data, ...data, ...data, ...data];

    setQuestionsList(newArray);


  }



useEffect(() => {

  generateQuestionList();

}, [])


    const generateQuestion = () => {

      const nextQuestion = question + 1;
      setQuestion(nextQuestion);

    }

    function play(file) {
      new Audio(file).play();
    }

const delay = (duration, callback) => {

  setTimeout(() => {
      callback();
  }, duration);

};

const handleClick = (a) => {

  setSelectedAnswer(a);

  delay(1000, () => {
    generateQuestion();
  });

  if (correctCount === 2) {

    play(correct);
    setMove(' drive');
    setDisableButton(true);
    setClassName("answer correct");
    setCorrectCount(prev => prev + 1)

    delay(1000, () => {
      play(victory);
      setMove('');
      setDisableButton(false);
      setClassName("answer");
      setSelectedAnswer(null);
      setCongratulations(true);
      setCorrectCount(0);
      setGameStarted(false);
    });

  } else if(a.correct) {

    setClassName("answer correct");
        play(correct);
          setMove(' drive');
          setDisableButton(true);
          setCorrectCount(prev => prev + 1)

          delay(1000, () => {
            setClassName("answer");
            setSelectedAnswer(null);
              setDisableButton(false);
              setMove('');
          });

  } else if (correctCount === 0) {

    setClassName("answer wrong");
    play(wrong);
    setMove('');
    setDisableButton(true);
    setCorrectCount(prev => prev);

      delay(1000, () => {
        setClassName("answer");
        setSelectedAnswer(null);
        setDisableButton(false);
        setMove('');
    });

  } else {

    play(wrong);
    setMove(' reverse');
    setDisableButton(true);
    setClassName("answer wrong");
    setCorrectCount(prev => prev - 1)

      delay(1000, () => {
        setClassName("answer");
        setSelectedAnswer(null);
          setDisableButton(false);
          setMove('');
      });
  }

};

const handleStart = () => {
  play(countdown);
  play(background);
  setIntro(false);
  setCountdownTimer(true);
  setCongratulations(false);
  setDisableButton(false);
  setStop(false);
  setMove(' intro');
  setClassName('answer');
  setSelectedAnswer(null);
  setSeconds(60);
  setMilliseconds(10);
  setCorrectCount(0);

  delay(3000, () => {
    setGameStarted(true);
    setCountdownTimer(false);
    setMove('');
})

};

  return (


    
<div className="app">
<div className="main">
        


{countdownTimer ? 

      <div className="countdown-timer"><CountdownTimer /><div className="red"><img className="logo" src={logo} alt="" /></div>
      </div> 

: <></>

}

  





{intro ? 



<>

<div className="box">

    <img className='logo' src={logo} alt="Toyota Logo" />
    <div className="intro-text">Nå din destinasjon i bil-quizen,<br />og vinn en tur for to til California!</div>
  <button onClick={handleStart}>Start spill</button>

</div>


</> : <></>

}


{/* Game Started */}




{gameStarted ? 

<>

<div className="box">

<div className='timer'>
  <Timer play={play} lost={lost} setGameStarted={setGameStarted} seconds={seconds} setSeconds={setSeconds} milliseconds={milliseconds} setMilliseconds={setMilliseconds} setStop={setStop}/>
  </div>


<div className="question">{questionsList[question].question}</div>
<div className="answers">
{questionsList[question].answers.map((a, i) => (
            <button disabled={disableButton} key={i} className={selectedAnswer === a ? className : "answer"} onClick={() => handleClick(a)}>{a.text}</button>
            ))}   
            
</div>

<div className='points'>
{numberOfQuestions.map((item, id) => (
  <ScoreIndicator key={id} id={item.id} correctCount={correctCount} correct={item.correct} current={item.current} currentLine={item.currentLine} />
            ))}
</div>


</div>

</> : <></>

}








{/* You Lost! */}



{stop ? 
   
   <>


<div className="box">

      <h1>TIDEN ER UTE!</h1>
      <p>Du var {(numberOfQuestions.length)-correctCount} steg unna mål!</p>
      <button onClick={handleStart}>Spill igjen</button>
      <button>Del med andre</button>
      <div className='points'>{correctCount}/8 poeng</div>

      <img className='logo' src={logo} alt="Toyota Logo" />
      <a href="https://www.toyota.no"><p>Les mer om bil-quizen her</p></a>

      </div>


  </> : <></>


}
    









{/* Congratulations */}
  

{congratulations ? 

<>

<div className="box">
   
  <h1>BRA JOBBA!</h1>
  <p>Du kom i mål på {60-seconds} sekunder!</p>
  <button onClick={handleStart}>Spill igjen</button>
  <button>Del ditt resultat</button>

  <img className='logo' src={logo} alt="Toyota Logo" />
  <a href="https://www.toyota.no"><p>Les mer om bil-quizen her</p></a>

  </div>

  <Confetti/>

  </> : <></>

}
 


  <div className={`infinite${move}`}></div>

      <div className="car_container"><img src={car} alt="" className="car" /></div>



  </div>
  </div>
  );




}

export default App;