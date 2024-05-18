
import { useEffect, useRef, useState } from "react"
import projects from "../assets/projects.json"

import '../assets/styles/projects.css'
import { useInterval } from "usehooks-ts"

export default function Projects() {
    const [speed, setSpeed] = useState(1)
    const [x, setX] = useState(0)
    const [direction, setDirection] = useState(0)
    const containerElement = useRef(null)
    useEffect(() => {
        document.addEventListener("mousemove", (event) => {
            const rect = document.querySelector("main.page").getBoundingClientRect()

            console.log(-(rect.right - rect.left) / 2 + event.clientX)
            setDirection(-(rect.right - rect.left) / 2 + event.clientX)
            // console.log(event.movementX, event.movementY)
        })
    }, [])

    useInterval(() => {
        console.log(containerElement.current.getBoundingClientRect().left + direction)
        containerElement.current.style.setProperty("--x", `${(containerElement.current.getBoundingClientRect().left + direction)}`)
    }, 500)
    return (
        
        <div className="projects-page-container">
            <div ref={containerElement} className="project-card-container">
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
    )
}