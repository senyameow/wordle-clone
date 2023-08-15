import React, { useCallback, useContext } from 'react'
import Key from './Key';
import { useEffect } from 'react';
import { BoardContext } from '../context/BoardContextProvider'


const Keyboard = () => {
  
  const {onEnter, onDelete, onSelect, gameOver} = useContext(BoardContext)

  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const allKeys = keys1.concat(keys2, keys3)


  //все, конечно круто, но надо сделать так, чтобы мы не только мышкой могли слова печатать)) НО ТАКЖЕ ) печатной машиной ручной

  // акак? - в реакте через useEffect + обращение к документу (что делать не надо в реакте часто, но тут надо) 
  // добавим слушатель keydown (также надо не забывать чистить каждый раз при вызове хука - return : removeeventlistener...)
  // и какой-то функцией будем все это делать! гоугоу



  const handleKeyboard = useCallback((e) => {
    if (e.key === 'Enter') {

      onEnter()

    } else if (e.key === 'Backspace') {
    
      onDelete()

    } else { //если не бэкспейс и не энтер, то просто проходимся по 3 нашим спискам с буквами и спрашиваем, что нажатая кнопка равна кнопке в списке, если да, то её и пишем
      allKeys.forEach(key => {
        if (e.key.toLowerCase() === key.toLowerCase()) { // нашли ту букву и печатаем ее

          onSelect(key)
          
        }
        
      })
    }
  }, [])

  //при каждом ререндере страницы создается НОВАЯ handleKeyboard, и т.к. она в зависимостях юзэффекта, каждый божий раз юзэффект тригерится
  // всё равно не до конца понимаю useCallback...((
  // но хотя бы все работает


  //теперь надо заняться проверкой букв
  //слова будем брать их API, но для теста и девелопмента создадим свое слово в контексте

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard)
    console.log('new handleKeyboard created!')

    return () => {
      document.removeEventListener('keydown', handleKeyboard)
    }
  }, [handleKeyboard])

  // вот так, теперь просто создаем handleKeyboard
  // зачем нам useCallback? - тут его самый главный юзкейс (мы создаем функцию, которая есть в списке зависимостей юзэффекта, поэтому каждый раз при рендере компоненты будет создаваться новая функция (хоть она и делает все одно и то же но для js это разные ссылки) и это доп нагрузка и тд, поэтому оборачиваем в useCallback)


  return (
    <>
    {!gameOver.gameOver && <div className='flex flex-col gap-3 items-center mt-5' onKeyDown={handleKeyboard} >
        <div className='flex flex-row gap-3'>
          {keys1.map(key => (
            <Key>{key}</Key>
          ))}
        </div>
        <div className='flex flex-row gap-3'>
        {keys2.map(key => (
            <Key>{key}</Key>
          ))}
        </div>
        <div className='flex flex-row gap-3'>
          <Key wh={true}>{'ENTER'}</Key>
        {keys3.map(key => (
            <Key>{key}</Key>
          ))}
          <Key wh={true}>{'DELETE'}</Key>
        </div>
    </div>}
    
    </>
  )
}

export default Keyboard