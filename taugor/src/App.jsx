

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home'
// import Login from './login'
import Login from './login'
import Lista from  './lista'
import Criacao from './criacao'
import DetalhesCandidato from './DetalhesCandidato';
import Historico from './historicoEdicoes'
import "./App.css"
import "./styles/Login.css"



function App() {


  return (

    <div className='App'>
      <Router>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detalhes/:id" element={<Historico />} />
          <Route path="/lista" element={<Lista />} />
          <Route path="/cadastrar" element={<Criacao />} />
          <Route path="/users/:id" element={<DetalhesCandidato />} />


        </Routes>
      </Router>

    </div>

  )
}

export default App