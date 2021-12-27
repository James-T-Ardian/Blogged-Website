import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom'

const axios = require("axios")

const SinglePost = () => {
    const {username, postId, purpose} = useParams()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [isOwner, setIsOwner] = useState(false)
    const navigate = useNavigate()

    axios.defaults.withCredentials = true


    const loadPostContents = () =>{
        axios.get(`http://localhost:3000/blog/${username}/${postId}`)
        .then(function (response){
            setTitle(response.data.post[0].title)
            setBody(response.data.post[0].body)
            setIsOwner(response.data.isOwner)
        })
        .catch(function (error){
            console.log(error)
        })
    }

    const handleBackButtonClick = ()=>{
        navigate(`/blog/${username}`)
    }

    const handleSubmitEditButton = ()=>{
        axios.put(`http://localhost:3000/blog/${username}/${postId}`, {
            title: title,
            body: body
        })
        .then(function (response){
            loadPostContents()
            console.log(response)
        })
        .catch(function(error){
            console.log(error)
        })
    }
    
    const handleTitleChange = (event)=>{
        setTitle(event.target.value)
    }

    const handleBodyChange = (event)=>{
        setBody(event.target.value)
    }
    useEffect( ()=>{
        axios.get('http://localhost:3000/signin')
        .then(function (response) {
            if(purpose == "see" || purpose == "edit"){
                loadPostContents()
            }
            console.log(response)
        })
        .catch(function (error) {
            navigate('/signin')
            console.log(error)
        });
    }, [])


    return (
        <div id="single-post-container">
            <button id="back-button" onClick={handleBackButtonClick}>Back</button>
            <input id="title" type="text" value={title} disabled = {purpose == "see"} onChange={handleTitleChange}></input>
            <input id="body" type="textarea" value={body} disabled = {purpose == "see"} onChange={handleBodyChange}></input>
            {purpose == "edit" ? <button id="submit-edit-button" onClick={handleSubmitEditButton}>Submit Edit</button>: null}
        </div>
    );
};

export default SinglePost;