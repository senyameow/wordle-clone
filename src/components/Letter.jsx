import React, { useEffect } from 'react'
import { useContext } from 'react'
import { BoardContext } from '../context/BoardContextProvider'
import '../index.css'

const Letter = ({attemptVal, letterPos}) => {

  

  const {board, correctWord, currentAttempt, setDisabledLetters, setGreenLetters, setOrangeLetters} = useContext(BoardContext)

  const letter = board[attemptVal][letterPos]


  const correct = correctWord[letterPos] === letter
  const almost = Array.from(correctWord).includes(letter)
  const error = !correct && !almost

  //наши стейты для колоркода
  // впадлу делать айдишники, поэтому я просто большую логику запихну в кондишионал стайлинг (практис)


  //собираем неправильные буквы

  useEffect(() => {
    if (letter !== '' && !correct && !almost) {
      // setDisabledLetters([...disabledLetters, letter]) // но так не работает, он будет забирать только последнюю букву
      setDisabledLetters(prev => [...prev, letter]) // вот так мы забираем значение стейта и добавляем букву (немного сложно понять)
    } else if (letter !== '' && correct) {
      setGreenLetters(prev => [...prev, letter])
    } else if (letter !== '' && almost && !correct) {
      setOrangeLetters(prev => [...prev, letter])
    }
    
  }, [currentAttempt.row]) //так мы получили список с плохими буквами
  //надо ими как-то воспользоваться (будем передавать в компоненту с клавишами список этих букв из контекста)

  //получим так все буквы и разукрасим их

  return (
  <>
    <div className={`w-[60px] h-[60px] text-white font-semibold border flex justify-center items-center text-[1.6rem] ${ currentAttempt.row > attemptVal && `${(almost === true && correct === false) && 'bg-amber-400'} ${(correct===true && almost===false) ? 'bg-lime-300' : ''} ${(almost===true && correct===true) && 'bg-lime-300'} ${error && 'bg-gray-600'}`}`}>
        <h1>{letter}</h1>
    </div>
    </>
  )
}

export default Letter