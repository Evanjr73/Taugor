

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home'
import Login from './login'
import Criacao from './criacao'
import "./App.css"



function App() {


  return (

    <div className='App'>
      <Router>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastrar" element={<Criacao />} />


        </Routes>
      </Router>

    </div>

  )
}

export default App