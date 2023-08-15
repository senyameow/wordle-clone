import React from 'react'
import { BoardContext } from '../context/BoardContextProvider'
import { useContext } from 'react'

const Key = ({children, wh}) => {

    const {currentAttempt, onEnter, onDelete, onSelect, disabledLetters, greenLetters, orangeLetters} = useContext(BoardContext)

    const selectLetter = () => {
        
        if (currentAttempt.row >= 5) return 


        if (children === 'DELETE') onDelete() 
        else if (children === 'ENTER') onEnter()
        else onSelect(children)
        
        
        
      
        

        
        

    } 

  return (
    <button onClick={(e) => selectLetter(e)} className={`${wh === true && 'w-[94px]'} h-[56px] w-[47px] text-[1.6rem] font-semibold text-white flex justify-center items-center bg-gray-500 rounded ${disabledLetters.includes(children) && 'bg-gray-800'} ${greenLetters.includes(children) && 'bg-lime-300'} ${(orangeLetters.includes(children) && !greenLetters.includes(children)) && 'bg-orange-400'}`}>
        {children}
    </button>
  )
}

export default Key