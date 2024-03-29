import {useState, useEffect} from 'react'
import "./SigninForm.css"
import { useNavigate, NavigateFunction } from 'react-router-dom';

import axios, { AxiosError, AxiosResponse } from 'axios'

const SigninForm = (): JSX.Element => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [webMessage, setWebMessage] = useState<string>("")
    const navigate:NavigateFunction = useNavigate()

    axios.defaults.withCredentials = true

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value)
    }

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value)
    }

    const handleEnterClick: React.MouseEventHandler<HTMLButtonElement> = (): void =>{
        axios.post('http://localhost:8080/api/v1/auth/authenticate', {
            username: username,
            password: password
          })
          .then(function (response: AxiosResponse): void {
            localStorage.setItem('jwt', response.data.token)
            localStorage.setItem('username', response.data.username)
            navigate(`/blog/${response.data.username}`)
          })
          .catch(function (error: AxiosError): void {
            if(error?.response?.status.toString() == "403"){
                setWebMessage("Invalid Username/Password")
            }
          });
    }

    const handleCreateAccountClick:React.MouseEventHandler<HTMLButtonElement> = (): void =>{
        navigate(`/signup`)
    }

    useEffect((): void =>{
        if (localStorage.getItem('jwt') ) {
            navigate(`/blog/${localStorage.getItem("username")}`)
        }
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