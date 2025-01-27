import { useEffect, useState } from "react"
import "./components.css"

function DashBoard( {gameStarted, setGameStarted, score, setScore} ) {
    function resetGame () {
        if (gameStarted) {
            setScore(0);
            setGameStarted();
        }
    }

    return (
        <div className="dashboard">
            <div className="dashboard-left">
                <h1 onClick={resetGame}>MEMORY GAME</h1>
            </div>
            <div className="dashboard-right">
                <h2>SCORE: {score} / 14</h2>
            </div>
        </div>
    )
}

function Main( {gameStarted, setGameStarted, setScore, resetScore, gameWin} ) {

    const [fetchedPokemonList, setFetchedPokemonList] = useState([]);
    const [pokemonList, setPokemonList] = useState([]);
    const [round, setRound] = useState(0);
    const [gameLost, setGameLost] = useState(false);
    const [gameRestarted, setGameRestarted] = useState(false);

    function handleGameRestart() {
        setGameRestarted(!gameRestarted);
        setGameLost(!gameLost);
        resetScore();
    }

    function getRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    function changeRound(pokemonID) {
        shufflePokemonList();
        setRound(round + 1);
        checkCorrectCard(pokemonID)
    }

    function checkCorrectCard(pokemonID) {
        setFetchedPokemonList((prevList) => {
            console.log(fetchedPokemonList[pokemonID])
            const updatedList = [...prevList];
            if (!updatedList[pokemonID].clicked) {
                setTimeout(() => {
                    setScore(); 
                }, 0); 
                updatedList[pokemonID] = { 
                    ...updatedList[pokemonID], 
                    clicked: true,             
                };
            } else {
                handleGameLose(); 
            }
            return updatedList; 
        });
    }

    function handleGameLose() {
        setGameLost(!gameLost);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); 
          [array[i], array[j]] = [array[j], array[i]];  
        }
        return array;
    }

    function shufflePokemonList() {
        const shuffledArray = shuffleArray([...fetchedPokemonList]);
        setPokemonList(shuffledArray);
    }

    useEffect(() => {
        const fetchPokemon = async () => {
            const pokemonArray = []
            const setArray = new Set();
            for (let i = 1; i < 15; i++) {
                let randomPokemonId = null;
                while (setArray.size !== i) {
                    randomPokemonId = getRandomNumber();
                    setArray.add(randomPokemonId)
                }
                    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`);
                    let pokemonSelect = await response.json();
                    let pokemonObject = {
                        name: pokemonSelect.name,
                        imgUrl: pokemonSelect.sprites["front_default"],
                        Id: i - 1,
                        clicked: false,
                    }
                pokemonArray.push(pokemonObject)            
            }
            setFetchedPokemonList(pokemonArray);
            setPokemonList(pokemonArray)
        };
        fetchPokemon();
    }, [gameRestarted])
 
    return (
        <>
            {!gameStarted && !gameLost && !gameWin && (
                <div className="button-container">
                    <button className="start-game-button" onClick={setGameStarted}>START GAME</button>
                </div>
            )}

            {gameStarted && !gameLost && !gameWin && (
                <div className="card-container">
                    {pokemonList.map((pokemon) => (
                        <div className="card" key={pokemon.Id} onClick={() => changeRound(pokemon.Id)}>
                            <h3 className="pokemon-name">{pokemon.name}</h3>
                            <img className="pokemon-image" src={pokemon.imgUrl}></img>
                        </div>
                    ))}
                </div>
            )}
            {gameLost  && !gameWin && (
                <div className="lose-message">
                    <p>{"You Lose"}</p>
                    <button className="restart-button" onClick={handleGameRestart}>RESTART GAME</button>
                </div>
            )}

            {gameWin && (
                <div className="win-message">
                   <p>{"You Win"}</p>
               </div>
            )}
        </>
    )

}




export {DashBoard, Main}