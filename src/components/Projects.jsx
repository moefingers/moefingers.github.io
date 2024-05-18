
import projects from "../assets/projects.json"

export default function Projects() {
    return (
        <div className="projects-page-container">
            {projects.projects.map((project, index) => (
                <div key={index} className="project-card">
                    <a href={project.url} target="_blank">{project.name}</a>
                </div>
            ))}
        </div>
    )
}