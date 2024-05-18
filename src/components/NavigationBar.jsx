import { NavLink } from "react-router-dom";
export default function NavigationBar({routes}) {
    return (
        <nav>
            {routes.map((route) => (
                <NavLink
                key={route.path}
                to={route.path}
                className={location.pathname === route.path ? "nav-link current" : "nav-link"}
                >
                {route.name}
                </NavLink>
            ))}
        </nav>
    )
}