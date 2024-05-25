import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Link } from 'react-router-dom'

import {posts} from '../assets/data/posts.json'

export default function PostSingle() {

    const [post, setPost] = useState(null)
    const [pathHash, setPathHash] = useState("")

    useEffect(() => {
        setPathHash(window.location.hash)
        // correct hash to 
        posts.forEach(  ({path}, index, postFromJSON) => {
            const goodPath = window.location.hash.toLowerCase() == "#/posts/" + path.toLowerCase()

            if(goodPath){
                console.log("good hash: " + "#/posts/" + path.toLowerCase())
            } else {
                console.log("bad hash: " + "#/posts/" + path.toLowerCase())
                setPost(postFromJSON)
            }
            
        })
        
        if(window.location.hash == "" || window.location.hash == "#/"){
            navigate("/")
        }
    }, [])
    
    return (
        <div className="post-single-page-container">
            <Link to="/Posts">Return home?</Link>
            <h1>PostSingle.jsx</h1>
            {pathHash}
        </div>
    )
}