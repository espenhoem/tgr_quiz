
export default function ScoreIndicator({id, correctCount}) {



let correctCircle = () => {

if (id <= correctCount-1) {
    return 'correctCircle';
}

}



let correctLine = () => {

    if (id && id <= correctCount) {
        return 'line currentLine';
    }
    
    }



return (

<>
<div className={id <= correctCount ? `${correctLine()}` : 'line'}></div>
<div className={id <= correctCount ? `circle current ${correctCircle()}` : 'circle'}></div>
</>

      )
}