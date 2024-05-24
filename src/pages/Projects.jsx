import { useEffect, useState, useRef } from 'react'
import { format } from 'date-fns'
import { fromZonedTime, toZonedTime } from 'date-fns-tz';



import { projects } from "../assets/projects.json"

import ImageRoller from "../components/ImageRoller"

import '../assets/styles/projects.css'

const fullImageBlobImport = Object.values(import.meta.glob("@assets/images/*/*.{png,jpg,jpeg,PNG,JPEG,webp,WEBP}", { eager: true, query: '?url', import: 'default' }))

const placeholder = fullImageBlobImport.filter((blob) => blob.includes("placeholder"))[0]
/* expected:
{
    "v2-stopwatch": [
        "/src/assets/images/v2-stopwatch/0.png"
    ],
    "portfolio": []
}
*/

function toUserTime(utcTime) {
    // Check if date-fns-tz is available (recommended for time zone handling)
    if (typeof fromZonedTime === 'function') {
      const timeZoneID = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone ID
      const zonedTime = toZonedTime(new Date(utcTime), timeZoneID);
      return format(zonedTime, 'PPp', { timeZone: timeZoneID }); // Format with time zone abbreviation
    } else {
      console.warn("date-fns-tz library not found. Timezone conversion might be inaccurate.");
      const formattedTime = format(new Date(utcTime), 'PPp'); // Format without time zone info
      return formattedTime;
    }
  }

export default function Projects() {
    const [projectSectionElements, setProjectSectionElements] = useState([])
    const [projectData, setProjectData] = useState({})
    const [scrollPosition, setScrollPosition] = useState(0)
    const [rollerImages, setRollerImages] = useState([])

    


    function fetchAll() {
        let data = {}
        projects.forEach(async (project, index) => {
            // fetch api from project
            if(project.api){
                try {
                    const initialResponse = await fetch(project.api,
                        {
                            method: 'GET',
                            headers: {'Content-Type': 'application/vnd.github+json'}
                        }
                    )
                    const newData = await initialResponse.json()

                    const commitResponse = await fetch(`https://api.github.com/repos/${newData.owner.login}/${newData.name}/commits`,
                        {
                            method: 'GET',
                            headers: {'Content-Type': 'application/vnd.github+json'}
                        }
                    )
                    newData.commits = await commitResponse.json()
                    newData.squareImage = `https://raw.githubusercontent.com/${newData.owner.login}/${newData.name}/${newData.default_branch}/social/square`
                    newData.wideImage = `https://raw.githubusercontent.com/${newData.owner.login}/${newData.name}/${newData.default_branch}/social/wide.png`

                    
                    data = Object.assign({}, data, {[project.snakeName]: await newData})
                   
                    setProjectData(data)
                    
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

        
    
    const projectsScrollElement = useRef(null)
    useEffect(() => {
 
        fetchAll()

        projectsScrollElement.current.onscroll = () => {
            const currentPosition = (projectsScrollElement.current.scrollTop)
            const eachHeight = (document.querySelector("section").scrollHeight)

            setScrollPosition(currentPosition / eachHeight)
        }

    }, [])


    useEffect(() => {
        const scrollElement = projectsScrollElement.current
        const scrollBarWidth = (scrollElement.offsetWidth - scrollElement.clientWidth)
        scrollElement.style.padding = `${scrollBarWidth / scrollElement.offsetWidth * 52}%`
    }, [projectSectionElements])


 

    useEffect(() => {
        console.log(projectData)
        const sections = []
        const preStateRollerImages = []
        projects.forEach((project, index) => {
            console.log(index,project)
            if(projectData[project.snakeName]){ // if github
                project = projectData[project.snakeName]
                preStateRollerImages.push(project.squareImage)
                sections.push (
                    <section key={index} className="project-section">
                        <div className='safe-zone-top'>
                            <h1 className="project-title">
                                GitHub - <a href={project.owner.html_url} target='_blank'>{project.owner.login}</a> /<br/>
                                <a className='project-name' href={project.html_url} target='_blank'>{project.name}({project.default_branch})</a>
                            </h1>

                            {project.fork && <h2 className="project-fork">Forked from <a href={project.parent.html_url} target='_blank'>{project.parent.owner.login}</a></h2>}

                            <ul className="project-topics">{project.topics.map((topic, index) => <li key={index}>{topic}</li>)}</ul>
                            {project.homepage != null && <a className='deployment-link' href={project.homepage} target='_blank'>Visit Deployment</a>}

                            <p>Created: {toUserTime(project.created_at)}</p>
                            <p>Updated: {toUserTime(project.updated_at)}</p>
                        </div>
                        <div className="safe-zone-bottom">
                            <p className="project-description">{project.description} - <span className="project-commits">{project.commits.length} <span>commits</span></span> - <a 
                                className='project-license' href={"https://choosealicense.com/licenses/" + project.license.key} target='_blank'>{project.license.name}</a>
                            </p>
                            
                            <img className="project-wide-image" src={project.wideImage} alt="wide-image" onError={e => e.target.src = ""}/>
                            


                            {index == 0 && <div className="scroll-note">scroll down...</div>}
                        </div>
                        

                        
                    </section>
                )
            } else { // if not github
                preStateRollerImages.push(placeholder)
                sections.push (
                    <section key={index} className="project-section">
                        <h1 className="project-title">{project.name}</h1>
                        <p className="project-description">{project.description}</p>
                    </section>
                )
            }

            
        })


        setProjectSectionElements(sections)
        setRollerImages(preStateRollerImages)

        

    }, [projectData])

    return (
        <div className="projects-page-container">
            <div ref={projectsScrollElement} className='scroll' >
                {...projectSectionElements}
                <ImageRoller scrollPosition={scrollPosition} projectsScrollElement={projectsScrollElement.current} rollerImages={rollerImages} backupImage={placeholder}/>
            </div>
        </div>
    )
}