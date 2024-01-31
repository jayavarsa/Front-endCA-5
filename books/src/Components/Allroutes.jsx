import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Books from './Books'
import Register from './Register'


function Allroutes() {
  return (
    <Routes>
        {/* main page */}
        <Route path="/" element={< Books />} /> 
        {/* sign up page */}
        < Route path='/signup' element={< Register/>}></Route>
    </Routes>
  )
}

export default Allroutes