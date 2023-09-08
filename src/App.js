import './App.css';
import { Component } from 'react';
import { Header } from './Header';
import { Juego } from './Juego';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { nombre: null }
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <input type="text" id="nombre" placeholder="Ingrese su Nombre" onChange={(e) => this.setState({ nombre: e.target.value })} />
        <Juego nombre={this.state.nombre} />
      </div>
    );
  }
}
