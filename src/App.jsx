import React, { createRef, useRef, StrictMode, useEffect} from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
  NavLink,
  useLocation,
  useOutlet,
  redirect,
  useNavigate
} from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import NavigationBar from "./components/NavigationBar";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Glowy from "./components/Glowy";

import "./App.css";

const routes = [
  { path: "/", name: "Home", element: <Home />, nodeRef: createRef() },
  { path: "Projects", name: "Projects", element: <Projects />, nodeRef: createRef() },
  { path: "Contact", name: "Contact", element: <Contact />, nodeRef: createRef() },
]

const routerChildren = routes.map(route => ({
  index: false,
  path: route.path ,
  element: route.element,  
}))
routerChildren.push({
  index: false,
  path: "*",
  element: <NotFound/>
})
const router = createHashRouter([
  {
    path: "",
    element: <App />,
    children: routerChildren,
  },
])
function App() {
  const location = useLocation()
  const currentOutlet = useOutlet()
  const nodeRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    // correct location prehash if invalid
    if(window.location.pathname != "/" && window.location.pathname != "/Projects" && window.location.pathname != "/Contact"){
      console.log("redirecting to /")
      window.location = "/"
    }
    // correct hash to #/
    if(window.location.hash == "" || window.location.hash == "#/"){
      navigate("/")
    }
  }, [])
  
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
            appear={false}
            enter={true}
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