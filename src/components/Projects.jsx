
import projects from "../assets/projects.json"

import '../assets/styles/projects.css'

export default function Projects() {
    return (
        <div className="projects-page-container">
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
    )
}