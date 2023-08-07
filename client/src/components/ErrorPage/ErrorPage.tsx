import React, {useEffect} from 'react';
import { useParams, useNavigate, Params, NavigateFunction } from 'react-router-dom';
import './ErrorPage.css'

interface errorsMap {
    [key: string]: string
}

const ErrorPage = (): JSX.Element => {
    const {errorNum}: Readonly<Params<string>> = useParams()
    const navigate: NavigateFunction = useNavigate()
    const errorMessages: errorsMap = {"404": "Resource not found", "500": "Server Error"}
    const token:string = localStorage.getItem("jwt") ?? ''

    useEffect((): void =>{
        if(!token) {
            navigate("/signin")
        }
    }, [])
    return (
        <div id="error-message">
            {token ? errorNum + " " + errorMessages[errorNum as string]: ''}
        </div>
    );
};

export default ErrorPage;