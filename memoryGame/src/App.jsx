import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./components.jsx"
import { DashBoard, Main } from './components.jsx'

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameWin, setGameWin] = useState(false);

    function handleGameStart() {
        setGameStarted(!gameStarted);
    }

    const [score, setScore] = useState(0);

    function handleScore() {
        setScore(score + 1);
    }

    useEffect(() => {
        if (score === 14) {
            setGameWin(true);
        }
    }, [score]);

    function resetScore() {
        setScore(0)
    }


    return (
        <div className='main'>
            <DashBoard 
                gameStarted = {gameStarted} 
                setGameStarted = {handleGameStart}
                score = {score}
                setScore = {handleScore}
            />
            <Main 
                gameStarted = {gameStarted} 
                setGameStarted = {handleGameStart}
                score = {score}
                setScore = {handleScore}
                resetScore = {resetScore}
                gameWin = {gameWin}
            />
        </div>
    )

}

export default App
