import { NavLink } from "react-router-dom";
export default function NavigationBar({routes}) {
    // console.log(window.location.pathname,window.location.hash)
    return (
        <nav> 
            {routes.map((route) => (
                <NavLink
                key={route.path}
                to={route.path}
                className={
                    window.location.hash === route.path 
                    || window.location.hash === "#/" + route.path
                    || window.location.hash === "#/" + route.path + "/"
                    || window.location.hash === "#" + route.path
                    ? "nav-link current" : "nav-link"}
                >
                {route.name}
                </NavLink>
            ))}
        </nav>
    )
}