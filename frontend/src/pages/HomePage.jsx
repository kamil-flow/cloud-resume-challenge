import React from "react"
import 'css/pages/home.css'
import me from 'images/me.webp'
import blogData from 'data/blogData'
import PostItem from 'comps/PostItem'
import linksData from 'data/linksData.json'
import ViewCounter from 'comps/ViewCounter'


export default function HomePage() {
  return (
        <>
        <div className="hero">
            <h1 className="fancy"> Kamil Wolczynski: Transitioning from Logistics to IT Automation Specialist<br /></h1>
            <p className="bio">Leveraging 10 years in logistics to drive AI and automation transformations. Passionate about simplifying complex systems with AWS, and Python.
                Explore my journey and projects, including Kindle Highlights automation.</p>

            <ViewCounter />
        </div>
            <div className="intro_video">
            
                <img src={me} />
            </div>    
            <div className="links">
                
                {linksData.map((link) => (
                    <a key={link.url} target="_blank" href={link.url}>
                        
                        <span className="icon" dangerouslySetInnerHTML={{__html: link.icon}} />
                        <span className="name">{link.name}</span>
                    </a>
                 ))}
            </div>

            <section className="posts">
                <h2>Recent Posts</h2>
                {blogData.map((post) => (
                    <PostItem key={post.handle || post.name} post={post} />
                 ))}
                
            </section>   
        </>
    )
}    