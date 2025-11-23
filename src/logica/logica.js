export const checkGanador = (tableroCopia) => {
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

export const checkEmpate = (tableroCopia) => {
    return tableroCopia.every(celda => celda)
}
