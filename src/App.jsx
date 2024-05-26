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
import PostIndex from './pages/PostIndex';
import PostSingle from './pages/PostSingle';
import Glowy from "./components/Glowy";

import "./App.css";

const routes = [
  { 
    path: "/", 
    friendlyPath: "", 
    name: "Home", 
    element: <Home />, 
    nodeRef: createRef() 
  },{ 
    path: "/Projects", 
    friendlyPath: "Projects", 
    name: "Projects", 
    element: <Projects />, 
    nodeRef: createRef()
  },{ 
    path: "/Posts", 
    friendlyPath: "Posts", 
    name: "Posts", 
    element: <PostIndex />, 
    nodeRef: createRef() 
  },{ 
    path: "/Contact",
    friendlyPath: "Contact",
    name: "Contact", 
    element: <Contact />, 
    nodeRef: createRef()
  },
]

const routerChildren = routes.map(route => ({
  index: false,
  path: route.path ,
  element: route.element,  
})) // children for router.. all from routes above that will also be in nav

routerChildren.push({ // these however, will only be paths, and not found in the nav.
  index: false,
  path: "*",
  element: <NotFound/>
},{
  index: false,
  path: "/Posts/*",
  element: <PostSingle/>
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
  
  function validatePath() {
    const currentPath = window.location.pathname + window.location.hash

    if (window.location.pathname != "/") { // for example prefixing hash asdfasdfasdf#/Contact
      window.location = ("/" + window.location.hash)
      return
    }

    for (const { path, friendlyPath } of routes) {
      if( "#" + currentOutlet.props.children.props.match.pathname !=window.location.hash){
        console.log("outlet path and hash do not match")
        console.log( "#" + currentOutlet.props.children.props.match.pathname, window.location.hash)
        navigate(currentOutlet.props.children.props.match.pathname)
      }

      const checkedPath = "/#" + path
      console.log( "chcking: "  + "/#  " + path)
      console.log ("current: " + window.location.pathname + "  " + window.location.hash)
      if("/#" + path != window.location.pathname + window.location.hash){ // if not exact match
        // console.log("inexact match")

        if(window.location.hash.toLowerCase() == "#" + friendlyPath.toLowerCase()){ // for example domain/#pOsTs or domain/#Posts
          // console.log(`partial match`)
          navigate(path)
          break
        }
        if(window.location.hash.toLowerCase() == "#" + path.toLowerCase()){ // for example domain/#/pOsTs
          // console.log("within inexact match, there is a casing match")
          navigate(path)
          break
        }
      } else {
        // console.log(`exact match ${currentPath} == ${checkedPath}`)
        break
      }
      // console.log("no match, continuing")
    }

    // if(window.location.pathname != "/"){
    //   console.log("redirecting to /")
    //   window.location = "/"
    // }
    // the below code was scrapped.. not sure if it's still necessary since we now have the above but we're keeping just in case
    // // correct hash to #/
    // if(window.location.hash == "" || window.location.hash == "#/"){
    //   window.location.hash = "#/"
    //   navigate("/")
    // }
  }
  useEffect(() => {
    // console.log(currentOutlet.props.children.props.match.pathnameBase)
    validatePath()
  }, [location])

  useEffect(() => {
    validatePath()
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
