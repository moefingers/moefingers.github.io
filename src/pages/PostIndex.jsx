import { useState, useEffect } from 'react'

import {posts} from '../assets/data/posts.json'

import { Link } from 'react-router-dom'

import MouseOverSpinner from '../components/MouseOverSpinner'
import {toUserTime} from '../App'

import '../assets/styles/post-index.css'


export default function PostIndex() {
    const [sortedPosts, setSortedPosts] = useState([])
    const [sortBy, setSortBy] = useState('updatedAt')

    useEffect(() => {
        // console.log(sortBy)
        if (sortBy === 'author' || sortBy === 'title') {
            const sortedPosts = [...posts].sort((a, b) => a[sortBy].localeCompare(b[sortBy], undefined, { sensitivity: 'base' }));
            setSortedPosts(sortedPosts);
        }
        
        if(sortBy === 'createdAt' || sortBy === 'updatedAt'){
            const sortedPosts = [...posts].sort((a, b) => new Date(a[sortBy]) - new Date(b[sortBy]));
            setSortedPosts( sortedPosts );
        }

    }, [null, sortBy])


    const sortByArray =[{"Created At": "createdAt"},{"Updated At": "updatedAt"}, {"Author": "author"}, {"Title": "title"}]
    // console.log(Object.keys(Object.values(sortByArray).filter(pair => Object.entries(pair)[0][1] === "createdAt")[0])[0])
    return (
        <div className="post-index-page-container">
            <MouseOverSpinner textArray={sortByArray} state={sortBy} setState={setSortBy} stateIsArrayOrString="string"/>
            
            <ul>
                {sortedPosts.filter(({ hide }) => !hide).map((post, index) => 
                    <li key={index}>
                        <Link to={post.path}>{post.title}</Link>
                        <p>Last Edited: {toUserTime(post.updatedAt)}</p>
                        <p>Created At: {toUserTime(post.createdAt)}</p>
                        <p>Author: {post.author}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}
