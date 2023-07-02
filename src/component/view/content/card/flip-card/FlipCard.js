import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group"; 

import "./FlipCard.css"

const FlipCard = (props) => {

    const { frontImg, backDescription } = props ;
    const [ showFront, setShowFront ] = useState(true);

    const onClick = () => {
        setShowFront(x => !x);
    }

    useEffect(()=>{
        setShowFront(true);
    },[frontImg, backDescription])

    return (
        <div className="card-wrapper">
            <CSSTransition in={showFront} classNames='flip-card' timeout={300}>
                <div className="card-container" onClick={onClick}>
                    <div className="card-front">
                        <img alt="" src={frontImg} width={"350px"} height={"500px"}/>
                    </div>
                    <div className="card-back">{backDescription}</div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default FlipCard;