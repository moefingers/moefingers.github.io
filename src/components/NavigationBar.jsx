import { Link } from "react-router-dom";
export default function NavigationBar() {
    return (
        <ul className="navigation-bar">
            <li><Link to="/portfolio">Home</Link></li>
            <li><Link to="/portfolio/projects">Projects</Link></li>
            <li><Link to="/portfolio/contact">Contact</Link></li>
        </ul>
    )
}