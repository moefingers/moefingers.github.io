import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="not-found-page-container">
            <div>page not found at <code>{window.location.pathname} {window.location.hash}</code></div>
            
            <Link to="/portfolio">Return home?</Link>

        </div>
    )
}