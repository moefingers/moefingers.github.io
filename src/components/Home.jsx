import { Link } from "react-router-dom"
export default function Home() {
    return (    
        <div className="home-page-container">
            <div>home</div>
            <Link to="/portfolio/badlink">bad link example</Link>
        </div>
    )
}