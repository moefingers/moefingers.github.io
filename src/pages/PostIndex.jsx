import { useState, useEffect } from 'react'

import {posts} from '../assets/data/posts.json'

import { Link } from 'react-router-dom'

import MouseOverSpinner from '../components/MouseOverSpinner'
import {toUserTime} from '../App'

import '../assets/styles/post-index.css'


export default function PostIndex() {
    const [sortedPosts, setSortedPosts] = useState([])
    const [sortBy, setSortBy] = useState('updatedAt')
    const [ascending, setAscending] = useState(false)

    useEffect(() => {
        // console.log(sortBy)
        if (sortBy === 'author' || sortBy === 'title') {
            const sortedPosts = [...posts].sort((a, b) => {
                const comparison = a[sortBy].localeCompare(b[sortBy], undefined, { sensitivity: 'base' });
                return ascending ? comparison : -comparison;
            });
            setSortedPosts(sortedPosts);
        }
        
        if(sortBy === 'createdAt' || sortBy === 'updatedAt'){
            const sortedPosts = [...posts].sort((a, b) => {
                const comparison = new Date(a[sortBy]) - new Date(b[sortBy]);
                return ascending ? comparison : -comparison;
            });
            setSortedPosts( sortedPosts );
        }

    }, [null, sortBy, ascending])


    const sortByArray =[{"Updated At": "updatedAt"},{"Created At": "createdAt"}, {"Author": "author"}, {"Title": "title"}]
    // console.log(Object.keys(Object.values(sortByArray).filter(pair => Object.entries(pair)[0][1] === "createdAt")[0])[0])
    return (
        <div className="post-index-page-container">
            <MouseOverSpinner textArray={sortByArray} state={sortBy} setState={setSortBy} stateIsArrayOrString="string"/>
            <div className="sorting-by-note">
                Sorting By: <em className='quaternary'>{Object.keys(Object.values(sortByArray).filter(pair => Object.entries(pair)[0][1] == sortBy)[0])[0]}</em> (
                <em className='clickable'onClick={() => setAscending(!ascending)}>{ascending ? "Ascending" : "Descending"}</em>
                )
            </div>
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
