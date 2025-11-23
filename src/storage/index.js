export const guardarPartida = (tablero, turno) => {
    window.localStorage.setItem("tablero", JSON.stringify(tablero))
    window.localStorage.setItem("turno", turno)
}

export const reiniciarPartida = () => {
    window.localStorage.removeItem("tablero")
    window.localStorage.removeItem("turno")
}