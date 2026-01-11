import React from "react";
import { NavLink, UNSAFE_WithComponentProps } from "react-router-dom";

export default function ProjectItem( project ) {
  const post = project.post;
 

  return (
    <NavLink className="post_item" to={`/blog/${post.date}/${post.handle}`}>
        <span className="name">{post.name}</span>
        <span className="date">{post.date}</span>


    </NavLink>
        
  );
}