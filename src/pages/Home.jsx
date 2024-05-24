import '../assets/styles/home.css'
import TextRoller from '../components/TextRoller'
export default function Home() {
    return (    
        <div className="home-page-container">
            <div className='under-construction'>🚧this site is under heavy construction🚧</div>
            <div>Sometimes you need an <em>employee</em>... Other times? An <em>asset</em>.</div>
            <div className="intro">I'm <em>Mohammad Zuiter</em>, your future <TextRoller/></div>
            <div>Even on this very site, you are using my <em>infinite responsiveness</em>, 
                a <em>GitHub API</em> on my projects page, and some
                extremely clever <em>javascript</em> for <em>maximum compatability</em> across older devices.
            </div>
        </div>
    )
}