import {useState, useEffect} from 'react'
import "./SignupForm.css"
import { useNavigate, NavigateFunction } from 'react-router-dom';

import axios, { AxiosError, AxiosResponse } from 'axios'

const SignupForm = (): JSX.Element => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordCheck, setPasswordCheck] = useState<string>("")
    const [webMessage, setWebMessage] = useState<string>("")
    const navigate: NavigateFunction = useNavigate()

    axios.defaults.withCredentials = true

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value)
    }

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value)
    }

    const handlePasswordCheckChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>): void =>{
        setPasswordCheck(event.target.value)
    }

    const handleEnterClick: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        if(password !== passwordCheck){
            setWebMessage("Passwords do not match")
        } else {
            axios.post('http://localhost:8080/api/v1/auth/register', {
                username: username,
                password: password
            })
            .then(function (): void {
                navigate("/signin")
            })
            .catch(function (error: AxiosError): void {
                if(error?.response?.status.toString() == "409"){
                    setWebMessage("User Already Exists")
                }
            });
        }
        
    }

    const handleSignInClick: React.MouseEventHandler<HTMLButtonElement> = (): void =>{
        navigate('/signin')
    }

    useEffect((): void =>{
        if (localStorage.getItem('jwt') ) {
            navigate(`/blog/${localStorage.getItem("username")}`)
        }
    }, [])

    return (
        <div id="signup-form">
            <div className="bars-button-container">
                <div className="authentication-identifier-text">Sign Up</div>
                <input className="authentication-input-bar" type="text" value={username} onChange={handleUsernameChange} placeholder="Username"></input>
                <input className="authentication-input-bar" type="text" value={password} onChange={handlePasswordChange} placeholder="Password"></input>
                <input className="authentication-input-bar" type="text" value={passwordCheck} onChange={handlePasswordCheckChange} placeholder="Re-enter Password"></input>
                <button className="authentication-enter-button" onClick={handleEnterClick} disabled={username.length == 0 || password.length == 0}>Enter</button>
                <button id="sign-in-button" onClick={handleSignInClick}>Log In Account</button>
                <div className="web-message">{webMessage}</div>
            </div>
        </div>
    );
};

export default SignupForm;