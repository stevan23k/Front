import React from 'react'

import {Routes,Route} from "react-router-dom"
import Inicio from '../components/Inicio'

const Rutas = () => {
  return (
    <Routes>
        <Route path='/' element={<Inicio/>}/>
    </Routes>

  )
}

export default Rutas
