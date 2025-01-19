import { useState } from "react"
import "./components.css"

function DashBoard() {
    return (
        <div className="dashboard">
            <div className="dashboard-left">
                <h1>MEMORY GAME</h1>
            </div>
            <div className="dashboard-right">
                <h2>SCORE: </h2>
                <h2>HIGH SCORE: </h2>
            </div>
        </div>
    )
}

function Main() {
    const [gameStarted, setGameStarted] = useState(false);

    function handleGameStart() {
        setGameStarted(true);
        setGameboard();
    }

    function getRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
      }

    async function setGameboard() {
        const pokemonArray = []
        for (let i = 0; i < 14; i++) {
            const setArray = new Set();
            let randomPokemonSelect = getRandomNumber();
            setArray.add(random)
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonSelect}/`);
            let pokemonSelect = await response.json();
            console.log(pokemonSelect);

        }
    }
    
    return (
        <>
            {!gameStarted && (
                <div className="button-container">
                    <button className="start-game-button" onClick={handleGameStart}>START GAME</button>
                </div>
            )}
            {gameStarted && (
                <div className="card-container">
                    
                </div>
            )}
        </>
    )

}

export {DashBoard, Main}