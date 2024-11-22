import './StartScreen.css'
import { useSelector, useDispatch } from 'react-redux';
import {Step} from "./../../utils/constant"
import { move} from './../../features/gameStateSlice';


function StartScreen() {
    const dispatch = useDispatch();

    const startGame = () => {
        console.log("hello")
        dispatch(move(undefined));
        console.log("hello 1")

    }
    return(
        <div className="container-start-screen">
            <p>Go 🚀</p>
            <button onClick={startGame}>Start</button>
        </div>
    )
}

export default StartScreen;