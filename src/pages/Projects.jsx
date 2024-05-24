import { useEffect, useState, useRef } from 'react'
import { format } from 'date-fns'
import { fromZonedTime, toZonedTime } from 'date-fns-tz';



import { projects } from "../assets/projects.json"

import ImageRoller from "../components/ImageRoller"

import '../assets/styles/projects.css'

const fullImageBlobImport = Object.values(import.meta.glob("@assets/images/*/*.{png,jpg,jpeg,PNG,JPEG,webp,WEBP}", { eager: true, query: '?url', import: 'default' }))
console.log(fullImageBlobImport)
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
    const [images, setImages] = useState({})

    


    function fetchAll() {
        let data = {}
        projects.forEach(async (project, index) => {
            // fetch api from project
            // check if image in url exists `https://raw.githubusercontent.com/${project.owner.login}/${project.name}/${project.default_branch}/social/wide.png`
            if(project.api){
                try {

                    const initialResponse = await fetch(project.api,
                        {
                            method: 'GET',
                            headers: {'Content-Type': 'application/vnd.github+json'}
                        }
                    )
                    const newData = await initialResponse.json()

                    const commitResponse = await fetch(`https://api.github.com/repos/moefingers/${newData.name}/commits`,
                        {
                            method: 'GET',
                            headers: {'Content-Type': 'application/vnd.github+json'}
                        }
                    )
                    newData.commits = await commitResponse.json()

                    // const imageWideResponse = await fetch(`https://raw.githubusercontent.com/${newData.owner.login}/${newData.name}/${newData.default_branch}/social/wide.png`,
                    //     {
                    //         method: 'GET',
                    //         headers: {'Content-Type': 'image'}
                    //     }
                    // )
                    // newData.imageWide = await imageWideResponse.blob()
                    // console.log(data)
                    data = Object.assign({}, data, {[project.snakeName]: await newData})
                    // console.log(newData)
                    // console.log(data)
                    setProjectData(data)
                    
                    
                } catch (error) {
                    console.log(error)
                }
            }
        })
        // console.log(data)
       
    }

        
    
    const projectsScrollElement = useRef(null)
    useEffect(() => {
        const imagesPreState = {}
        projects.forEach((project, index) => {
            
        
            

            fullImageBlobImport.forEach((image) => {
                if(image.includes(project.imagesFolder)){
                    console.log(index, project.imagesFolder, image)
                    if (!imagesPreState[project.snakeName]) {
                        imagesPreState[project.snakeName] = []
                    }
                    imagesPreState[project.snakeName].push(image)
                }
            })
        })
        console.log(imagesPreState)
        setImages(imagesPreState)

        fetchAll()


        projectsScrollElement.current.onscroll = () => {
            const currentPosition = (projectsScrollElement.current.scrollTop)
            const eachHeight = (document.querySelector("section").scrollHeight)

            // console.log (currentPosition, eachHeight)
            // console.log(currentPosition / eachHeight)
            setScrollPosition(currentPosition / eachHeight)
        }

            // projectsScrollElement.current.scrollTop = 1000 // to scroll
    }, [])


    useEffect(() => {
        const scrollElement = projectsScrollElement.current
        const scrollBarWidth = (scrollElement.offsetWidth - scrollElement.clientWidth)
        scrollElement.style.padding = `${scrollBarWidth / scrollElement.offsetWidth * 52}%`
    }, [projectSectionElements])


 

    useEffect(() => {
        console.log(projectData)
        const sections = projects.map((project, index) => {
            if(projectData[project.snakeName]){ // if github
                project = projectData[project.snakeName]
                return (
                    <section key={index} className="project-section">
                        <div className='safe-zone-top'>
                            <h1 className="project-title">
                                GitHub - <a href={project.owner.html_url} target='_blank'>{project.owner.login}</a> /<br/>
                                <a className='project-name' href={project.html_url} target='_blank'>{project.name}</a>
                            </h1>

                            {project.fork && <h2 className="project-fork">Forked from <a href={project.parent.html_url} target='_blank'>{project.parent.owner.login}</a></h2>}

                            <ul className="project-topics">{project.topics.map((topic, index) => <li key={index}>{topic}</li>)}</ul>
                            {project.homepage != null && <a className='deployment-link' href={project.homepage} target='_blank'>Visit Deployment</a>}

                            <p>Created: {toUserTime(project.created_at)}</p>
                        </div>
                        <div className="safe-zone-bottom">
                            <p className="project-description">{project.description} - {project.commits.length} commits - <a 
                                className='project-license' href={"https://choosealicense.com/licenses/" + project.license.key} target='_blank'>{project.license.name}</a>
                            </p>
                            
                            <img className="project-wide-image" src={`https://raw.githubusercontent.com/${project.owner.login}/${project.name}/${project.default_branch}/social/wide.png`} alt="wide-image" />
                            


                            {index == 0 && <div className="scroll-note">scroll down...</div>}
                        </div>
                        

                        

                        
                    </section>
                )
            } else { // if not github
                return (
                    <section key={index} className="project-section">
                        <h1 className="project-title">{project.name}</h1>
                        <p className="project-description">{project.description}</p>
                    </section>
                )
            }
        })
        setProjectSectionElements(sections)
    }, [projectData])

    return (
        <div className="projects-page-container">
            <div ref={projectsScrollElement} className='scroll' >
                {...projectSectionElements}
                <ImageRoller scrollPosition={scrollPosition} projectsScrollElement={projectsScrollElement.current} rollerImages={Object.values(images).map((imageSet) => imageSet[0])}/>
            </div>
        </div>
    )
}