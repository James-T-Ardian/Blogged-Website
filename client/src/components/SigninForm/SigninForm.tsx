import {useState, useEffect} from 'react'
import "./SigninForm.css"
import { useNavigate, NavigateFunction } from 'react-router-dom';

import axios, { AxiosError, AxiosResponse } from 'axios'

const SigninForm = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [webMessage, setWebMessage] = useState<string>("")
    const navigate:NavigateFunction = useNavigate()

    axios.defaults.withCredentials = true

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleEnterClick: React.MouseEventHandler<HTMLButtonElement> = () =>{
        axios.post('http://localhost:3000/signin', {
            username: username,
            password: password
          })
          .then(function (response: AxiosResponse) {
            navigate(`/blog/${response.data.username}`)
          })
          .catch(function (error: AxiosError) {
            if(error?.response?.status.toString() == "500"){
                navigate("/500")
            } else {
                setWebMessage(error?.response?.data.msg ?? "Server Error")
            }
          });
    }

    const handleCreateAccountClick = () =>{
        navigate(`/signup`)
    }

    useEffect(()=>{
        axios.get('http://localhost:3000/signin')
        .then(function (response) {
            navigate(`/blog/${response.data.username}`) 
          })
          .catch(function () {
            // No need to handle error
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
                <div className="web-message">{webMessage}</div>
            </div>
        </div>
    );
};

export default SigninForm