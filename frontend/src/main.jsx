import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout.jsx'
import HomePage from 'pages/HomePage'
import ResumePage from 'pages/ResumePage.jsx';
import ProjectsPage from 'pages/ProjectsPage.jsx';
import ProjectsPage from 'pages/ProjectPage.jsx';


createRoot(document.querySelector('main')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:handle" element={<ProjectPage />} />
      </Route>
    </Routes>  
  </BrowserRouter>,
)
