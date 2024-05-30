import { useEffect, useRef, useState, createElement } from "react"
import { useNavigate } from "react-router-dom"

import SyntaxHighlighter from 'react-syntax-highlighter';
import { xt256 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { toUserTime } from '../App'

import NotFound from "./NotFound"

import { Link } from 'react-router-dom'

import { posts, personLinks } from '../assets/data/posts.json'

import "../assets/styles/post-single.css"

import { parseISO } from "date-fns"

export default function PostSingle() {

    const navigate = useNavigate()

    const [post, setPost] = useState(null)
    const [reactPage, setReactPage ] = useState()
    const [initialHash, setInitialHash] = useState(window.location.hash)

    

    useEffect(() => { //   #/Posts/infinity-response#another-situation
        console.log(initialHash)
        
        // correct hash to #/posts/postname
        for(const postFromJSON of posts){
            // const goodPath = window.location.hash.toLowerCase() == "#/posts/" + postFromJSON.path.toLowerCase()
            // console.log(goodPath)
            const goodPath = initialHash.toLowerCase().includes("#/posts/" + postFromJSON.path.toLowerCase())


            if(goodPath){
                console.log("matched hash: " + "#/posts/" + postFromJSON.path.toLowerCase())
                console.log("current hash: " + initialHash)
                setPost(postFromJSON)
                
                function createReactElement(reactElementContent) {
                    const { type, props, children } = reactElementContent;
                    currentKey++
                    props.key = `${postFromJSON.path}-${currentKey}`
                    if(props.class) { delete props.class }
                    if(type == "img") {
                        return <img key={props.key} src={props.src} alt={props.alt} />
                    }
                    if(type == "SyntaxHighlighter"){
                        return <SyntaxHighlighter key={props.key} language="javascript" style={xt256}>{children}</SyntaxHighlighter>
                    }
                    if(props.editorlinktag == "true"){
                        return <a key={props.key} href={personLinks[postFromJSON.editor]} target="_blank">{postFromJSON.editor}</a>
                    }
                
                    // If children is a string, wrap it in an array
                    const childrenArray = Array.isArray(children) ? children : [children];
                    
                    let addLink = false
                    const elementChildren = childrenArray.map((child, index) => {
                        // If child is an object, recursively create the React element
                        if (typeof child === 'object') {
                            // console.log(child)
                            const { type, props, children } = child;
                            // props.key = index
                            return createReactElement({type, props, children});
                        }
                        // If child is a string, create a text element
                        if (child.includes("$$$")){
                            function replaceThreeDollarToken(fullString, postFromJSON) {
                                return fullString.replace(/\${3}([^$]+)\${3}/g, (match, group) => {
                                    try {
                                        if (parseISO(postFromJSON[group])) {
                                            return toUserTime(postFromJSON[group]);
                                        }
                                    } catch (error) {
                                        // console.log(error)
                                    }
                                    return postFromJSON[group];
                                });
                            }
                            // here
                            child = replaceThreeDollarToken(child, postFromJSON)
                        }
                        return child;
                    });
                    // element
                    currentKey++
                    props.key = `${postFromJSON.path}-${currentKey}`
                    const element = createElement(type, props, [...elementChildren]);
                    return element;
                }
                let currentKey = 0
                const returnedElement = createReactElement(postFromJSON.reactElementContent)
                setReactPage(returnedElement)

                break
            } else {
                console.log("non-match hash: " + "#/posts/" + postFromJSON.path.toLowerCase())
            }
            
        }
        
    }, [])

    useEffect(() => {
        navigate(initialHash)
        console.log("useeffect reactpage ")
        console.log(initialHash)
        window.location.hash = initialHash
    }, [reactPage])
    
    return post ? (
        <div className="post-single-page-container">
            {reactPage}
            <Link to="/Posts">Return to posts?</Link>
        </div>
    ) : <NotFound/>
}