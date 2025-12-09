import React from "react"
import 'css/pages/home.css'
import me from 'images/me.webp'
import blogData from 'data/blogData'
import PostItem from 'comps/PostItem'

export default function HomePage() {
  return (
        <>
            <h1><span> Kamil Wolczynski's Personal Website</span></h1>
            <div className="intro_video">
            
                <img src={me} />
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