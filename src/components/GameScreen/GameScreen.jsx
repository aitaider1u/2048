import { useEffect, useState } from "react"
import Grid from "./Grid/Grid"
import Score from "./Score/Score"
import Logo from "./Logo/Logo"
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './../../features/counterSlice';
import { move } from './../../features/gameStateSlice';
import { Direction } from './../../utils/constant';

import "./GameScreen.css"
function GameScreen(){
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [keyPressed, setKeyPressed] = useState(null);
    
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    const handleKeyDown = (event) => {
        switch (event.key) {
            case "ArrowUp":
                dispatch(move(Direction.UP));
                break;
            case "ArrowDown":
                dispatch(move(Direction.DOWN));
                break;
            case "ArrowLeft":
                dispatch(move(Direction.LEFT));
                break;
            case "ArrowRight":
                dispatch(move(Direction.RIGHT));
                break;
            default:
                break;
        };
    }

    const handleKeyUp = () => {
        setKeyPressed(null);
      };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
          window.removeEventListener("keyup", handleKeyUp);
        };
      }, [keyPressed]); 

    return(
        <>
        <div className="container">
            <div className="info-container">
                <Score></Score>
                <Logo></Logo>
            </div>
            <Grid></Grid>
        </div>
        </>
        
    )
}

export default GameScreen;