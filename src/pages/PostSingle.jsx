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

    const [post, setPost] = useState(null)
    const [reactPage, setReactPage ] = useState()

    useEffect(() => {
        // correct hash to #/posts/postname
        for(const postFromJSON of posts){
            const goodPath = window.location.hash.toLowerCase() == "#/posts/" + postFromJSON.path.toLowerCase()

            if(goodPath){
                // console.log("good hash: " + "#/posts/" + postFromJSON.path.toLowerCase())
                setPost(postFromJSON)
                
                function createReactElement(reactElementContent) {
                    const { type, props, children } = reactElementContent;
                    if(props.class) { delete props.class }
                    if(type == "SyntaxHighlighter"){
                        return <SyntaxHighlighter language="javascript" style={xt256}>{children}</SyntaxHighlighter>
                    }
                    if(props.editorlinktag == "true"){
                        return <a href={personLinks[postFromJSON.editor]} target="_blank">{postFromJSON.editor}</a>
                    }
                
                    // If children is a string, wrap it in an array
                    const childrenArray = Array.isArray(children) ? children : [children];
                    
                    let addLink = false
                    const elementChildren = childrenArray.map((child) => {
                        // If child is an object, recursively create the React element
                        if (typeof child === 'object') {
                            return createReactElement(child);
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
                                    if(group == "editor"){
                                        // return ""
                                        // return createReactElement({
                                        //     type: "a",
                                        //     props: {
                                        //         href: personLinks[postFromJSON[group]],
                                        //         target: "_blank",
                                        //     },
                                        //     children: postFromJSON[group]
                                        // })
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
                    const element = createElement(type, props, [...elementChildren]);
                    return element;
                }
                
                setReactPage(createReactElement(postFromJSON.reactElementContent))

                break
            } else {
                // console.log("bad hash: " + "#/posts/" + postFromJSON.path.toLowerCase())
            }
            
        }
        
    }, [])
    
    return post ? (
        <div className="post-single-page-container">
            {reactPage}
            <Link to="/Posts">Return to posts?</Link>
        </div>
    ) : <NotFound/>
}