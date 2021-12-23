import React from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import SigninForm from './components/SigninForm/SigninForm'
import Navbar from './components/Navbar/Navbar'
import UserBlogs from './components/UserBlogs/UserBlogs'
import SignupForm from './components/SignupForm/SignupForm'
import "./App.css"
function App() {
  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path = "/signin" element= {<SigninForm/>}></Route>
        <Route path = "/signup" element= {<SignupForm/>}></Route>
        <Route path = "/blog/:username" element={<UserBlogs/>}></Route>
        <Route path ="/" element={<Navigate to="/signin"/>}></Route>
      </Routes>
    </Router>
  );
}

export default App
