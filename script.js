let tablero = ["", "", "", "", "", "", "", "", ""];
let jugador = 'X';
let perder = false;
let partidas = 0;
let victoriasX = 0;
let victoriasO = 0;
let empates = 0;



const celdas = document.querySelectorAll('.celda');
const contadorPartidas = document.getElementById('partidas');
const marcadorX = document.getElementById('ganador-x');
const marcadorO = document.getElementById('ganador-o');
const marcadorEmpates = document.getElementById('empates');
const abrirAyudaBtn = document.getElementById('abrir-ayuda');
const cerrarAyudaBtn = document.getElementById('cerrar-ayuda');
const panelAyuda = document.getElementById('panel-ayuda');
const color = document.querySelector('body');
const oscuro = document.querySelector('body')
const nivel = 3
var negro = false

function cambiarColor() {
    if(negro == true){
        color.style.backgroundColor = "white";
        negro = false;
    } else {
    color.style.backgroundColor = "black";
    negro = true}

}

function actualizarTablero() {
    celdas.forEach((celda, index) => {
        celda.textContent = tablero[index];
    });
}

// Verifica si hay un ganador
function ganador() {
    // Filas
    if (
        (tablero[0] === jugador && tablero[1] === jugador && tablero[2] === jugador) ||
        (tablero[3] === jugador && tablero[4] === jugador && tablero[5] === jugador) ||
        (tablero[6] === jugador && tablero[7] === jugador && tablero[8] === jugador)
    ) {
        return true;
    }

    // Columnas
    if (
        (tablero[0] === jugador && tablero[3] === jugador && tablero[6] === jugador) ||
        (tablero[1] === jugador && tablero[4] === jugador && tablero[7] === jugador) ||
        (tablero[2] === jugador && tablero[5] === jugador && tablero[8] === jugador)
    ) {
        return true;
    }

    // Diagonales
    if (
        (tablero[0] === jugador && tablero[4] === jugador && tablero[8] === jugador) ||
        (tablero[2] === jugador && tablero[4] === jugador && tablero[6] === jugador)
    ) {
        return true;
    }
    return false;
}

// Cambiar de jugador
function cambiarJugador() {
    if (jugador === "X") {
        jugador = "O";
    } else {
        jugador = "X";
    }
}

// Reiniciar el tablero
function reiniciarTablero() {
    tablero = ["", "", "", "", "", "", "", "", ""];
    perder = false;
    actualizarTablero();
    cambiarJugador();
}

function actualizarMarcador() {
    marcadorX.textContent = `Victorias de X: ${victoriasX}`;
    marcadorO.textContent = `Victorias de O: ${victoriasO}`;
    marcadorEmpates.textContent = `Empates: ${empates}`;
}

function incrementarContador() {
    partidas++;
    contadorPartidas.textContent = `${partidas}`;
}

celdas.forEach((celda, index) => {
    celda.addEventListener('click', () => {

        // Iniciamos contador
        iniciarTemporizador();
        // Si la celda está ocupada o la partida ha terminado
        if (perder || tablero[index]) {
            return;
        }

        // Marcar la celda con el símbolo del jugador actual
        tablero[index] = jugador;
        actualizarTablero();

        
        // Comprobar si hay un ganador
        if (ganador()) {
            alert(`¡El jugador ${jugador} ha ganado!`);
            perder = true;
            detenerTemporizador();
            actualizarPantalla();

            if (jugador === 'X') {
                victoriasX++;
            } else {
                victoriasO++;
            }

            actualizarMarcador();
            incrementarContador();
            siguienteNivel();
            return;
        }

        if (!tablero.includes('')) {
            alert('¡Empate!');
            empates++;
            actualizarMarcador();
            incrementarContador();
            perder = true;
            detenerTemporizador();
            return;
        }

        // Cambiar de turno
        cambiarJugador();
    });
});

function siguienteNivel() {
    if (victoriasX === nivel) {
        alert(`${jugador} `)
        cambiarJugador();
        alert(`${jugador} eres un inutil 💩`)
    }
    if (victoriasO === nivel) {
        alert(`${jugador} eres un maestro 🎉`)
        cambiarJugador();
        alert(`${jugador} eres un inutil 💩`)
    }
}

// reloj 
    
let minutos = 0;
let segundos = 0;
let temporizador = null;

const pantallaTiempo = document.querySelector('.time-display');
const botonIniciar = document.getElementById('start');
const botonDetener = document.getElementById('stop');
const botonReiniciar = document.getElementById('reset');

function actualizarPantalla() {
    let segundosFormateados = segundos;
    if (segundos < 10) {
        segundosFormateados = "0" + segundos;
    }
    pantallaTiempo.textContent = minutos + ":" + segundosFormateados;
}

function iniciarTemporizador() {
    if (temporizador === null) {
        temporizador = setInterval(function () {
            segundos++;
            if (segundos === 60) {
                segundos = 0;
                minutos++;
            }
            actualizarPantalla();
        }, 1000);
    }
}

function detenerTemporizador() {
    clearInterval(temporizador);
    temporizador = null;
}

function reiniciarTemporizador() {
    detenerTemporizador();
    minutos = 0;
    segundos = 0;
    actualizarPantalla();
}

botonIniciar.addEventListener('click', iniciarTemporizador);
botonDetener.addEventListener('click', detenerTemporizador);
botonReiniciar.addEventListener('click', reiniciarTemporizador);

actualizarPantalla();

// panel de ayuda

abrirAyudaBtn.addEventListener('click', () => {
    panelAyuda.classList.remove('oculto');
});

cerrarAyudaBtn.addEventListener('click', () => {
    panelAyuda.classList.add('oculto');
});

// pantalla de inicio

document.getElementById('inicio').addEventListener('click', () => {
    document.getElementById('pantalla-inicio').style.display = 'none';
    document.getElementById('tabla-juego').style.display = 'grid';
    document.getElementById('container').style.display = 'block';
    document.getElementById('reiniciar').style.display = 'block';
})

// reiniciar tablero y temporizador al hacer click en reiniciar

const reiniciar = document.getElementById('reiniciar');
reiniciar.addEventListener('click', () => {
    reiniciarTablero();
    reiniciarTemporizador();
});
