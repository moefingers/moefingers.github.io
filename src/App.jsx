import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

import "./App.css";

export default function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <NavigationBar/>
        <Routes>
          <Route path="/portfolio" element={<Home/>}/>
          <Route path="/portfolio/projects" element={<Projects/>}/>
          <Route path="/portfolio/contact" element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
    </div>

  )
}