import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Books from './Books'
import Register from './Register'


function Allroutes() {
  return (
    <Routes>
        <Route path="/" element={< Books />} />
        < Route path='/signup' element={< Register/>}></Route>
    </Routes>
  )
}

export default Allroutes