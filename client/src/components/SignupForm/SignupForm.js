import React, {useState, useEffect} from 'react'
import "./SignupForm.css"
import { useNavigate } from 'react-router-dom';

const axios  = require('axios')

const SignupForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [serverMessage, setServerMessage] = useState("")
    const navigate = useNavigate()

    axios.defaults.withCredentials = true

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handlePasswordCheckChange = (event)=>{
        setPasswordCheck(event.target.value)
    }

    const handleEnterClick = () => {
        axios.post('http://localhost:3000/signup', {
            username: username,
            password: password
          })
          .then(function (response) {
            setServerMessage(response.data.msg)
          })
          .catch(function (error) {
            setServerMessage(error.response.data.msg)
          });
    }

    const handleSignInClick = () =>{
        navigate('/signin')
    }

    useEffect(()=>{
        axios.get('http://localhost:3000/signin')
        .then(function (response) {
            setServerMessage(response.data.msg) // <= USE THIS IN PRODUCTION
            //navigate(`/blog/${response.data.username}`) <= USE THIS IN DEPLOYMENT
          })
          .catch(function (error) {
            console.log(error)
          });
    }, [])

    return (
        <div id="signup-form">
            <div className="bars-button-container">
                <div className="authentication-identifier-text">Sign Up</div>
                <input className="authentication-input-bar" type="text" value={username} onChange={handleUsernameChange} placeholder="Username"></input>
                <input className="authentication-input-bar" type="text" value={password} onChange={handlePasswordChange} placeholder="Password"></input>
                <input className="authentication-input-bar" type="text" value={passwordCheck} onChange={handlePasswordCheckChange} placeholder="Re-enter Password"></input>
                <button className="authentication-enter-button" onClick={handleEnterClick} disabled={username.length == 0 || password.length == 0 || password !== passwordCheck}>Enter</button>
                <button id="sign-in-button" onClick={handleSignInClick}>Log In Account</button>
                <div className="server-message">{serverMessage}</div>
            </div>
        </div>
    );
};

export default SignupForm;