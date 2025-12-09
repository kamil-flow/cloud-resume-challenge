import React from "react"
import 'css/pages/projects.css'
import projectsData from 'data/projectsData.json'
import ProjectItem from "comps/ProjectItem"

export default function ProjectsPage() {
  return (
    <><h1 className="fancy"> Kamil Wolczynski's<br />Projects</h1><div className="projects">
      {projectsData.map((project) => (
        <ProjectItem key={project.handle || project.name} project={project} />
      ))}

    </div></>
    )
}    