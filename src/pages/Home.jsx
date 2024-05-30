
import '../assets/styles/home.css'
import TextRoller from '../components/TextRoller'
// glob import
const fullImageBlobImport = Object.values(import.meta.glob("@assets/images/homepage/*.{png,jpg,jpeg,PNG,JPEG,webp,WEBP,svg}", { eager: true, query: '?url', import: 'default' }))
const fullReds = fullImageBlobImport.filter((blob) => blob.includes("fullreds"))
console.log(fullReds)

export default function Home() {


    async function handleMouseMoveImage(event) {
        const boundingRect = event.currentTarget.getBoundingClientRect()

        const xPosInBox = (event.clientX - boundingRect.x)
        const yPosInBox = (event.clientY - boundingRect.y)

        const percentXFromTop = xPosInBox / boundingRect.width * 100
        const percentYFromTop = yPosInBox / boundingRect.height * 100

        console.log( )
        event.target.style.setProperty('--x', percentXFromTop + '%')
        event.target.style.setProperty('--y', percentYFromTop + '%')

    }

    return (    
        <div className="home-page-container">
            <div className='under-construction'>🚧this site is under heavy construction🚧</div>
            <div>Sometimes you need an <em>employee</em>... Other times? An <em>asset</em>.</div>
            <div className="intro">I'm <em>Mohammad Zuiter</em>, {window.innerWidth < 600 ? <br/> : ''}your future<TextRoller/></div>
            <div>Even on this very site, you are using my <a href="#/Posts/infinity-response">Infinity Response</a> <em>font-size</em> and positioning, 
                a <em>GitHub API</em> on my <a href="#/Projects">Projects</a> page, and some
                extremely clever <em>javascript</em> for <em>maximum compatability</em> across older devices.
            </div>

            <div className='image-container' onMouseMove={handleMouseMoveImage}>
                <img className='background' src={fullReds} alt="a blurred image of mohammad zuiter in a red blazer" />
                <img className='foreground' src={fullReds} alt="an overlaying image of mohammad zuiter in a red blazer that is has visible portions on hover" />
            </div>
        </div>
    )
}