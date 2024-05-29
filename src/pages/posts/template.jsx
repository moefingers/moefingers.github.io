<div className="html-area" ref={HTMLArea}>

    
    <section className='header'>
        <h1 className='post title'>$$$title$$$</h1>
        <p className="post author">By: $$$author$$$</p>
                    <p className='post editor'>Editor: <a editorlinktag="true" >XXXXXXXXXX</a></p>
        <p className="post date created">Posted: $$$createdAt$$$</p>
        <p className="post date updated">Last Edited: $$$updatedAt$$$</p>
    </section>
    <section className='index'>
        <h2>Index</h2>
        <a href="#/Posts/postname#intro">intro</a>
        <a href="#/Posts/postname#section">section</a>
    </section>
    <section id = '/Posts/postname#intro'>
        <h2>Intro</h2>
        <p>So essentially I wrote an entire program that would recursively interpet children of a given HTML element and spit them all out in JSON.</p>
    </section>
    <section id = '/Posts/postname#section'>
        <h2>The HTML (input)</h2>
        <p>This is an example of the type of HTML I wanted to turn into JSON that could be later interpreted by <em>React.createElement</em>.</p>
        <p>You may notice that there are tokens like <em>$$$</em><em>token$$$</em>. These will be replaced later by other information that I'd provide for each post in the post database.</p>
        <SyntaxHighlighter language='html' style={xt256} className='code-container' contentstring={""} overridetypeto={"SyntaxHighlighter"} syntaxhighlighterstyle={"xt256"}>
            {""}
        </SyntaxHighlighter>
    </section>
    

</div> 