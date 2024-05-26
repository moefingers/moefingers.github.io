import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { toUserTime } from '../App'

import NotFound from "./NotFound"

import { Link } from 'react-router-dom'

import {posts} from '../assets/data/posts.json'

export default function PostSingle() {

    const [post, setPost] = useState(null)

    useEffect(() => {
        // correct hash to #/posts/postname
        for(const postFromJSON of posts){
            const goodPath = window.location.hash.toLowerCase() == "#/posts/" + postFromJSON.path.toLowerCase()

            if(goodPath){
                console.log("good hash: " + "#/posts/" + postFromJSON.path.toLowerCase())
                setPost(postFromJSON)
                break
            } else {
                console.log("bad hash: " + "#/posts/" + postFromJSON.path.toLowerCase())
            }
            
        }
        
    }, [])
    
    return post ? (
        <div className="post-single-page-container">
            <h1>{post.title}</h1>
            <p>By: {post.author}</p>
            <p>Posted: {toUserTime(post.createdAt)}</p>
            <p>Last Edited: {toUserTime(post.updatedAt)}</p>
            

            <Link to="/Posts">Return to posts?</Link>
        </div>
    ) : <NotFound/>
}