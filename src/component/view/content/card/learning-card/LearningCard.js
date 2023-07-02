// import { useEffect } from "react";
import "./LearningCard.css"

const LearningCard = (props) => {
    const { frontText, backText } = props; 
    return (
        <div className="box-container">
            <div className="box-item">
                <div className="flip-box">
                    <div className="flip-box-front text-center" style={{ backgroundImage: `url('https://s25.postimg.cc/frbd9towf/cta-2.png'`}}>
                        <div className="inner color-white">
                            <h3 className="flip-box-header">{backText}</h3>
                            <p>A short sentence describing this callout is from back.</p>
                            <button className="flip-box-button">Learn More</button>
                        </div>
                    </div>
                    <div className="flip-box-back text-center">
                        <div className="inner">
                            <h3 className="flip-box-header">{frontText}</h3>
                            <p>A short sentence describing this callout is from front.</p>
                        </div>
                    </div>
                </div>
	        </div>
        </div>
    )
}

export default LearningCard;