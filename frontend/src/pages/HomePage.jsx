import React from "react"
import 'css/pages/home.css'
import me from 'images/me.webp'
import blogData from 'data/blogData'
import PostItem from 'comps/PostItem'
import linksData from 'data/linksData.json'

export default function HomePage() {
  return (
        <>
            <h1 className="fancy"> Kamil Wolczynski's<br />Blog</h1>
            <div className="intro_video">
            
                <img src={me} />
            </div>    
            <div className="links">
                
                {linksData.map((link) => (
                    <a target="_blank" href={link.url}>
                        
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