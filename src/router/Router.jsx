import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CustomRoute from './CustomRoute'
import Login from '../Page/Login/containers/Login'
import Board from '../Page/Board'

const Router =() => {
    return (
      <Routes>
        <Route path="/board" element={<CustomRoute child={Board}></CustomRoute>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    )
}

export default Router
