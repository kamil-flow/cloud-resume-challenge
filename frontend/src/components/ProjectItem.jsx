import React from "react";
import { NavLink } from "react-router-dom";

export default function ProjectItem({ project }) {
  const placeholder = "https://placehold.co/320x200";
 

  return (
    <div className="projects_item">
        <div className="project_info">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <NavLink className="bttn" to={`/project/${project.handle}`}>View Project Details</NavLink>

        </div>
        
        <img src={project.thumbnail || placeholder}></img>
        
      
        
    </div>
  );
}