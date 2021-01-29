import React, { useState, useEffect } from 'react';
import { markSolveState } from './riddle.api';

import './riddleState.scss'

import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';

import Checkbox from '../utils/checkbox';


const RiddleState = (props) => {
    const [isMarkSolved, setIsmarkSolved] = useState(props.riddle.is_solved);
    const [markSolvedClassName, setMarkSolvedClassName] = useState('btn-canvas change');


    useEffect(() => {
        if (isMarkSolved) {
            setMarkSolvedClassName('btn-canvas change solved');
        } else {
            setMarkSolvedClassName('btn-canvas change');
        }
    }, [isMarkSolved])

    const markAsSolve = async (event) => {
        try {
            event.stopPropagation();
            const newSolveState = !isMarkSolved;
            await markSolveState({ riddleId: props.riddle._id, solveState: newSolveState });
            setIsmarkSolved(newSolveState);
            props.onClickChangeSolveState && props.onClickChangeSolveState(newSolveState);
        } catch (err) {
            props.onErrorChangeSolveState && props.onErrorChangeSolveState();
        }
    }

    return (
        // <Checkbox onClick={markAsSolve} checked={isMarkSolved ? 'checked' : ''}/>
        // <div className='riddle-state-container' style={props.style} onClick={markAsSolve}>
        //     <div className='btn-container'>
        //         <DoneOutlineOutlinedIcon className={markSolvedClassName}  />
        //     </div>
        //     {/* {props.content || null} */}
        // </div>


        <React.Fragment>
            {
                props.showWrap ?
                    <div className='riddle-state-container' style={props.style} onClick={markAsSolve}>
                        <div className='btn-container'>
                            <DoneOutlineOutlinedIcon className={markSolvedClassName} />
                        </div>
                        {/* {props.content || null} */}
                    </div> :
                    <div className='riddle-state-container nowrap' style={props.style}>
                        <DoneOutlineOutlinedIcon className={markSolvedClassName} onClick={markAsSolve} />
                        {props.content || null}
                    </div>
            }
        </React.Fragment>
        // <div className='riddle-state-container' style={props.style}>
        //     <DoneOutlineOutlinedIcon className={markSolvedClassName} onClick={markAsSolve} />
        //     {props.content || null}
        // </div>
    );
}

export default RiddleState;