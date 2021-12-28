import React, {useEffect, useState}  from "react"
import "./Navbar.css"
import userIcon from './logo-images/user_icon.png'
import { useNavigate } from 'react-router-dom'

const axios  = require('axios')

const Navbar = () => {
    const [username, setUsername] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userSearch, setUserSearch] = useState("")
    const navigate = useNavigate()
    const url = window.location.pathname.split('/').pop();

    axios.defaults.withCredentials = true

    const handleSignOut = () => {
        axios.post('http://localhost:3000/signout')
        .then(function (response) {
            setIsLoggedIn(!response.data.loggedOut)
            navigate(`/signin`) 
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          });
    }

    const handleUserSearchChange = (event)=>{
        setUserSearch(event.target.value)
    }

    const handleUserSearchClick = ()=>{
        navigate(`/blog/${userSearch}`)
    }

    useEffect(()=>{
        axios.get('http://localhost:3000/signin')
        .then(function (response) {
            setUsername(response.data.username)
            setIsLoggedIn(response.data.loggedIn)
            console.log(response)
        })
        .catch(function (error) {
            setUsername(error.response.data.username)
            setIsLoggedIn(error.response.data.loggedIn)
            console.log(error)
        });


    }, [url])

    return (
        <div id="navbar">
            <div id="left-side-nav">
                <div id="web-logo">Blogged</div>
            </div>
            { isLoggedIn ? <div id="right-side-nav">
                <input id="user-search-bar" type="text" placeholder="Insert name of user" onChange={handleUserSearchChange}></input>
                <button id="user-search-button" onClick={handleUserSearchClick}>Search</button>
                <img id="user-icon" src={userIcon}></img>
                <div id="profile-identifier">{username}</div>
                <button id="signout-button"onClick={handleSignOut}>Sign Out</button>
            </div> : null }
        </div>
    )
}


export default Navbar