import React from 'react'
import { useContext } from 'react'
import { BoardContext } from '../context/BoardContextProvider'

const GameOver = () => {

    const {gameOver, correctWord, currentAttempt} = useContext(BoardContext)



  return (
    <div className='text-center mt-10'>
        {gameOver.gameOver && <h3 className={`text-[2rem] font-semibold ${gameOver.win ? 'text-lime-300' : 'text-red-400'}`}>{gameOver.win ? 'you won!' : 'you failed'}</h3>}
        { gameOver.gameOver && gameOver.win === false && <h3 className='my-2 text-[1.5rem]'>the word was: {correctWord.toLowerCase()} </h3>}
        {gameOver.gameOver && gameOver.win && <h1 className='text-[1.4rem]'>you guessed in {currentAttempt.row} attempts</h1>}
    </div>
  )
}

export default GameOver