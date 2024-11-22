import { useSelector, useDispatch } from 'react-redux';
import './FinalScreen.css'
import { Step } from '../../utils/constant';
import { move, togglePause } from './../../features/gameStateSlice';
import { useEffect, useState} from 'react';

function FinalScreen() {
    const step = useSelector((state) => state.gameState.step);
    const pause = useSelector((state) => state.gameState.pause);

    const dispatch = useDispatch();
    const [seconds, setSeconds] = useState(0); // État pour suivre les secondes

    const restart = () => {
        console.log('toto je suis la ')
        dispatch(move(undefined));
    }

    useEffect(() => {
        const interval = setInterval(() => {
          setSeconds((prevSeconds) => {
            const newSeconds = prevSeconds + 1;
            return newSeconds;
          });

        }, 1000);
        return () => clearInterval(interval); // Nettoie l'intervalle à la fin
      }, []); // Ajout de dépendances pour garantir un comportement correct
    
      useEffect(() => {
        if (seconds == 3) {
          dispatch(togglePause()); // Appeler l'action Redux après 4 secondes
        }
      }, [seconds, dispatch]); // Exécuter cet effet à chaque changement de `seconds`
    

    return(
        <div className="container-final-screen">
            { step === Step.WON  &&
                <p className='game-stap-info'> Winner 🥰</p>
            }
            {step === Step.LOST  &&
                <p className='game-stap-info'> Loser 😿</p>
            }
            { seconds > 3 &&
                <button onClick={restart}>Replay</button>
            }
            { seconds <= 3 &&
                <p className='display-seconds'>{seconds}</p>
            }    
        </div>
    )
}

export default FinalScreen;