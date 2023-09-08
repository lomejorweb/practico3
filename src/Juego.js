import { Component } from 'react';


// Clase principal del juego
export class Juego extends Component {
  estadoInicial = {
    ganadorParcial: null,
    eleccionJugador: null,
    eleccionComputadora: null,
    puntajeJugador: 0,
    puntajeComputadora: 0,
    empates: 0,
    ganador: null,
  };

  constructor(props) {
    super(props);
    this.state = this.estadoInicial;
  }

  reiniciar = () => {
    this.setState(this.estadoInicial);
  };

  // Dados dos elecciones, decide quien gano la jugada
  quienGanaJugada = (eleccionJugador, eleccionComputadora) => {
    if (eleccionJugador == eleccionComputadora) {
      return "EMPATE";
    } else if ((eleccionJugador == "PIEDRA" && eleccionComputadora == "TIJERA") ||
      (eleccionJugador == "TIJERA" && eleccionComputadora == "PAPEL") ||
      (eleccionJugador == "PAPEL" && eleccionComputadora == "PIEDRA")) {
      return "JUGADOR";
    } else {
      return "COMPUTADORA";
    }
  };

  // Atiende una nueva jugada.
  // Calcula el nuevo puntaje y decide si hay un ganador.
  manejarJugada = (eleccionJugador) => {
    // si ya hay un ganador, no se puede seguir jugando
    if (this.state.ganador) {
      return;
    }

    // si no se ingresó el nombre, no se puede jugar
    if (!this.props.nombre) {
      alert('Ingrese su nombre');
      return;
    }

    let { puntajeJugador, puntajeComputadora, empates } = this.state;
    const choices = ["PIEDRA", "PAPEL", "TIJERA"];
    const eleccionComputadora = choices[Math.floor(Math.random() * choices.length)];
    const ganadorParcial = this.quienGanaJugada(eleccionJugador, eleccionComputadora);

    if (ganadorParcial == "JUGADOR") {
      puntajeJugador = this.state.puntajeJugador + 1;
    } else if (ganadorParcial == "COMPUTADORA") {
      puntajeComputadora = this.state.puntajeComputadora + 1;
    } else {
      empates = this.state.empates + 1;
    }

    let ganador = null;
    if (puntajeJugador == 3 || puntajeComputadora == 3 || puntajeJugador + puntajeComputadora + empates == 5) {
      // cuando alguno llega a tres o se juegan cinco rondas, se termina el juego
      if (puntajeJugador > puntajeComputadora) {
        ganador = this.props.nombre.toUpperCase();
      } else if (puntajeComputadora > puntajeJugador) {
        ganador = "COMPUTADORA";
      } else {
        ganador = "EMPATE";
      }
    }

    this.setState({
      ganadorParcial: ganadorParcial,
      eleccionJugador: eleccionJugador,
      eleccionComputadora: eleccionComputadora,
      puntajeJugador: puntajeJugador,
      puntajeComputadora: puntajeComputadora,
      empates: empates,
      ganador: ganador,
    });
  };

  render() {
    const { eleccionJugador, eleccionComputadora, puntajeJugador, puntajeComputadora, ganadorParcial, empates, ganador } = this.state;

    return (
      <div>
        <h3>Seleccione su jugada:</h3>
        <button id="piedra" type="button"> <img src={process.env.PUBLIC_URL + "/piedra.jpg"} height="90" width="90" onClick={() => this.manejarJugada("PIEDRA")} /></button>
        <button id="papel" type="button"> <img src={process.env.PUBLIC_URL + "/papel.png"} height="90" width="90" onClick={() => this.manejarJugada("PAPEL")} /></button>
        <button id="tijera" type="button"> <img src={process.env.PUBLIC_URL + "/tijera.png"} height="90" width="90" onClick={() => this.manejarJugada("TIJERA")} /></button>
        <br />

        {!!this.props.nombre ? <p id="eleccionusuario">{this.props.nombre} eligió: {eleccionJugador}</p> : <br />}
        <p id="eleccionpc">La Computadora eligió: {eleccionComputadora}</p>
        <p id="resultadoparcial">El ganador de la jugada fue: {ganadorParcial} </p>
        <br />

        <p id="resultado">El resultado final es: </p>
        {!!this.props.nombre ? <p id="resultadousuario">{this.props.nombre}: {puntajeJugador}</p> : <br />}
        <p id="resultadopc">Computadora: {puntajeComputadora}</p>
        <p id="resultadoempate">Empates: {empates}</p>
        <p id="resultadofinal">Ganador: {ganador ? ganador : null}</p>

        <button id="reset" onClick={() => this.reiniciar()}> Reiniciar </button>
      </div>
    );
  }
}
