import React from "react"
import "css/pages/projects.css"
import projectsData from "data/projectsData.json"

import { useParams } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';
import { NavLink } from "react-router-dom";
import { projectImages } from 'data/projectImages'


export default function ProjectPage() {
     const { handle } = useParams();

     const project = projectsData.find(p => p.handle === handle);
     if (!project) {
  
        return (
        <>
            <NavLink className='bttn' to={`/projects`}>
            
                <ChevronLeft />
                Back to all projects
            </NavLink>
            <h1 className="fancy">Project: {project.name}</h1>
        </>
        );      
     }
     
     const thumbnail = projectImages[project.handle];

     return (
        <>
            <NavLink className="bttn" to="/projects">
                <ChevronLeft />
                Back to all projects
            </NavLink>
    
            <h1 className="fancy">Project: {project.name}</h1>

            {thumbnail && (
                <img
                    className="project-hero"
                    src={thumbnail}
                    alt={`${project.name} illustration`}
                />
            )}
            
            <p>{project.description}</p>
            <div className="markdown" dangerouslySetInnerHTML={{ __html: project.body_html}} />
        </>
    );
   
}    