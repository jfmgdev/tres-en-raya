import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Celda } from './components/Celda'
import { checkGanador, checkEmpate } from './logica/logica'
import { turnos } from './constants'
import { guardarPartida, reiniciarPartida } from './storage/index.js'

function App() {

  const [tablero, setTablero] = useState(() => {
    // Evitamos que lea en cada renderizado, solo cuando se inicia el estado
    const tableroGuardado = window.localStorage.getItem("tablero")
    return tableroGuardado ? JSON.parse(tableroGuardado) : Array(9).fill(null)
  })

  const [turno, setTurno] = useState(() => {
    // Evitamos que lea en cada renderizado, solo cuando se inicia el estado ...
    const turnoGuardado = window.localStorage.getItem("turno")
    return turnoGuardado ? turnoGuardado : turnos.x
  })

  const [ganador, setGanador] = useState(null)

  const handleClick = (index) => {
    if (tablero[index] || ganador) {
      return
    }

    const nuevoTablero = [...tablero]
    nuevoTablero[index] = turno
    const nuevoTurno = turno === turnos.x ? turnos.o : turnos.x

    setTablero(nuevoTablero)
    setTurno(nuevoTurno)


    guardarPartida(nuevoTablero, nuevoTurno)

    const resultado = checkGanador(nuevoTablero)

    if (resultado) {
      setGanador(resultado)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } else if (checkEmpate(nuevoTablero)) {
      setGanador(false)
    }
  }

  const handleReset = () => {
    setTablero(Array(9).fill(null))
    setTurno(turnos.x)
    setGanador(null)

    reiniciarPartida()
  }

  return (
    <>
      <div className="tablero-tres-en-raya">
        {tablero.map((valor, index) => (
          <Celda
            key={index}
            index={index}
            handleClick={handleClick}
            disabled={valor || ganador}
          >{valor}</Celda>
        ))}
      </div>
      <div>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
      <div>
        {ganador ? (
          <h2>El ganador es {ganador}</h2>
        ) : ganador === false ? (
          <h2>Empate</h2>
        ) : (
          <h2>Turno de {turno}</h2>
        )}
      </div>
    </>
  )
}

export default App
