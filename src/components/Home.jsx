import { Link, useNavigate } from "react-router-dom"
import projects from "../assets/projects.json"
import { useEffect } from "react"
export default function Home() {
    const navigate = useNavigate()
    useEffect(() => {
        if(window.location.pathname === "/portfolio") {
            navigate("/portfolio/")
        }
    })
    return (    
        <div className="home-page-container">
            <div>home</div>
            <Link to="/portfolio/badlink">bad link example</Link>
        </div>
    )
}