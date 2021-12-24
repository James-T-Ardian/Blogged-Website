import React from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import SigninForm from './components/SigninForm/SigninForm'
import Navbar from './components/Navbar/Navbar'
import UserBlog from './components/UserBlog/UserBlog'
import SignupForm from './components/SignupForm/SignupForm'
import Footer from './components/Footer/Footer'

import "./App.css"
function App() {
  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path = "/signin" element= {<SigninForm/>}></Route>
        <Route path = "/signup" element= {<SignupForm/>}></Route>
        <Route path = "/blog/:username" element={<UserBlog/>}></Route>
        <Route path ="/" element={<Navigate to="/signin"/>}></Route>
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App
