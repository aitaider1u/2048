import "./Score.css"
import { useSelector, useDispatch } from 'react-redux';
import { increment} from './../../../features/counterSlice';


export default function Score(){
    const score = useSelector((state) => state.gameState.score);

    return (
        <>
            <div className="score-container">
                <p className="score-title">Score</p>
                <p className="score-info">{score}</p>
            </div>
        </>
    );
}