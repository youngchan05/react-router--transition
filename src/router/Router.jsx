import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Contact from '../Page/Contact/containers/Contact'
import About from '../Page/About/containers/About'
import SlideRoute from './SlideRoute'
import Home from '../Page/Home/containers/Home'

const Router =() => {
    return (
      <Routes>
        <Route path="/" element={<SlideRoute name={'home'}><Home/></SlideRoute>}/>
        <Route path="/about" element={<SlideRoute name={'about'}><About/></SlideRoute>}/>
        <Route path="/contact" element={<SlideRoute name={'contact'}><Contact/></SlideRoute>}/>
      </Routes>
    )
}

export default Router
