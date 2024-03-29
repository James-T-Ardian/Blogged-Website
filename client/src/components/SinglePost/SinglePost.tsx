import {useState, useEffect} from 'react';
import {useParams, useNavigate, NavigateFunction} from 'react-router-dom'
import './SinglePost.css'

import axios, {AxiosResponse, AxiosError} from 'axios'

const SinglePost = (): JSX.Element => {
    const {username, post_id, purpose}: {[key: string]: string | undefined} = useParams()
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")
    const token:string = localStorage.getItem('jwt') ?? ''

    const navigate: NavigateFunction = useNavigate()
    const todayDate: string = new Date().toISOString().slice(0, 10);

    axios.defaults.withCredentials = true


    const loadPostContents = (): void =>{
        axios.get(`http://localhost:8080/api/v1/posts/${post_id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(function (response: AxiosResponse): void {
            setTitle(response.data.posts[0].title)
            setBody(response.data.posts[0].body)
        })
        .catch(function (error: AxiosError): void {
            if(error?.response?.status.toString() == "500"){
                navigate("/500")
            } else if (error?.response?.status.toString() == "404"){
                navigate("/404")
            } else if(error?.response?.status.toString() == "403"){
                localStorage.clear();
                navigate("/signin")
            }
        })
    }

    const handleBackButtonClick: React.MouseEventHandler<HTMLButtonElement> = (): void=>{
        navigate(`/blog/${username}`)
    }

    const handleSubmitEditButton: React.MouseEventHandler<HTMLButtonElement> = (): void=>{
        axios.put(`http://localhost:8080/api/v1/posts/${post_id}`, {
            title: title,
            body: body
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(function () : void {
            navigate(`/blog/${username}`)
        })
        .catch(function (error: AxiosError) : void {
            if(error?.response?.status.toString() == "500"){
                navigate("/500")
            } else if(error?.response?.status.toString() == "403"){
                localStorage.clear();
                navigate("/signin")
            }
        })
    }

    const handleCreatePostButton: React.MouseEventHandler<HTMLButtonElement> = (): void =>{
        axios.post(`http://localhost:8080/api/v1/posts/`, {
            title: title,
            body: body,
            created_at: todayDate
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(function (): void {
            navigate(`/blog/${username}`)
        })
        .catch(function (error: AxiosError): void {
            if(error?.response?.status.toString() == "500"){
                navigate("/500")
            } else if(error?.response?.status.toString() == "403"){
                localStorage.clear();
                navigate("/signin")
            }
        })
    }
    
    const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>): void =>{
        setTitle(event.target.value)
    }

    const handleBodyChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event: React.ChangeEvent<HTMLTextAreaElement>): void =>{
        setBody(event.target.value)
    }

    useEffect((): void =>{
        if(purpose == "see" || purpose == "edit"){
            if(token) {
                loadPostContents()
            } else {
                navigate("/signin")
            }
        } 
    }, [])


    return (
        <div id="single-post-container">
            <input id="title" type="text" value={title} disabled = {purpose == "see"} onChange={handleTitleChange} placeholder='Title'></input>
            <textarea id="body"  value={body} disabled = {purpose == "see"} onChange={handleBodyChange} placeholder='Text Body'></textarea>
            <div id="back-edit-create-buttons-container">
                <button id="back-button" onClick={handleBackButtonClick}>Back</button>
                {purpose == "edit" ? <button id="submit-edit-button" onClick={handleSubmitEditButton}>Submit Edit</button>: null}
                {purpose == "create" ? <button id="create-post-button" onClick={handleCreatePostButton}>Create Post</button>: null}
            </div>
        </div>
    );
};

export default SinglePost;