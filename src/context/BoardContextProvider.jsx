//здесь создадим контекст (наш борд) - зачем?
// задача: есть стейт(борд) он в одном компоненте, но нам нужно будет его заюзать как минимум в 1 другом компоненте (Letter)
// чтобы получить const letter = board[...][...] 
// делаем хранилище - провайдер + кидаем сюда весь нужный нам контекст



import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { boardDefault } from '../words'
import wordBank from '../wordle-bank.txt'

export const BoardContext = createContext(null) // создали + обозвали


//создаем сам провайдер (всегда принимает children)


const BoardContextProvider = ({children}) => {

    //themes 

    const [theme, setTheme] = useState({body: 'bg-[#121212]', correct: 'bg-lime-300', almost: 'bg-amber-400'})

    //делаем функцию, которая будет создавать Set из слов и брать рандомно какое-то слово, Set лучше чем Array просто (т.к., например includes в списке будет проходить по каждому слову и проверять его => такой подход затратный, а Set сразу проверяет (мгновенно!))


    
    const generateWordSet = async () => {
        let wordSet = new Set()
        let newWord;
        await fetch(wordBank)
                .then(resp => resp.text())
                .then(data => {
                    const wordArray = data.split(`\n`)
                    newWord = wordArray[Math.floor(Math.random() * wordArray.length)]
                    wordArray.forEach(word => {
                        wordSet.add(word)
                    })
                })
                
        return {wordSet, newWord}
    }
// но как мы достанем слова из файла? - fetch + fetch - async надо помнить! => await


    const [correctWord, setCorrectWord] = useState('')

// const newWord = () => generateWordSet().then(set => setCorrectWord(([...set.values()][Math.floor(Math.random() * set.size)])))


    
    const [neNice, setNeNice] = useState(false)

    const [board, setBoard] = useState(boardDefault) // создали стейт, в котором будет храниться и изменяться инфа, помещаем наш дефолт борд туда (пустой)

    const [gameOver, setGameOver] = useState({gameOver: false, win: false})


    
    //тут уже создаем все, что хотим (нам нужен стейт с бордом)

    // const [currentRow, setCurrentRow] = useState(0)
    // const [currentCell, setCurrentCell] = useState(0) 

    //зачем же мне делать 2 стейта, когда можно создать 1 и в него засунуть объект

    const [currentAttempt, setCurrentAttempt] = useState({row: 0, cell: 0})

    // const correctWord = 'RIGHT' // пусть это пока что правильное слово, передадим в Letter
    //в Letter'е напишем всю логику для определения буквы

    

    console.log(correctWord)


    // const correctWord2 = [...wordBank.values()[Math.floor(Math.random() * wordBank.size)]]

    

    //в вордле есть такая штука, что ты энтер жмешь и буквы убираются или выделяются на клавиатуре
    //надо это захендлить 

    const [disabledLetters, setDisabledLetters] = useState([])
    const [greenLetters, setGreenLetters] = useState([])
    const [orangeLetters, setOrangeLetters] = useState([])

    // но как это заставить работать?
    // нажали энтер (т.е. перешли на новую строчку, т.е. изменился currentAttempt.row вот тогда мы хотим буквы получить, которые были в строке)
    // следовательно нам тут очень пригодится useEffect, который будет зависеть от currentAttempt.row
    //
    

    //но все время угадывать слово HELLO впадлу___)), нужно больше слов
    //скачиваем словечки (или сами пишем))))) и идем в наш words.js файл 

    //сделаем функции для клавиш, т.к. они нам понадабятся еще + мы захламляем Key компонент(т.е. вредители мы)

    const [wordSet, setWordSet] = useState(new Set())

    const onEnter = () => {


            if (currentAttempt.cell !== 5) return


            //но надо проверять, чтобы человек вводил именно слова из банка, а не просто QWeqweqweqejiqojeiojiwqeioqjeiow 
            //перебираем строчку, которую игрок ввел и смотрим на само слово + проверяем его

            let currWord = '';
            for (let i = 0; i < 5; i++) {
                
                console.log(board[currentAttempt.row][i])
                currWord += board[currentAttempt.row][i]
                
            }

            

            if (wordSet.wordSet.has(currWord.toLowerCase())) {
                setCurrentAttempt({row: currentAttempt.row + 1, cell: 0})
                
            } else {
                setNeNice(!neNice)
                setTimeout(() => {
                    setNeNice(false)
                }, 300);
                return
            }

            setNeNice(false)
            // console.log(!wordSet.has(currWord))

            if (currWord === correctWord) {
                setGameOver({gameOver: true, win: true})
            } else if (currWord !== correctWord && currentAttempt.row === 5) {
                setGameOver({gameOver: true, win: false})
            }

            
    }

    const onDelete = () => {
            if (currentAttempt.cell === 0) return
            const newBoard = [...board]
            newBoard[currentAttempt.row][currentAttempt.cell - 1] = ''
            setBoard(newBoard)
            setCurrentAttempt({row: currentAttempt.row, cell: currentAttempt.cell - 1})
    }

    const onSelect = (keyVal) => {
        if (currentAttempt.cell > 4) return
        const newBoard = [...board]
        newBoard[currentAttempt.row][currentAttempt.cell] = keyVal; // отлично! у нас изменяется 1ая клетка, но нам то нужно чтобы менялись и остальные тоже! => стейт
        setBoard(newBoard)
        setCurrentAttempt({...currentAttempt, cell: currentAttempt.cell + 1})
    }




    

    useEffect(() => {
        generateWordSet()
            .then(set => {
                setWordSet(set)
                setCorrectWord(set.newWord.toUpperCase())
            })
    }, [])




    const checkWordSet = () => console.log(wordSet)

//как это юзать теперь?
//нам надо генерировать новое слово каждый раз, когда игра начинается, т.е. при первом рендере App компоненты
// следовательно можно заюзать useEffect с пустыми зависимостями (запустится только 1 раз при рендере) и вызвать там эту функцию и как-то взять слово


// console.log(generateWordSet())



    // const onSelectLetter = (children) => {
    //     onEnter(children)
    //     onDelete(children)
    //     onSelect(children)
    // }

    //уже в провайдере создаем объект, в который положим то, что хотим передавать другим ребятам

    const contextValue = {
        board,
        setBoard,
        currentAttempt,
        setCurrentAttempt,

        onEnter,
        onDelete,
        onSelect,

        correctWord,

        generateWordSet,

        checkWordSet,


        neNice,
        setNeNice,


        
        disabledLetters,
        greenLetters,
        orangeLetters,

        setDisabledLetters,
        setGreenLetters,
        setOrangeLetters,

        gameOver,

        theme,
        setTheme,
    }

    return (
        <BoardContext.Provider value={contextValue} >
            {children}
        </BoardContext.Provider>
    )
}

export default BoardContextProvider

// все! осталось обернуть все приложение