import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CustomRoute from './CustomRoute'
import Login from '../Page/Login/containers/Login'
import Board from '../Page/Board'
import Parcel from '../Page/Parcel/containers/Parcel'

const Router =() => {
    return (
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/board" element={<CustomRoute child={Board}></CustomRoute>}/>
        <Route path="/parcel" element={<CustomRoute child={Parcel}></CustomRoute>}/>
      </Routes>
    )
}

export default Router
