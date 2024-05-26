import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import NotFound from "./NotFound"

import { Link } from 'react-router-dom'

import {posts} from '../assets/data/posts.json'

export default function PostSingle() {

    const [post, setPost] = useState(null)
    const [pathHash, setPathHash] = useState("")

    useEffect(() => {
        setPathHash(window.location.hash)
        // correct hash to 
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
        
        if(window.location.hash == "" || window.location.hash == "#/"){
            navigate("/")
        }
    }, [])
    
    return post ? (
        <div className="post-single-page-container">
            <Link to="/Posts">Return to posts?</Link>
            <h1>PostSingle.jsx</h1>
            {pathHash}
        </div>
    ) : <NotFound/>
}