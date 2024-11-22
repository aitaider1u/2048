import GridItem from '../GridItem/GridItem'
import './Grid.css'
import { useSelector, useDispatch } from 'react-redux';
import { relaod} from './../../../features/gameStateSlice';
import FinalScreen from "./../../FinalScreen/FinalScreen"
import StartScreen from "./../../StartScreen/StartScreen"
import {Step} from "./../../../utils/constant"
import reload from './../../../assets/reload.svg'

export default function Grid(){

    const gameState = useSelector((state) => state.gameState.value);
    const step = useSelector((state) => state.gameState.step);
    const dispatch = useDispatch()

    const generateGridItems = (matrix) => {
        return matrix.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            value !== 0 ? (
              <GridItem value={value} key={`col-${rowIndex}-${colIndex}`} />
            ) : (
              <GridItem key={`col-${rowIndex}-${colIndex}`} />
            )
          ))
        );
    };

    const hundleRelaod = () => {
      dispatch(relaod())
    }


    console.log(gameState)
    return(
        <div class="grid-container">
            {generateGridItems(gameState)}
            {(step === Step.WON || step === Step.LOST) && (<FinalScreen />)}
            {(step === Step.WAITING) && (<StartScreen />)}
            {step == Step.PLAYING &&
              <img   onClick={hundleRelaod} className='relaod-button' src={reload} alt="" />
            }
        </div>
    )

}