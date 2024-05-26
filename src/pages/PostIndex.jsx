import {posts} from '../assets/data/posts.json'

import { Link } from 'react-router-dom'

export default function PostIndex() {
    return (
        <div className="posts-index-page-container">
            <ul>
                {posts.map((post) => <li key={post.path}><Link to={post.path}>{post.path}</Link></li>)}
            </ul>
        </div>
    )
}
