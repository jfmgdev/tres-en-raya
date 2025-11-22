import { useState } from 'react'
import './App.css'

function App() {

  const arrayTablero = Array(9).fill(null)

  const [turno, setTurno] = useState("X")

  const [tablero, setTablero] = useState(arrayTablero)

  const [ganador, setGanador] = useState()

  const [empate, setEmpate] = useState()

  const handleClick = (index) => {
    if (tablero[index] || ganador) {
      return
    }

    const nuevoTablero = [...tablero]
    nuevoTablero[index] = turno

    const size = 3

    // Ganador por filas
    for (let i = 0; i < size; i++) {
      const fila = i * size
      if (nuevoTablero[fila] && nuevoTablero[fila] === nuevoTablero[fila + 1] && nuevoTablero[fila] === nuevoTablero[fila + 2]) {
        setGanador(turno)
      }
    }

    // Ganador por columnas
    for (let i = 0; i < size; i++) {
      const columna = i
      if (nuevoTablero[columna] && nuevoTablero[columna] === nuevoTablero[columna + size] && nuevoTablero[columna] === nuevoTablero[columna + size * 2]) {
        setGanador(turno)
      }
    }

    // Ganador por diagonales
    if (nuevoTablero[0] && nuevoTablero[0] === nuevoTablero[4] && nuevoTablero[0] === nuevoTablero[8]) {
      setGanador(turno)
    }

    if (nuevoTablero[2] && nuevoTablero[2] === nuevoTablero[4] && nuevoTablero[2] === nuevoTablero[6]) {
      setGanador(turno)
    }

    if (nuevoTablero.every(celda => celda)) {
      setEmpate(true)
    }

    setTablero(nuevoTablero)
    setTurno(turno === "X" ? "O" : "X")
    //nuevoTablero[index].disabled = true
  }

  const handleReset = () => {
    setTablero(arrayTablero)
    setTurno("X")
    setGanador(null)
    setEmpate(false)
  }

  return (
    <>
      <div className="tablero-tres-en-raya">
        {tablero.map((valor, index) => (
          <button
            key={index}
            className="celda"
            onClick={() => handleClick(index)}
            disabled={valor || ganador}
          >
            {valor}
          </button>
        ))}
      </div>
      <div>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
      <div>
        {ganador ? (
          <h2>El ganador es {ganador}</h2>
        ) : empate ? (
          <h2>Empate</h2>
        ) : (
          <h2>Turno de {turno}</h2>
        )}
      </div>
    </>
  )
}

export default App
