import React, { createRef, useRef, StrictMode, useEffect} from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
  useLocation,
  useOutlet,
  redirect
} from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import NavigationBar from "./components/NavigationBar";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Glowy from "./components/Glowy";

import "./App.css";

const routes = [
  { path: "/portfolio/", name: "Home", element: <Home />, nodeRef: createRef() },
  { path: "/portfolio/projects", name: "Projects", element: <Projects />, nodeRef: createRef() },
  { path: "/portfolio/contact", name: "Contact", element: <Contact />, nodeRef: createRef() },
]

const routerChildren = routes.map(route => ({
  index: false,
  path: route.path === "/" ? undefined : route.path,
  element: route.element,  
}))
routerChildren.push({
  index: false,
  path: "*",
  element: <NotFound/>
})
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routerChildren,
  },
])
function App() {
  const location = useLocation()
  const currentOutlet = useOutlet()
  const nodeRef = useRef(null)

  
  
  return (
    <StrictMode>
        <NavigationBar routes={routes} />
        <Glowy/>
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            {(state) => (
              <main ref={nodeRef} className="page">
                {currentOutlet}
              </main>
            )}
          </CSSTransition>
        </SwitchTransition>
    </StrictMode>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<RouterProvider router={router} />)
