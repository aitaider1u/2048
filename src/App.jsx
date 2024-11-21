import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameSrceen from './components/GameScreen/GameScreen'
function App() {

  return (
    <>
    <body>
      <div className='screen-container'>
        <GameSrceen>
        </GameSrceen>
      </div>
    </body>
    </>
  )
}

export default App
