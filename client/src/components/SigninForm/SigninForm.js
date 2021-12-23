import React, {useState, useEffect} from 'react'
import "./SigninForm.css"
import { useNavigate } from 'react-router-dom';

const axios  = require('axios')

const SigninForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [serverMessage, setServerMessage] = useState("")
    const navigate = useNavigate()

    axios.defaults.withCredentials = true

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleEnterClick = () =>{
        axios.post('http://localhost:3000/signin', {
            username: username,
            password: password
          })
          .then(function (response) {
            navigate(`/blog/${response.data.username}`)
          })
          .catch(function (error) {
            setServerMessage(error.response.data.msg)
          });
    }

    const handleCreateAccountClick = () =>{
        navigate(`/signup`)
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
        <div id="signin-form">
            <div className="bars-button-container">
                <div className="authentication-identifier-text">Sign In</div>
                <input className="authentication-input-bar" type="text" value={username} onChange={handleUsernameChange} placeholder="Username"></input>
                <input className="authentication-input-bar" type="text" value={password} onChange={handlePasswordChange} placeholder="Password"></input>
                <button className="authentication-enter-button" onClick={handleEnterClick} disabled={username.length == 0 || password.length == 0}>Enter</button>
                <button id="create-account-button" onClick={handleCreateAccountClick}>Create Account</button>
                <div className="server-message">{serverMessage}</div>
            </div>
        </div>
    );
};

export default SigninForm