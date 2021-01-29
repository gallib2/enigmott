import React, { useState, useRef, useEffect } from 'react';
import { ReactSketchCanvas } from "react-sketch-canvas";
import _ from 'lodash';
import config from '../config';
import { savePaint, markSolveState } from './riddle.api';
import RiddleState from './riddleState';

import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import Crop75OutlinedIcon from '@material-ui/icons/Crop75Outlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import UndoOutlinedIcon from '@material-ui/icons/UndoOutlined';
import RedoOutlinedIcon from '@material-ui/icons/RedoOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import OpenWithOutlinedIcon from '@material-ui/icons/OpenWithOutlined';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';


import './Canvas.scss';


// TODO - on destroy -> save the paint? or ask if to save or warn about it...

const styles = {
    borderTop: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
    width: "100%",
    height: "100vh",
    overflow: "hidden"
};

const Canvas = (props) => {
    const [color, setColor] = useState('black');
    const [strokeWidth, setStrokeWidth] = useState(4);
    const [canvasStyle, setCanvasStyle] = useState(styles);
    const [errorText, setErrorText] = useState('');

    const canvasEl = useRef(null);

    useEffect(() => {
        const isHavePaint = !_.isEmpty(props.riddle.paint);
        if (isHavePaint) {
            loadPath(props.riddle.paint);
        }

    }, [])

    const handleClickPen = () => {
        setColor('black');
        setStrokeWidth(4);
    }

    const handleClickErase = () => {
        setColor('white');
        setStrokeWidth(7);
    }

    // const exportImage = () => {
    //     canvasEl.current.exportImage("png")
    //         .then(data => {
    //             console.log(data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }

    const handleSave = async () => {
        try {
            const paint = await canvasEl.current.exportPaths();
            setErrorText('');
            await savePaint({ paint, riddleId: props.riddle._id });
        } catch (err) {
            setErrorText(config.texts.errors.savePaintError);
        }
    }

    const loadPath = (paint) => {
        canvasEl.current.loadPaths(paint);
    }

    return (
        <div className="riddle-canvas-container">
            <div className='error-text'>{errorText}</div>
            <div className="btn-container">
                <SaveOutlinedIcon className="btn-canvas save" onClick={handleSave} />
                <CreateOutlinedIcon className="btn-canvas change" onClick={handleClickPen} />
                <Crop75OutlinedIcon className="btn-canvas change" onClick={handleClickErase} />
                <DeleteOutlineOutlinedIcon className="btn-canvas change" onClick={() => canvasEl.current.clearCanvas()} />
                <UndoOutlinedIcon className="btn-canvas change" onClick={() => canvasEl.current.undo()} />
                <RedoOutlinedIcon className="btn-canvas change" onClick={() => canvasEl.current.redo()} />
                <RiddleState
                    riddle={props.riddle}
                    showWrap={false}
                    onClickChangeSolveState={() => setErrorText('')}
                    onErrorChangeSolveState={() => setErrorText(config.texts.errors.markSolvedError)}
                />
                {/* <DoneOutlineOutlinedIcon className={markSolvedClassName} onClick={markAsSolve} /> */}
                {/* <OpenWithOutlinedIcon onClick={test}/> */}
            </div>
            <ReactSketchCanvas
                ref={canvasEl}
                allowOnlyPointerType="all"
                style={canvasStyle}
                width="600"
                height="400"
                strokeWidth={strokeWidth}
                strokeColor={color}
            />

        </div>
    );
};

export default Canvas;

