import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./components.jsx"
import { DashBoard, Main } from './components.jsx'

function App() {
    return (
        <>
            <DashBoard/>
            <Main/>
        </>
    )

}

export default App
