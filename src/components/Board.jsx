import React from 'react'
import Letter from './Letter'
import { BoardContext } from '../context/BoardContextProvider'
import { useContext } from 'react'

const Board = () => {

    const {neNice, setNeNice} = useContext(BoardContext)

  return (
    <div className='grid grid-rows-6 gap-2 items-center justify-center'>
        
        <div className={`flex flex-row gap-2 ${neNice && 'fuck'}`}>
            <Letter attemptVal={0} letterPos={0} />
            <Letter attemptVal={0} letterPos={1} />
            <Letter attemptVal={0} letterPos={2} />
            <Letter attemptVal={0} letterPos={3} />
            <Letter attemptVal={0} letterPos={4} />
        </div>
        <div className={`flex flex-row gap-2 ${neNice && 'fuck'}`}>
            <Letter attemptVal={1} letterPos={0} />
            <Letter attemptVal={1} letterPos={1} />
            <Letter attemptVal={1} letterPos={2} />
            <Letter attemptVal={1} letterPos={3} />
            <Letter attemptVal={1} letterPos={4} />
        </div>
        <div className={`flex flex-row gap-2 ${neNice && 'fuck'}`}>
            <Letter attemptVal={2} letterPos={0} />
            <Letter attemptVal={2} letterPos={1} />
            <Letter attemptVal={2} letterPos={2} />
            <Letter attemptVal={2} letterPos={3} />
            <Letter attemptVal={2} letterPos={4} />
        </div>
        <div className={`flex flex-row gap-2 ${neNice && 'fuck'}`}>
            <Letter attemptVal={3} letterPos={0} />
            <Letter attemptVal={3} letterPos={1} />
            <Letter attemptVal={3} letterPos={2} />
            <Letter attemptVal={3} letterPos={3} />
            <Letter attemptVal={3} letterPos={4} />
        </div>
        <div className={`flex flex-row gap-2 ${neNice && 'fuck'}`}>
            <Letter attemptVal={4} letterPos={0} />
            <Letter attemptVal={4} letterPos={1} />
            <Letter attemptVal={4} letterPos={2} />
            <Letter attemptVal={4} letterPos={3} />
            <Letter attemptVal={4} letterPos={4} />
        </div>
        <div className={`flex flex-row gap-2 ${neNice && 'fuck'}`}>
            <Letter attemptVal={5} letterPos={0} />
            <Letter attemptVal={5} letterPos={1} />
            <Letter attemptVal={5} letterPos={2} />
            <Letter attemptVal={5} letterPos={3} />
            <Letter attemptVal={5} letterPos={4} />
        </div>
    </div>
  )
}

export default Board