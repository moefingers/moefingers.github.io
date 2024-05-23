import { useEffect, useState, useRef } from 'react'

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

export default function Projects() {
    const [projectSectionElements, setProjectSectionElements] = useState([])
    const [projectData, setProjectData] = useState({})
    const [scrollPosition, setScrollPosition] = useState(0)
    const [images, setImages] = useState({})

    


    function fetchAll() {
        let data = {}
        projects.forEach(async (project, index) => {
            // fetch api from project
            if(project.api){
                try {
                    const response = await fetch(project.api,
                        {
                            method: 'GET',
                            headers: {'Content-Type': 'application/vnd.github+json'}
                        }
                    )
                    const newData = await response.json()
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
        scrollElement.style.paddingRight = `${scrollBarWidth / scrollElement.offsetWidth * 103}%`
    }, [projectSectionElements])


 

    useEffect(() => {
        const sections = projects.map((project, index) => {
            if(projectData[project.snakeName]){
                return (
                    <section key={index} className="project-section">
                        <h1 className="project-title">{projectData[project.snakeName].name}</h1>
                        <p className="project-description">{projectData[project.snakeName].description}</p>
                        <p>from api</p>
                        {index == 0 && <div className="scroll-note">scroll down...</div>}
                    </section>
                )
            } else {
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