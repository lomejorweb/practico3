import styled from 'styled-components';


// Barra de navegacion
const Bar = styled.nav`
  font-size: 18px;
  background-image: linear-gradient(260deg,  rgb(6, 201, 29, 255) 0%, rgb(0,0,0,255) 100%); 
  border: 1px solid rgba(0,0,0,0.2);
  padding-bottom: 10px;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
    height: 70px;
    align-items: center;
  }
`

// Titulo de header
const Titulo = styled.p`
  font-size: 24px;
  color: white;
  font-family: monospace;
  margin: 20px;
  font-style: italic;
`

// Header
export function Header() {
  return (<header>
    <Bar>
      <Titulo>
        Piedra, Papel o Tijera
      </Titulo>
    </Bar>
  </header>);
}
