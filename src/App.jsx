import { useState } from 'react'
import './App.css'

function App() {

  const [tablero, setTablero] = useState(Array(9).fill(null))

  const [turno, setTurno] = useState("X")

  const [ganador, setGanador] = useState(null)

  const checkGanador = (tableroCopia) => {
    const size = 3

    // Ganador por filas
    for (let i = 0; i < size; i++) {
      const fila = i * size
      if (tableroCopia[fila] && tableroCopia[fila] === tableroCopia[fila + 1] && tableroCopia[fila] === tableroCopia[fila + 2]) {
        return tableroCopia[fila]
      }
    }

    // Ganador por columnas
    for (let i = 0; i < size; i++) {
      const columna = i
      if (tableroCopia[columna] && tableroCopia[columna] === tableroCopia[columna + size] && tableroCopia[columna] === tableroCopia[columna + size * 2]) {
        return tableroCopia[columna]
      }
    }

    // Ganador por diagonales
    if (tableroCopia[0] && tableroCopia[0] === tableroCopia[4] && tableroCopia[0] === tableroCopia[8]) {
      return tableroCopia[0]
    }

    if (tableroCopia[2] && tableroCopia[2] === tableroCopia[4] && tableroCopia[2] === tableroCopia[6]) {
      return tableroCopia[2]
    }

    return null;
  }

  const checkEmpate = (tableroCopia) => {
    return tableroCopia.every(celda => celda)
  }

  const handleClick = (index) => {
    if (tablero[index] || ganador) {
      return
    }

    const nuevoTablero = [...tablero]
    nuevoTablero[index] = turno

    setTablero(nuevoTablero)
    setTurno(turno === "X" ? "O" : "X")

    const resultado = checkGanador(nuevoTablero)

    if (resultado) {
      setGanador(resultado)
    } else if (checkEmpate(nuevoTablero)) {
      setGanador(false)
    }
  }

  const handleReset = () => {
    setTablero(Array(9).fill(null))
    setTurno("X")
    setGanador(null)
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
