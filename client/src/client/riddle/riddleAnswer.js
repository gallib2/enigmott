import React from 'react';
import './riddleAnswer.scss'

const RiddleAnswer = ({answer, onBackClick}) => {


    return (
        <div className="riddle-answer-container">
            <div className='answer-title'>Answer</div>
            <div className='riddle-answer-text'>{answer}</div>
            <div className='back-btn' onClick={onBackClick}>back</div>
        </div>
    )
}

export default RiddleAnswer;