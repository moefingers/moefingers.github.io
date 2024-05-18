
import { useEffect, useRef, useState } from "react"
import projects from "../assets/projects.json"

import '../assets/styles/projects.css'
import { useInterval } from "usehooks-ts"

export default function Projects() {
    const sliderElement = useRef(null)
    const [sliderDirection, setSliderDirection] = useState(0)

    function handleMouseEnter(event, direction) {
        event.preventDefault()
        setSliderDirection(direction)
    }
    function handleMouseLeave(event) {
        event.preventDefault()
        setSliderDirection(0)
    }
 console.log(-1 !== 0)
    useInterval(() => {
        console.log(parseInt(sliderElement.current.style.left))
        sliderElement.current.style.left = `${parseInt(sliderElement.current.style.left) + sliderDirection *3}%`;
    }, sliderDirection !== 0 ? 10: null)
    return (
        
        <div className="projects-page-container">
            <div className="edge-left" onMouseEnter={(event) => handleMouseEnter(event, -1)} onMouseLeave={(event) => handleMouseLeave(event)}></div>
            <div className="project-card-container">
                <div ref={sliderElement} className="project-card-slider">
                    {projects.projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <h3>{project.name}</h3>
                            {project.deployment && <a href={project.deployment}>Live Deployment</a>} <br/>
                            {project.repository && <a href={project.repository}>Repository</a>}
                            <p>{project.description}</p>
                            <div>
                                {project.tags.map((tag, index) => (
                                    <div key={index} className="tag">{tag}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="edge-right" onMouseEnter={(event) => handleMouseEnter(event, 1)} onMouseLeave={(event) => handleMouseLeave(event)}></div>
        </div>
    )
}