// var pathsTemp = [
//     {
//       "drawMode": true,
//       "strokeColor": "red",
//       "strokeWidth": 4,
//       "paths": [
//         {
//           "x": 261.3953552246094,
//           "y": 239.14884567260742
//         },
//         {
//           "x": 261.3953552246094,
//           "y": 238.21860885620117
//         },
//         {
//           "x": 261.3953552246094,
//           "y": 237.28837203979492
//         },
//         {
//           "x": 261.3953552246094,
//           "y": 236.35813522338867
//         },
//         {
//           "x": 261.3953552246094,
//           "y": 234.49766159057617
//         },
//         {
//           "x": 262.3255615234375,
//           "y": 231.70695114135742
//         },
//         {
//           "x": 262.3255615234375,
//           "y": 229.84650802612305
//         },
//         {
//           "x": 262.3255615234375,
//           "y": 227.98606491088867
//         },
//         {
//           "x": 262.3255615234375,
//           "y": 226.12556076049805
//         },
//         {
//           "x": 262.3255615234375,
//           "y": 225.19535446166992
//         },
//         {
//           "x": 263.2558288574219,
//           "y": 223.33491134643555
//         },
//         {
//           "x": 263.2558288574219,
//           "y": 220.54417037963867
//         },
//         {
//           "x": 263.2558288574219,
//           "y": 218.68375778198242
//         },
//         {
//           "x": 263.2558288574219,
//           "y": 215.89301681518555
//         },
//         {
//           "x": 263.2558288574219,
//           "y": 214.03257369995117
//         },
//         {
//           "x": 263.2558288574219,
//           "y": 211.24186325073242
//         },
//         {
//           "x": 262.3255615234375,
//           "y": 209.38142013549805
//         },
//         {
//           "x": 261.3953552246094,
//           "y": 207.52093124389648
//         },
//         {
//           "x": 260.4651184082031,
//           "y": 204.73025131225586
//         },
//         {
//           "x": 259.5348815917969,
//           "y": 202.86974716186523
//         },
//         {
//           "x": 258.6046447753906,
//           "y": 201.93952560424805
//         },
//         {
//           "x": 256.7442321777344,
//           "y": 200.07908248901367
//         },
//         {
//           "x": 255.81394958496094,
//           "y": 199.14883041381836
//         },
//         {
//           "x": 254.8837127685547,
//           "y": 199.14883041381836
//         },
//         {
//           "x": 253.0232391357422,
//           "y": 198.21860885620117
//         },
//         {
//           "x": 251.1627960205078,
//           "y": 198.21860885620117
//         },
//         {
//           "x": 250.2325439453125,
//           "y": 198.21860885620117
//         },
//         {
//           "x": 248.37210083007812,
//           "y": 198.21860885620117
//         },
//         {
//           "x": 245.58140563964844,
//           "y": 197.28835678100586
//         },
//         {
//           "x": 243.72093200683594,
//           "y": 197.28835678100586
//         },
//         {
//           "x": 240.9302215576172,
//           "y": 197.28835678100586
//         },
//         {
//           "x": 239.0697479248047,
//           "y": 197.28835678100586
//         },
//         {
//           "x": 238.13955688476562,
//           "y": 198.21860885620117
//         },
//         {
//           "x": 237.2093048095703,
//           "y": 199.14883041381836
//         },
//         {
//           "x": 236.27908325195312,
//           "y": 200.07908248901367
//         },
//         {
//           "x": 235.3488311767578,
//           "y": 200.07908248901367
//         },
//         {
//           "x": 234.41860961914062,
//           "y": 202.86974716186523
//         },
//         {
//           "x": 233.4884033203125,
//           "y": 205.66045761108398
//         },
//         {
//           "x": 232.55813598632812,
//           "y": 209.38142013549805
//         },
//         {
//           "x": 230.69766235351562,
//           "y": 212.17210006713867
//         },
//         {
//           "x": 230.69766235351562,
//           "y": 214.96281051635742
//         },
//         {
//           "x": 229.76744079589844,
//           "y": 219.61393356323242
//         },
//         {
//           "x": 228.8372344970703,
//           "y": 224.26511764526367
//         },
//         {
//           "x": 228.8372344970703,
//           "y": 228.9162712097168
//         },
//         {
//           "x": 228.8372344970703,
//           "y": 234.49766159057617
//         },
//         {
//           "x": 228.8372344970703,
//           "y": 241.93955612182617
//         },
//         {
//           "x": 230.69766235351562,
//           "y": 248.45115280151367
//         },
//         {
//           "x": 232.55813598632812,
//           "y": 254.03254318237305
//         },
//         {
//           "x": 233.4884033203125,
//           "y": 260.5442314147949
//         },
//         {
//           "x": 236.27908325195312,
//           "y": 267.0558280944824
//         },
//         {
//           "x": 238.13955688476562,
//           "y": 274.4976921081543
//         },
//         {
//           "x": 239.0697479248047,
//           "y": 279.1488456726074
//         },
//         {
//           "x": 241.86045837402344,
//           "y": 285.6604423522949
//         },
//         {
//           "x": 241.86045837402344,
//           "y": 290.3116264343262
//         },
//         {
//           "x": 241.86045837402344,
//           "y": 294.9627799987793
//         },
//         {
//           "x": 241.86045837402344,
//           "y": 298.6837272644043
//         },
//         {
//           "x": 241.86045837402344,
//           "y": 303.3348808288574
//         },
//         {
//           "x": 241.86045837402344,
//           "y": 306.12556076049805
//         },
//         {
//           "x": 240.9302215576172,
//           "y": 308.9162712097168
//         },
//         {
//           "x": 240,
//           "y": 310.7767448425293
//         },
//         {
//           "x": 238.13955688476562,
//           "y": 312.6372184753418
//         },
//         {
//           "x": 236.27908325195312,
//           "y": 314.4976615905762
//         },
//         {
//           "x": 233.4884033203125,
//           "y": 317.2883720397949
//         },
//         {
//           "x": 230.69766235351562,
//           "y": 318.2186088562012
//         },
//         {
//           "x": 226.9767608642578,
//           "y": 321.0093193054199
//         },
//         {
//           "x": 221.3953399658203,
//           "y": 322.8697624206543
//         },
//         {
//           "x": 216.7441864013672,
//           "y": 323.7999687194824
//         },
//         {
//           "x": 209.3023223876953,
//           "y": 325.66047286987305
//         },
//         {
//           "x": 201.86045837402344,
//           "y": 325.66047286987305
//         },
//         {
//           "x": 197.20928955078125,
//           "y": 325.66047286987305
//         },
//         {
//           "x": 190.6976776123047,
//           "y": 325.66047286987305
//         },
//         {
//           "x": 186.0465087890625,
//           "y": 325.66047286987305
//         },
//         {
//           "x": 181.3953399658203,
//           "y": 325.66047286987305
//         },
//         {
//           "x": 177.6744384765625,
//           "y": 325.66047286987305
//         },
//         {
//           "x": 173.95347595214844,
//           "y": 325.66047286987305
//         },
//         {
//           "x": 170.23255920410156,
//           "y": 324.7302360534668
//         },
//         {
//           "x": 168.3721160888672,
//           "y": 323.7999687194824
//         },
//         {
//           "x": 166.5116424560547,
//           "y": 321.0093193054199
//         },
//         {
//           "x": 164.6511688232422,
//           "y": 319.1488456726074
//         },
//         {
//           "x": 161.8604736328125,
//           "y": 316.3581657409668
//         },
//         {
//           "x": 159.06979370117188,
//           "y": 313.5674247741699
//         },
//         {
//           "x": 157.20932006835938,
//           "y": 308.9162712097168
//         },
//         {
//           "x": 153.48837280273438,
//           "y": 304.2651176452637
//         },
//         {
//           "x": 151.62791442871094,
//           "y": 300.5441703796387
//         },
//         {
//           "x": 148.8372039794922,
//           "y": 295.89301681518555
//         },
//         {
//           "x": 146.9767303466797,
//           "y": 291.2418632507324
//         },
//         {
//           "x": 144.18605041503906,
//           "y": 286.5906791687012
//         },
//         {
//           "x": 142.32557678222656,
//           "y": 281.93952560424805
//         },
//         {
//           "x": 140.4651336669922,
//           "y": 277.2883720397949
//         },
//         {
//           "x": 138.6046600341797,
//           "y": 272.6372184753418
//         },
//         {
//           "x": 137.67442321777344,
//           "y": 267.98603439331055
//         },
//         {
//           "x": 136.7441864013672,
//           "y": 263.3348808288574
//         },
//         {
//           "x": 135.81398010253906,
//           "y": 258.6837272644043
//         },
//         {
//           "x": 135.81398010253906,
//           "y": 254.9627799987793
//         },
//         {
//           "x": 135.81398010253906,
//           "y": 250.31162643432617
//         },
//         {
//           "x": 135.81398010253906,
//           "y": 246.59074020385742
//         },
//         {
//           "x": 135.81398010253906,
//           "y": 241.93955612182617
//         },
//         {
//           "x": 137.67442321777344,
//           "y": 238.21860885620117
//         },
//         {
//           "x": 138.6046600341797,
//           "y": 235.42789840698242
//         },
//         {
//           "x": 140.4651336669922,
//           "y": 232.63724899291992
//         },
//         {
//           "x": 142.32557678222656,
//           "y": 228.9162712097168
//         },
//         {
//           "x": 144.18605041503906,
//           "y": 226.12556076049805
//         },
//         {
//           "x": 146.9767303466797,
//           "y": 223.33491134643555
//         },
//         {
//           "x": 148.8372039794922,
//           "y": 222.40464401245117
//         },
//         {
//           "x": 152.5581512451172,
//           "y": 220.54417037963867
//         },
//         {
//           "x": 155.3488311767578,
//           "y": 219.61393356323242
//         },
//         {
//           "x": 158.1395263671875,
//           "y": 219.61393356323242
//         },
//         {
//           "x": 160,
//           "y": 219.61393356323242
//         },
//         {
//           "x": 160.9302215576172,
//           "y": 219.61393356323242
//         },
//         {
//           "x": 160.9302215576172,
//           "y": 220.54417037963867
//         },
//         {
//           "x": 160.9302215576172,
//           "y": 223.33491134643555
//         },
//         {
//           "x": 160.9302215576172,
//           "y": 226.12556076049805
//         },
//         {
//           "x": 160.9302215576172,
//           "y": 229.84650802612305
//         },
//         {
//           "x": 160.9302215576172,
//           "y": 232.63724899291992
//         },
//         {
//           "x": 159.06979370117188,
//           "y": 237.28837203979492
//         },
//         {
//           "x": 159.06979370117188,
//           "y": 241.00931930541992
//         },
//         {
//           "x": 157.20932006835938,
//           "y": 245.66044235229492
//         },
//         {
//           "x": 156.27906799316406,
//           "y": 249.38138961791992
//         },
//         {
//           "x": 156.27906799316406,
//           "y": 254.03254318237305
//         },
//         {
//           "x": 155.3488311767578,
//           "y": 257.7534599304199
//         },
//         {
//           "x": 154.4186248779297,
//           "y": 263.3348808288574
//         },
//         {
//           "x": 154.4186248779297,
//           "y": 267.98603439331055
//         },
//         {
//           "x": 153.48837280273438,
//           "y": 275.4278984069824
//         },
//         {
//           "x": 152.5581512451172,
//           "y": 280.07905197143555
//         },
//         {
//           "x": 152.5581512451172,
//           "y": 284.7302360534668
//         },
//         {
//           "x": 152.5581512451172,
//           "y": 289.3813896179199
//         },
//         {
//           "x": 152.5581512451172,
//           "y": 294.9627799987793
//         },
//         {
//           "x": 153.48837280273438,
//           "y": 299.6139335632324
//         },
//         {
//           "x": 154.4186248779297,
//           "y": 304.2651176452637
//         },
//         {
//           "x": 155.3488311767578,
//           "y": 307.0558280944824
//         },
//         {
//           "x": 158.1395263671875,
//           "y": 307.98603439331055
//         },
//         {
//           "x": 160,
//           "y": 309.84650802612305
//         },
//         {
//           "x": 160.9302215576172,
//           "y": 310.7767448425293
//         },
//         {
//           "x": 164.6511688232422,
//           "y": 311.70698165893555
//         },
//         {
//           "x": 167.44186401367188,
//           "y": 312.6372184753418
//         },
//         {
//           "x": 170.23255920410156,
//           "y": 312.6372184753418
//         },
//         {
//           "x": 173.95347595214844,
//           "y": 312.6372184753418
//         },
//         {
//           "x": 178.60464477539062,
//           "y": 312.6372184753418
//         },
//         {
//           "x": 182.3256072998047,
//           "y": 312.6372184753418
//         },
//         {
//           "x": 186.97677612304688,
//           "y": 311.70698165893555
//         },
//         {
//           "x": 190.6976776123047,
//           "y": 309.84650802612305
//         },
//         {
//           "x": 194.4186248779297,
//           "y": 307.98603439331055
//         },
//         {
//           "x": 198.1395263671875,
//           "y": 306.12556076049805
//         },
//         {
//           "x": 199.99998474121094,
//           "y": 303.3348808288574
//         },
//         {
//           "x": 201.86045837402344,
//           "y": 301.4744071960449
//         },
//         {
//           "x": 202.7906951904297,
//           "y": 299.6139335632324
//         },
//         {
//           "x": 204.6511688232422,
//           "y": 297.7535209655762
//         },
//         {
//           "x": 205.5814208984375,
//           "y": 296.8232536315918
//         },
//         {
//           "x": 206.51162719726562,
//           "y": 294.03254318237305
//         },
//         {
//           "x": 207.4418487548828,
//           "y": 292.17206954956055
//         },
//         {
//           "x": 207.4418487548828,
//           "y": 290.3116264343262
//         },
//         {
//           "x": 208.37210083007812,
//           "y": 288.4511833190918
//         },
//         {
//           "x": 208.37210083007812,
//           "y": 286.5906791687012
//         },
//         {
//           "x": 209.3023223876953,
//           "y": 283.8000297546387
//         },
//         {
//           "x": 209.3023223876953,
//           "y": 281.0093193054199
//         },
//         {
//           "x": 209.3023223876953,
//           "y": 278.2186088562012
//         },
//         {
//           "x": 209.3023223876953,
//           "y": 273.5674247741699
//         },
//         {
//           "x": 208.37210083007812,
//           "y": 270.7767448425293
//         },
//         {
//           "x": 207.4418487548828,
//           "y": 267.98603439331055
//         },
//         {
//           "x": 206.51162719726562,
//           "y": 264.2651176452637
//         },
//         {
//           "x": 204.6511688232422,
//           "y": 261.4744071960449
//         },
//         {
//           "x": 202.7906951904297,
//           "y": 257.7534599304199
//         },
//         {
//           "x": 199.99998474121094,
//           "y": 254.03254318237305
//         },
//         {
//           "x": 197.20928955078125,
//           "y": 250.31162643432617
//         },
//         {
//           "x": 195.3488311767578,
//           "y": 246.59074020385742
//         },
//         {
//           "x": 191.6279296875,
//           "y": 242.8697624206543
//         },
//         {
//           "x": 189.76744079589844,
//           "y": 240.07905197143555
//         },
//         {
//           "x": 186.97677612304688,
//           "y": 238.21860885620117
//         },
//         {
//           "x": 185.1162872314453,
//           "y": 236.35813522338867
//         },
//         {
//           "x": 183.2558135986328,
//           "y": 233.56742477416992
//         },
//         {
//           "x": 180.4651336669922,
//           "y": 231.70695114135742
//         },
//         {
//           "x": 178.60464477539062,
//           "y": 229.84650802612305
//         },
//         {
//           "x": 176.7441864013672,
//           "y": 227.98606491088867
//         },
//         {
//           "x": 174.8837127685547,
//           "y": 227.05582809448242
//         },
//         {
//           "x": 173.02328491210938,
//           "y": 226.12556076049805
//         },
//         {
//           "x": 173.02328491210938,
//           "y": 224.26511764526367
//         },
//         {
//           "x": 172.093017578125,
//           "y": 223.33491134643555
//         },
//         {
//           "x": 171.1627960205078,
//           "y": 220.54417037963867
//         },
//         {
//           "x": 169.3023223876953,
//           "y": 219.61393356323242
//         },
//         {
//           "x": 169.3023223876953,
//           "y": 215.89301681518555
//         },
//         {
//           "x": 167.44186401367188,
//           "y": 213.10233688354492
//         },
//         {
//           "x": 166.5116424560547,
//           "y": 209.38142013549805
//         },
//         {
//           "x": 166.5116424560547,
//           "y": 204.73025131225586
//         },
//         {
//           "x": 165.58139038085938,
//           "y": 201.00930404663086
//         },
//         {
//           "x": 164.6511688232422,
//           "y": 196.35813522338867
//         },
//         {
//           "x": 164.6511688232422,
//           "y": 190.77676010131836
//         },
//         {
//           "x": 164.6511688232422,
//           "y": 186.12560653686523
//         },
//         {
//           "x": 164.6511688232422,
//           "y": 181.47443771362305
//         },
//         {
//           "x": 164.6511688232422,
//           "y": 176.82326889038086
//         },
//         {
//           "x": 164.6511688232422,
//           "y": 172.17211532592773
//         },
//         {
//           "x": 165.58139038085938,
//           "y": 168.45115280151367
//         },
//         {
//           "x": 165.58139038085938,
//           "y": 164.73022079467773
//         },
//         {
//           "x": 167.44186401367188,
//           "y": 161.00930404663086
//         },
//         {
//           "x": 168.3721160888672,
//           "y": 158.21862411499023
//         },
//         {
//           "x": 170.23255920410156,
//           "y": 155.42791366577148
//         },
//         {
//           "x": 171.1627960205078,
//           "y": 152.63720321655273
//         },
//         {
//           "x": 173.02328491210938,
//           "y": 148.91630172729492
//         },
//         {
//           "x": 174.8837127685547,
//           "y": 146.1255760192871
//         },
//         {
//           "x": 177.6744384765625,
//           "y": 144.26513290405273
//         },
//         {
//           "x": 179.53488159179688,
//           "y": 141.47442245483398
//         },
//         {
//           "x": 181.3953399658203,
//           "y": 140.54418563842773
//         },
//         {
//           "x": 184.18603515625,
//           "y": 138.68371200561523
//         },
//         {
//           "x": 186.0465087890625,
//           "y": 136.8232536315918
//         },
//         {
//           "x": 187.90696716308594,
//           "y": 135.89301681518555
//         },
//         {
//           "x": 189.76744079589844,
//           "y": 134.0325584411621
//         },
//         {
//           "x": 190.6976776123047,
//           "y": 133.10233688354492
//         },
//         {
//           "x": 189.76744079589844,
//           "y": 133.10233688354492
//         },
//         {
//           "x": 186.97677612304688,
//           "y": 133.10233688354492
//         },
//         {
//           "x": 184.18603515625,
//           "y": 132.1720848083496
//         },
//         {
//           "x": 179.53488159179688,
//           "y": 132.1720848083496
//         },
//         {
//           "x": 173.95347595214844,
//           "y": 130.31164169311523
//         },
//         {
//           "x": 168.3721160888672,
//           "y": 129.38138961791992
//         },
//         {
//           "x": 162.7906951904297,
//           "y": 127.52093124389648
//         },
//         {
//           "x": 158.1395263671875,
//           "y": 126.59069442749023
//         },
//         {
//           "x": 154.4186248779297,
//           "y": 124.73022079467773
//         },
//         {
//           "x": 151.62791442871094,
//           "y": 123.80001449584961
//         },
//         {
//           "x": 149.76747131347656,
//           "y": 121.93952560424805
//         },
//         {
//           "x": 148.8372039794922,
//           "y": 120.07906723022461
//         },
//         {
//           "x": 147.906982421875,
//           "y": 119.14884567260742
//         },
//         {
//           "x": 146.9767303466797,
//           "y": 116.3581657409668
//         },
//         {
//           "x": 146.0465087890625,
//           "y": 114.49767684936523
//         },
//         {
//           "x": 146.0465087890625,
//           "y": 111.70699691772461
//         },
//         {
//           "x": 146.0465087890625,
//           "y": 108.9162712097168
//         },
//         {
//           "x": 146.0465087890625,
//           "y": 105.19536972045898
//         },
//         {
//           "x": 146.0465087890625,
//           "y": 102.4046745300293
//         },
//         {
//           "x": 146.0465087890625,
//           "y": 98.68371200561523
//         },
//         {
//           "x": 146.0465087890625,
//           "y": 94.9627799987793
//         },
//         {
//           "x": 146.9767303466797,
//           "y": 91.24187850952148
//         },
//         {
//           "x": 147.906982421875,
//           "y": 88.4511833190918
//         },
//         {
//           "x": 149.76747131347656,
//           "y": 84.73022079467773
//         },
//         {
//           "x": 150.6976776123047,
//           "y": 81.93954086303711
//         },
//         {
//           "x": 152.5581512451172,
//           "y": 79.14886856079102
//         },
//         {
//           "x": 154.4186248779297,
//           "y": 75.42790603637695
//         },
//         {
//           "x": 156.27906799316406,
//           "y": 73.56743240356445
//         },
//         {
//           "x": 158.1395263671875,
//           "y": 69.84653091430664
//         },
//         {
//           "x": 160,
//           "y": 67.0557975769043
//         },
//         {
//           "x": 163.720947265625,
//           "y": 64.26511001586914
//         },
//         {
//           "x": 166.5116424560547,
//           "y": 60.5442008972168
//         },
//         {
//           "x": 169.3023223876953,
//           "y": 58.6837272644043
//         },
//         {
//           "x": 171.1627960205078,
//           "y": 56.8232536315918
//         },
//         {
//           "x": 173.95347595214844,
//           "y": 54.03256607055664
//         },
//         {
//           "x": 177.6744384765625,
//           "y": 53.10231399536133
//         },
//         {
//           "x": 181.3953399658203,
//           "y": 51.241878509521484
//         },
//         {
//           "x": 184.18603515625,
//           "y": 51.241878509521484
//         },
//         {
//           "x": 187.90696716308594,
//           "y": 50.31162643432617
//         },
//         {
//           "x": 191.6279296875,
//           "y": 50.31162643432617
//         },
//         {
//           "x": 196.2790985107422,
//           "y": 50.31162643432617
//         },
//         {
//           "x": 199.99998474121094,
//           "y": 50.31162643432617
//         },
//         {
//           "x": 202.7906951904297,
//           "y": 50.31162643432617
//         },
//         {
//           "x": 204.6511688232422,
//           "y": 50.31162643432617
//         },
//         {
//           "x": 205.5814208984375,
//           "y": 51.241878509521484
//         },
//         {
//           "x": 205.5814208984375,
//           "y": 52.17209243774414
//         },
//         {
//           "x": 206.51162719726562,
//           "y": 52.17209243774414
//         },
//         {
//           "x": 206.51162719726562,
//           "y": 54.96278762817383
//         },
//         {
//           "x": 206.51162719726562,
//           "y": 57.753482818603516
//         },
//         {
//           "x": 206.51162719726562,
//           "y": 60.5442008972168
//         },
//         {
//           "x": 206.51162719726562,
//           "y": 64.26511001586914
//         },
//         {
//           "x": 206.51162719726562,
//           "y": 67.98605728149414
//         },
//         {
//           "x": 204.6511688232422,
//           "y": 70.7767448425293
//         },
//         {
//           "x": 204.6511688232422,
//           "y": 74.4976921081543
//         },
//         {
//           "x": 202.7906951904297,
//           "y": 77.28837966918945
//         },
//         {
//           "x": 201.86045837402344,
//           "y": 80.07906723022461
//         },
//         {
//           "x": 199.0697784423828,
//           "y": 81.93954086303711
//         },
//         {
//           "x": 197.20928955078125,
//           "y": 84.73022079467773
//         },
//         {
//           "x": 194.4186248779297,
//           "y": 87.52093124389648
//         },
//         {
//           "x": 191.6279296875,
//           "y": 89.38140487670898
//         },
//         {
//           "x": 188.8372039794922,
//           "y": 92.17208480834961
//         },
//         {
//           "x": 184.18603515625,
//           "y": 94.9627799987793
//         },
//         {
//           "x": 179.53488159179688,
//           "y": 97.75352096557617
//         },
//         {
//           "x": 175.81396484375,
//           "y": 99.61394882202148
//         },
//         {
//           "x": 171.1627960205078,
//           "y": 101.47442245483398
//         },
//         {
//           "x": 165.58139038085938,
//           "y": 103.33488082885742
//         },
//         {
//           "x": 160.9302215576172,
//           "y": 105.19536972045898
//         },
//         {
//           "x": 154.4186248779297,
//           "y": 107.98603439331055
//         },
//         {
//           "x": 148.8372039794922,
//           "y": 108.9162712097168
//         },
//         {
//           "x": 144.18605041503906,
//           "y": 110.77672958374023
//         },
//         {
//           "x": 140.4651336669922,
//           "y": 111.70699691772461
//         },
//         {
//           "x": 136.7441864013672,
//           "y": 112.63720321655273
//         },
//         {
//           "x": 134.8837127685547,
//           "y": 113.56744003295898
//         },
//         {
//           "x": 133.95350646972656,
//           "y": 115.42791366577148
//         },
//         {
//           "x": 131.16282653808594,
//           "y": 115.42791366577148
//         },
//         {
//           "x": 131.16282653808594,
//           "y": 116.3581657409668
//         },
//         {
//           "x": 130.23255920410156,
//           "y": 116.3581657409668
//         },
//         {
//           "x": 130.23255920410156,
//           "y": 117.28837203979492
//         },
//         {
//           "x": 129.30233764648438,
//           "y": 117.28837203979492
//         },
//         {
//           "x": 129.30233764648438,
//           "y": 120.07906723022461
//         },
//         {
//           "x": 129.30233764648438,
//           "y": 121.93952560424805
//         },
//         {
//           "x": 129.30233764648438,
//           "y": 124.73022079467773
//         },
//         {
//           "x": 128.37208557128906,
//           "y": 127.52093124389648
//         },
//         {
//           "x": 127.44185638427734,
//           "y": 132.1720848083496
//         },
//         {
//           "x": 127.44185638427734,
//           "y": 135.89301681518555
//         },
//         {
//           "x": 127.44185638427734,
//           "y": 140.54418563842773
//         },
//         {
//           "x": 127.44185638427734,
//           "y": 145.19533920288086
//         },
//         {
//           "x": 127.44185638427734,
//           "y": 148.91630172729492
//         },
//         {
//           "x": 128.37208557128906,
//           "y": 154.49767684936523
//         },
//         {
//           "x": 130.23255920410156,
//           "y": 159.14883041381836
//         },
//         {
//           "x": 132.093017578125,
//           "y": 163.79999923706055
//         },
//         {
//           "x": 133.95350646972656,
//           "y": 167.52094650268555
//         },
//         {
//           "x": 136.7441864013672,
//           "y": 170.31164169311523
//         },
//         {
//           "x": 139.53488159179688,
//           "y": 174.03254318237305
//         },
//         {
//           "x": 142.32557678222656,
//           "y": 175.89301681518555
//         },
//         {
//           "x": 146.9767303466797,
//           "y": 178.68371200561523
//         },
//         {
//           "x": 149.76747131347656,
//           "y": 180.54418563842773
//         },
//         {
//           "x": 154.4186248779297,
//           "y": 181.47443771362305
//         },
//         {
//           "x": 157.20932006835938,
//           "y": 182.40464401245117
//         },
//         {
//           "x": 160.9302215576172,
//           "y": 183.33489608764648
//         },
//         {
//           "x": 163.720947265625,
//           "y": 183.33489608764648
//         },
//         {
//           "x": 166.5116424560547,
//           "y": 183.33489608764648
//         },
//         {
//           "x": 170.23255920410156,
//           "y": 183.33489608764648
//         },
//         {
//           "x": 173.95347595214844,
//           "y": 182.40464401245117
//         },
//         {
//           "x": 176.7441864013672,
//           "y": 181.47443771362305
//         }
//       ]
//     }
//   ]