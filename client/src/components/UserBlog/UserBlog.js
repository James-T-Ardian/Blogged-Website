import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import './UserBlog.css'

const axios  = require('axios')

const UserBlog = () => {
    const {username} = useParams()
    const navigate = useNavigate()
    const [posts, changePosts] = useState([])
    const [isOwner, changeIsOwner] = useState(false)

    axios.defaults.withCredentials = true

    const loadPosts = ()=>{
        axios.get(`http://localhost:3000/blog/${username}`)
        .then(function(response) {
            changePosts(response.data.posts)
            changeIsOwner(response.data.isOwner)
            console.log(response)
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:3000/signin')
        .then(function (response) {
            loadPosts()
            console.log(response)
        })
        .catch(function (error) {
            navigate(`/signin`) 
            console.log(error)
        });
    }, [])

    return (
        <div id="blog-container">
            <div id="user-identifier">{username}'s posts</div>
            <div id="posts-container">
                {posts.map((post) => {
                    return (<div className="post-title-time">
                                <div className="post-title">{post.title}</div>
                                <div className="post-time">Posted on: {post.created_at.slice(0,10)}</div>
                            </div>)
                })}
            </div>
        </div>
        
            
    );
};

export default UserBlog;