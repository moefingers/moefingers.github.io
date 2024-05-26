import {posts} from '../assets/data/posts.json'

import { Link } from 'react-router-dom'
import {toUserTime} from '../App'

import '../assets/styles/post-index.css'


export default function PostIndex() {
    

    return (
        <div className="post-index-page-container">
            <ul>
                {posts.filter(({ hide }) => !hide).map((post, index) => 
                    <li key={index}>
                        <Link to={post.path}>{post.title}</Link>
                        <p>Last Edited: {toUserTime(post.updatedAt)}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}
