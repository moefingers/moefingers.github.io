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
        console.log(sortBy)
        if (sortBy === 'author') {
            const sortedPosts = [...posts].sort((a, b) => a[sortBy].localeCompare(b[sortBy], undefined, { sensitivity: 'base' }));
            setSortedPosts(sortedPosts);
        }
        
        if(sortBy === 'createdAt' || sortBy === 'updatedAt'){ 
            setSortedPosts(posts.sort((a, b) => new Date(b[sortBy]) - new Date(a[sortBy])))
        }

    }, [null, sortBy])

    return (
        <div className="post-index-page-container">
            <MouseOverSpinner textArray={[{"Created At": "createdAt"},{"Updated At": "updatedAt"}, {"Author": "author"}]} state={sortBy} setState={setSortBy} stateIsArrayOrString="string"/>
            <div>{sortBy.toString()}</div>
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
