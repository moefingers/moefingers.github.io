import { useRef } from 'react'
import "../assets/styles/dev.css"

import "../assets/styles/post-single.css"

import SyntaxHighlighter from 'react-syntax-highlighter';
import { xt256 } from 'react-syntax-highlighter/dist/esm/styles/hljs';



export default function HTMLtoJSON() {

    const textareaElement = useRef()
    const HTMLArea = useRef()
    const dateArea = useRef()
    function parseHTMLRef(ref) {
        
        const content = {
            type: 'div',
            props: {
                className: 'post-content-container'
            },
            children: []
        }

        function readNode(node) {
            if(node.nodeType == Node.ELEMENT_NODE) {
                const attributes = {}
                for(const attribute of node.attributes) {
                    if(attribute.name != "style" ){
                      attributes[attribute.name] = attribute.value
                    }
                }
                if(attributes.overridetypeto){
                    delete attributes.contentstring
                    return {type: attributes.overridetypeto, props: {className: node.classList.value, ...attributes}, children: node.attributes.contentstring.value}
                }
                const children = Array.from(node.childNodes).map(readNode)
                return {type: node.tagName.toLowerCase(), props: {className: node.classList.value, ...attributes}, children: children}
            } else if (node.nodeType == Node.TEXT_NODE) {
                return node.data
            }
        }
        function readChildren(element) {
            console.log(element.children)
            
            if(element.children.length == 0){
                console.log(`${element.tagName} has no children`)
                const attributes = {}
                if(element.attributes.length != 0){
                    element.attributes.forEach(attribute => {
                        attributes[attribute.name] = attribute.value
                    })
                }// for each attribute - attribute.name: attribute.value
                
                return {type: element.tagName.toLowerCase(), props: {className: element.classList.value, ...attributes}, children: element.innerText}
            } else {
                console.log(`${element} has children`)
                let childNodes = []
                for (const childNode of element.childNodes) {
                    if(childNode.nodeType == 3){
                        childNodes.push({type: 'text', props: {}, children: childNode.data})
                    } else {
                        childNodes.push(readChildren(childNode))
                    }
                }
                return {type: element.tagName.toLowerCase(), props: {className: element.classList.value}, children: childNodes}
            }
        }
        console.log(ref)
        const result = readNode(ref.current)
        console.log(result)
        textareaElement.current.value = JSON.stringify(result, null, 3)

    }
    function logDate(){
        const now = new Date();
        const ISOtime = now.toISOString();
        console.log(ISOtime)
        
        dateArea.current.value = ISOtime


        const dateMStest = Date.now("2024-05-26T20:29:30.060Z").toString();;
        const ms = dateMStest
        console.log(ms)
    }

    /*
    <p className='post editor'>Editor: <a editorlinktag="true" >XXXXXXXXXXXXXXXXX</a></p>
    <a href="#/Posts/getting-all-commits#intro" target="_blank">inter-site-link in new tab</a>
    <SyntaxHighlighter language='html' style={xt256} className='code-container' contentstring={stringofcontents} overridetypeto={"SyntaxHighlighter"} syntaxhighlighterstyle={"xt256"}>
        {stringofcontents}
    </SyntaxHighlighter>
    */

    return (
        <div className="dev-page-container post-single-page-container">
            <h1>HTMLtoJSON (for react posts)</h1>
            <button className='dev' onClick={() => {logDate()}}><em className='quaternary'>console.log</em>(<em>ISOtime</em>) and print to page</button>
            <input type="text" readOnly ref={dateArea}/>
            <button className='dev' onClick={() => {parseHTMLRef(HTMLArea)}}><em className='quaternary'>console.log</em> <em>div.html-area</em> as <em className='tertiary'>JSON</em> and print to page</button> <br />
            <textarea readOnly ref={textareaElement}></textarea> <br />

            
            <div className="html-area" ref={HTMLArea}>

                
                <section className='header'>
                    <h1 className='post title'>$$$title$$$</h1>
                    <p className="post author">By: $$$author$$$</p>
                    <p className="post date created">Posted: $$$createdAt$$$</p>
                    <p className="post date updated">Last Edited: $$$updatedAt$$$</p>
                </section>
                <section className='index'>
                    <h2>Index</h2>
                    <a href="#/Posts/infinity-response#intro">Introduction, The Problem</a>
                    <a href="#/Posts/infinity-response#my-situation">My Situation</a>
                    <a href="#/Posts/infinity-response#the-plan">The Plan</a>
                    <a href="#/Posts/infinity-response#relationship">Finding The Relationship</a>
                    <a href="#/Posts/infinity-response#implementation">The Implementation</a>
                    <a href="#/Posts/infinity-response#expansion">Expanding The Implentation</a>
                    <a href="#/Posts/infinity-response#another-situation">Another Situation??</a>
                    <a href="#/Posts/infinity-response#considerations">Accessibility Considerations</a>
                    <a href="#/Posts/infinity-response#accessibility-solutions">Accessibility Solutions</a>
                    <a href="#/Posts/infinity-response#afterword">Afterword, Real Uses</a>
                </section>
                <section id = '/Posts/infinity-response#intro'>
                    <h2>Intro, The Problem</h2>
                    <p>Have you ever been making a set of <em>media queries</em> to have font-size fit in a given width and thought there might be a pattern?</p>
                    <p>Well you'd be correct. As developers though, it's not very <em>DRY</em> (Don't Repeat Yourself).</p>
                    <p>What's the problem? It doesn't make sense to have twenty-plus <em>media queries</em> for maximum responsiveness when there is a relationship between width and font-size.</p>
                    <p>This does begin to lead us to a solution, although we will first have to identify that relationship.</p>
                </section>
                <section id = '/Posts/infinity-response#my-situation'>
                    <h2>My Situation</h2>
                    <p>On <a href="https://moefingers.github.io/react-timer-stopwatch-v2/" target="_blank">version 2</a> of my <em>React</em> Stopwatch / Timer combo, I wanted the application to look correct on any screen size. It's very simple, there is a maximum allowable width for a given text.</p>
                    <p>Given a time such as <em>00:00</em>, I do not want that to ever exceed the width of the screen. You might be questioning the accessibility of that, and we'll get into that later. For now, let me ask you the following:</p>
                    <p>How accessible is it to have half of your text off-screen? </p>
                    <p>Further complicating matters, my application was technically a rectangle, and not a square. And while I could adjust the layout to take advantage of screen <em>orientation</em>, the constraints would fluctuate between <em>width</em> and <em>height</em>.</p>
                    <p>I left the full set of original <em>media queries</em> below so you can understand the gravity of the situation.</p>
                    <SyntaxHighlighter language='html' style={xt256} className='code-container' contentstring={originalMediaQueries} overridetypeto={"SyntaxHighlighter"} syntaxhighlighterstyle={"xt256"}>
                        {originalMediaQueries}
                    </SyntaxHighlighter>
                </section>
                <section id = '/Posts/infinity-response#the-plan'>
                    <h2>The Plan</h2>
                    <p>Following the previous point, I knew I needed to identify the unique constraint scenarios. While we will ultimately escape twenty-plus <em>media queries</em>, we will not be escaping more than one.</p>
                    <p>Keeping that in mind, let's move on to how we're going to get to the solution itself and what the primary objective is right now.</p>
                    <p>We need to identify the relationship between <em>font-size</em> and the current <em>width</em>. Fortunately for us, there is something called <em>linear regression</em>.</p>
                    <p>Now I'm not going to get into the specifics of the math behind that, but I'll tell you that a spreadsheet like <em>Google Sheets</em> can take care of this and some more advanced regressions for us later for us.</p>
                    <p>The final goal would be using something like CSS's <em><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc" target="_blank">calc (MDN)</a></em> to calculate the <em>font-size</em> based on a given <em>width</em> constraint, which would be known from something like <em>vw</em> (viewport width).</p>
                </section>
                <section id = '/Posts/infinity-response#relationship'>
                    <h2>Finding The Relationship</h2>
                    
                    <p>Let's get each smallest <em>width</em> (the minimum width) for each corresponding <em>font-size</em>.</p>
                    <p>These values are unique to my situation, but a similar process can be done for other elements, and we will create a factor that can be generalized to other sizes as well.</p>
                    
                    <p><a href="https://docs.google.com/spreadsheets/d/1YWHZGA8QqJ0v5L1qUkIltfGuPRdSJtqExeKh91BiiWw/edit?usp=sharing " target="_blank">Here's a link</a> to that spreadsheet that includes a <em>linear trendline</em>.</p>
                    <img src="/infinity-response/linear-chart-0.png" alt="Two columns representing X and Y values followed by a graph plotting these points and the linear trendline" />
                    <p>Due to human error, not all the dots are exactly on the line, but that's to be expected. What's important and worth noting is that they do generally fall close to the <em>trendline</em>.</p>
                </section>
                <section id='/Posts/infinity-response#implementation'>
                    <h2>The Implementation</h2>
                    <p>Now that we have our formula, let's throw it into <em>calc</em> on the <em>font-size.</em></p>
                    <code>{`css.selector#title { font-size: calc((0.0716 * 100vw) -1.57px); }`}</code>
                    <p>Or better yet, let's set a variable in the <em>:root</em> element.</p>
                    <code>{`:root { --font-size-title: calc((0.0716 * 100vw) -1.57px); }`}</code>
                    <p>Or, somehow even better, we can make a more general size factor to address problems that arise from using <em>px</em> elsewhere (on differently sized devices) such as outlines, placement, or shadows.</p>
                    <p>Here's an example of what the issue I'm referring to.</p>
                    <div className='container-side-by-side'>
                        <img src="/infinity-response/box-shadow-0.png" alt="showing box shadow normal" />
                        <img src="/infinity-response/box-shadow-1.png" alt="showing box shadow oversized" />
                        <img src="/infinity-response/box-shadow-2.png" alt="showing box shadow undersized" />
                    </div>
                    <p>And the proposed solution to be used.</p>
                    <code>{`:root {--general-size-factor-px: (0.00188323 * 100vw);}`}</code>
                    <p>You'll notice it's pretty much identical except the factor is different. This number can be adjusted to meet any <em>linear</em> need.</p>
                </section>
                <section id="/Posts/infinity-response#expansion">
                    <h2>Expanding The Implementation</h2>
                    <p>For my unique needs, I needed a factor that would adjust to be dependent on <em>width</em> or <em>height</em> depending on the situation.</p>
                    <p>In fact, I had four situations.. </p>
                    <img src="/infinity-response/four-situations.png" alt="four unique situations including where ratio exceeds 2:1, between 2:1 and 1:1, between 1:1 and 1:2, and exceeding 1:2" />
                    <p>So here's what I came up with. (I'm reailzing the syntax highlighter that I've chosen struggles, and so I may create one down the road. How hard could it be?)</p>
                    <SyntaxHighlighter language='html' style={xt256} className='code-container' contentstring={fourSolutions} overridetypeto={"SyntaxHighlighter"} syntaxhighlighterstyle={"xt256"}>
                        {fourSolutions}
                    </SyntaxHighlighter>
                    <p>You'll notice there are some <em>offset-path</em>s, <em>offset-distance</em>s, and some <em>transform: rotate</em>s. This is because I want the two components to animate between going from side by side to on top of one another, following a circular path. This isn't super relevant here and maybe we'll discuss the magic of <em>offset-path</em>s another day.</p>

                </section>

                <section id = '/Posts/infinity-response#another-situation'>
                    <h2>Another Situation??</h2>
                    <p>Have you ever wanted a set of text which has a changing <em>length</em> of characters to take up a given <em>width</em>?</p>
                    <p>Well I have, because depending on which units you choose to display and how many decimal places in the settings of my <a href="https://moefingers.github.io/react-timer-stopwatch-v2/" target='_blank'>stopwatch</a>, there is an unspecified set of characters.</p>
                    <p>After the third of ~17 <em>case</em>s in a <em>switch</em>, I recognized there was going to be a relationship between the <em>length</em> of the characters and the <em>font-size</em> I was applying to the element.</p>
                    <p>Back to the <a href="">sheets</a> we go... And unlike before, the relationship is now negative and non linear.</p>
                    <img src="/infinity-response/power-series-chart-0.png" alt="plotting power-series" />
                    <p>I still had a <em>switch</em>, but in this case (no pun intended), it is only to say the <em>font-size</em> should have a maximum if it is below a certain size.</p>
                    <p>It's worth noting that to get all the points to fall onto the line, I had to use a <em>power series</em> equation. It was perfect after that.</p>
                    <SyntaxHighlighter language='html' style={xt256} className='code-container' contentstring={switchCase} overridetypeto={"SyntaxHighlighter"} syntaxhighlighterstyle={"xt256"}>
                        {switchCase}
                    </SyntaxHighlighter>
                </section>

                <section id="/Posts/infinity-response#considerations">
                    <h2>Accessibility Considerations</h2>
                    <p><em>["All of you are shepherds and each of you is responsible for his flock"]</em><a href='https://sunnah.com/adab:212' target="_blank">(source)</a> - Prophet Muhammad (pbuh) </p>
                    <p>A front-end developer is the shepherd of his front-end, and it falls on his shoulders to ensure that his site meets the needs of those who are less fortunate.</p>
                    <p>A critical point was brought to me when I was sharing with <a href="https://chriscoyier.net/" target="_blank">Chris Coyier</a> these solutions I've created.</p>
                    <p><em>"Ah so it prevents the text size changing when you zoom? Just as a heads up, that's an accessibility no-no. Clever how it works though."</em></p>
                    <p>He's correct. A lot of people (including my own dad) rely on and benefit from being able to increase general magnification on a page, which induces a reduction in <em>viewport</em>, causing a static <em>font-size</em> to seem as though it has enlarged.</p>
                    <p>There are a few solutions that come to mind.</p>
                </section>

                <section id="/Posts/infinity-response#accessibility-solutions">
                    <h2>Accessibility Solutions</h2>
                    <p>More simply, and what I've done even on the page you're reading, is implement more traditional <em>media queries</em> that apply a factor on top of the factor we created earlier.</p>
                    <p>Here is two of four <em>media queries</em> regarding this.</p>
                    <SyntaxHighlighter language='html' style={xt256} className='code-container' contentstring={accsol1} overridetypeto={"SyntaxHighlighter"} syntaxhighlighterstyle={"xt256"}>
                        {accsol1}
                    </SyntaxHighlighter>

                    <p>Another potential solution is to simply change the formula and how the <em>font-size</em> scales to be non-linear.</p>

                    <p>And a third solution is to just leave it alone, although I argue against this when there are sites that look like this at <em>200px</em>x<em>100px</em>.</p>
                    <img src="/infinity-response/gmail-200x100.png" alt="Gmail at 200 x 100" />
                </section>
                <section id="/Posts/infinity-response#afterword">
                    <h2>Afterword, Real Uses</h2>
                    <p>As mentioned before, when you have a fixed constraint for a single line of text, like in my <a href="https://moefingers.github.io/react-timer-stopwatch-v2/" target='_blank'>stopwatch</a>, these solutions are great.</p>
                    <p>There is notable benefit in using these for other styling elements that use <em>px</em> values, or general placement on screen as well.</p>
                    <p>For text that changes in length where you don't want to waste space, an often but not necessarily non-linear solution can be pursued.</p>

                    <p>And lastly, for bodies of text that can survive enlargement by <em>text-wrap</em>, a factor should be applied or those <em>font-size</em>s should just be left alone.</p>
                </section>
            </div>

        </div>
    )
}

const originalMediaQueries = `@media screen and ( width >= 2000px){
    :root {
      --font-size-title: 140px;
    }
  }
  @media screen and ( width >= 1800px) and ( width < 2000px){
    :root {
      --font-size-title: 130px;
    }
  }
  @media screen and ( width >= 1600px) and ( width < 1800px){
    :root {
      --font-size-title: 116px;
    }
  }
  @media screen and ( width >= 1400px) and ( width < 1600px){
    :root {
      --font-size-title: 95px;
    }
  }
  @media screen and ( width >= 1200px) and ( width < 1400px){
    :root {
      --font-size-title: 80px;
    }
  }
  @media screen and ( width >= 1000px) and ( width < 1200px){
    :root {
      --font-size-title: 70px;
    }
  }
  @media screen and ( width >= 800px) and ( width < 1000px){
    :root {
      --font-size-title: 56px;
    }
  }
  @media screen and ( width >= 700px) and ( width < 800px){
    :root {
      --font-size-title: 50px;
    }
  }
  @media screen and ( width >= 600px) and ( width < 700px){
    :root {
      --font-size-title: 40px;
    }
  }
  @media screen and ( width >= 550px) and ( width < 600px){
    :root {
      --font-size-title: 37px;
    }
  }
  @media screen and ( width >= 500px) and ( width < 550px){
    :root {
      --font-size-title: 33px;
    }
  }
  @media screen and ( width >= 450px) and ( width < 500px){
    :root {
      --font-size-title: 31px;
    }
  }
  @media screen and ( width >= 400px) and ( width < 450px){
    :root {
      --font-size-title: 27px;
    }
  }
  @media screen and ( width >= 350px) and ( width < 400px){
    :root {
      --font-size-title: 24px;
    } 
  }
  @media screen and ( width >= 300px) and ( width < 350px){
    :root {
      --font-size-title: 21px;
    }
  }
  @media screen and ( width >= 250px) and ( width < 300px){
    :root {
      --font-size-title: 17px;
    }
  }
  @media screen and ( width >= 210px) and ( width < 250px){
    :root {
      --font-size-title: 14px;
    }
  }
  @media screen and ( width >= 180px) and ( width < 210px){
    :root {
      --font-size-title: 11px;
    }
  }
  @media screen and ( width >= 150px) and ( width < 180px){
    :root {
      --font-size-title: 9px;
    }
  }
  @media screen and ( width >= 120px) and ( width < 150px){
    :root {
      --font-size-title: 7px;
    }
  }
  @media screen and ( width >= 100px) and ( width < 120px){
    :root {
      --font-size-title: 6px;
    }
  }
  @media screen and ( width >= 80px) and ( width < 100px){
    :root {
      --font-size-title: 4.5px;
    }
  }
  @media screen and ( width >= 60px) and ( width < 80px){
    :root {
      --font-size-title: 3px;
    }
  }`

const fourSolutions = `@media screen and ( width < 50vh ) and (orientation:portrait){ /*case 1*/
.app{
  width: 100vw;
  height: 200vw;
}
.stopwatch-section, .timer-section {
  width: 100vw;
  height: 100vw;
}

.stopwatch-section{
  transform: translate(0, 0) rotate(0deg);
  offset-path: circle(50vw at 50vw 50vh);
  offset-distance:75%;
}
.timer-section{
  transform: translate(0, 0) rotate(180deg);
  offset-path: circle(50vw at 50vw 50vh);
  offset-distance:25%;
}
:root {
  --font-size-title: calc((0.0650 * 100vw) - 1.57px);
  --general-size-factor-px: (0.00188323 * 100vw);
}
.title{
  offset-path: circle(45% at 50% 50%);
  offset-distance:75%;
}
}
/* stack using height to avoid exceeding width where vh > 2x vw 
Imagine a portrait phone between 1:1 and 1:2*/
@media screen and ( width >= 50vh ) and (orientation:portrait){
.app{
  width: 50vh;
  height: 100%;
}
.stopwatch-section, .timer-section {
  width: 50vh;
  height: 50vh;
}

.stopwatch-section{
  transform: translate(0, 0) rotate(0deg);
  offset-path: circle(25vh at 50vw 50vh);
  offset-distance:75%;
}
.timer-section{
  transform: translate(0, 0) rotate(180deg);
  offset-path: circle(25vh at 50vw 50vh);
  offset-distance:25%;
}
:root {
  --font-size-title: calc((0.0650 * 50vh) - 1.57px);
  --general-size-factor-px: (0.00188323 * 50vh);
}
.title{
  offset-path: circle(45% at 50% 50%);
  offset-distance:50%;
}
}


/************** Landscape */

/* stack using width to avoid exceeding height where 2x vh > vw
Imagine a landscape phone between 1:1 and 2:1  */
@media screen and ( height > 50vw ) and (orientation:landscape) {
.stopwatch-section, .timer-section {
  width: 50vw;
  height: 50vw; 
}

.stopwatch-section{
  transform: translate(0, 0) rotate(90deg);
  offset-path: circle(25vw at 50vw 50vh);
  offset-distance:50%;
}
.timer-section{
  transform: translate(0, 0) rotate(270deg);
  offset-path: circle(25vw at 50vw 50vh);
  offset-distance:0%;
}
:root {
  --font-size-title: calc((0.0650 *50vw) - 1.57px);
  --general-size-factor-px: (0.00188323 * 50vw);
}
.title{
  offset-path: circle(45% at 50% 50%);
  offset-distance:75%;
}
}
/* stack using height to avoid exceeding width where vw > 2x vh 
Imagine a landscape phone more extreme/longer than 2:1*/
@media screen and ( height <= 50vw ) and (orientation:landscape) {
.stopwatch-section, .timer-section {
  width: 100vh;
  height: 100%; 
}

.stopwatch-section{
  transform: translate(0, 0) rotate(90deg);
  offset-path: circle(50vh at 50vw 50vh);
  offset-distance:50%;
}
.timer-section{
  transform: translate(0, 0) rotate(270deg);
  offset-path: circle(50vh at 50vw 50vh);
  offset-distance:0%;
}
:root {
  --font-size-title: calc((0.0650 * 100vh) - 1.57px);
  --general-size-factor-px: (0.00188323 * 100vh);
}
.title{
  offset-path: circle(45% at 50% 50%);
  offset-distance:50%;
}
}`

const switchCase =`let caseResult = 797 * (newPrettyTime.length ** -1.03)
switch(newPrettyTime.length) {
    case 0: case 1: case 2: case 3: case 4: {caseResult = 180; break}
    default: {caseResult = (730 * (newPrettyTime.length ** -1.03))}
}
mainStopwatchTimeElement.current.style.fontSize = \`calc(var(--general-size-factor-px) * \${caseResult})\` // 12, 62 | 11, 69 | 10, 76 | 9, 83 | 8, 94`

const accsol1 = `@media screen and (width <= 400px ) {
    :root {
      --font-size-factor-px: calc(var(--general-size-factor-px) * 1.2);
      --enlargeable-font-size-factor-px: calc(var(--font-size-factor-px) * 2);
    } 
    
  }
  
  @media screen and (width <= 200px ) {
    :root {
      --font-size-factor-px: calc(var(--general-size-factor-px) * 1.3);
      --enlargeable-font-size-factor-px: calc(var(--font-size-factor-px) * 2.5);
    }
    
  }`