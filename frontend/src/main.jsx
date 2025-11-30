import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout.jsx'
import ResumePage from './pages/ResumePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';

createRoot(document.querySelector('main')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/" resume={<ResumePage />} />
        <Route path="/" projects={<ProjectsPage />} />
      </Route>
    </Routes>  
  </BrowserRouter>,
)
