import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Page/Login/Login'

const Router =() => {
    return (
      <Routes>
        <Route path="/" element={<Login/>}/>
      </Routes>
    )
}

export default Router
