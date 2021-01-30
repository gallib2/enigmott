import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RiddleState from './riddleState';


import './riddleItem.scss';

const RiddleItem = (props) => {
    const [subject, setSubject] = useState('');
    const [solvedText, setSolvedText] = useState('mark as solved');
    const [isSolved, setIsSolved] = useState(false);
    const [solvedClassName, setSolvedClassName] = useState('unsolved');
    const [riddle, setRiddle] = useState(props.riddle);

    const history = useHistory();

    useEffect(() => {
        if (riddle.is_solved) {
            markSolveStatus({ text: 'mark as unsolved', solved: true, className: 'solved' });
        }

        setSubject(riddle.subject)
    }, [])

    const markSolveStatus = ({ text, solved, className }) => {
        setSolvedText(text);
        setIsSolved(solved);
        setSolvedClassName(className);
    }

    const handleMarkAsSolved = (isSolved) => {
        // event.stopPropagation();
        const newRiddle = {...riddle};
        newRiddle.is_solved = isSolved;
        setRiddle(newRiddle);
        
        if (isSolved) {
            // switch to unsolved
            markSolveStatus({ text: 'mark as unsolved', solved: true, className: 'solved' });
        } else {
            markSolveStatus({ text: 'mark as solved', solved: false, className: 'unsolved' })
        }
    }

    const handleRiddleClick = () => {
        // return <Link to={`${url}/riddle`}/>
        history.push({
            pathname: '/riddle',
            state: { riddle }
        })
    }

    const solveStateText = () => {
        return <span className='riddle-item-btn'>{solvedText}</span>
    }

    return (
        <div className='riddle-item-container' onClick={handleRiddleClick}>
            <div className='solved-container'>
                <RiddleState
                    showWrap={true}
                    riddle={riddle}
                    content={solveStateText()}
                    onClickChangeSolveState={handleMarkAsSolved}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start"
                    }}
                />
            </div>
            <div className='riddle-item-title'>{riddle.question.title}</div>
            <div className="riddle-item-subject">{subject}</div>
        </div>
    )
}

export default RiddleItem;