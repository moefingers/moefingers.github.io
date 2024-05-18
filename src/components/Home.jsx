import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
export default function Home() {
    return (    
        <div className="home-page-container">
            <div>welcome home.. this entire site is under heavy development</div>
            <Link to="/portfolio/badlink">bad link example</Link>
        </div>
    )
}