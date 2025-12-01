// ResumePage.jsx
import React from "react";
import "css/pages/resume.css";
import resumeData from "data/ResumeData";           // make sure path is correct
import ResumeHeader from "comps/resume/ResumeHeader.jsx";
import ResumeSectionItem from "comps/resume/ResumeSectionItem.jsx";  // we fixed this one!

export default function ResumePage() {
  const {
    person,
    professionalSummary,
    professionalExperience,
    projects,
    skills,
    ongoingLearning,
  } = resumeData;

  return (
    <>
      {/* 1. Header */}
      <ResumeHeader person={person} />

      {/* 2. Professional Summary */}
      <section className="professional-summary">
        <h2>{professionalSummary.title}</h2>
        <div className="paragraphs">
          {professionalSummary.paragraphs.map((para, i) => (
            <p key={i} className="small">{para}</p>
          ))}
        </div>
      </section>

      {/* 3. Professional Experience */}
      <section className="professional-experience">
        <h2>{professionalExperience.title}</h2>
        <div className="items">
          {professionalExperience.items.map((job, index) => (
            <div className="item" key={index}>
              <div className="item_heading">
                <div className="info">
                  <h3>{job.role}</h3>
                </div>
                <div className="details">
                  <div className="location">{job.company}</div>
                  <div className="duration">{job.duration}</div>
                </div>
              </div>
              <ul>
                {job.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Projects */}
      <section className="projects">
        <h2>{projects.title}</h2>
        <div className="items">
          {projects.items.map((proj, index) => (
            <ResumeSectionItem key={index} item={proj} />
          ))}
        </div>
      </section>

      {/* 5. Skills & Interests */}
      <section className="skills">
        <h2>{skills.title}</h2>
        <div className="items">
          {skills.items.map((skill, index) => (
            <ResumeSectionItem key={index} item={skill} />
          ))}
        </div>
      </section>

      {/* 6. Ongoing Learning */}
      <section className="ongoing-learning">
        <h2>{ongoingLearning.title}</h2>
        <div className="items">
          {ongoingLearning.items.map((learning, index) => (
            <ResumeSectionItem key={index} item={learning} />
          ))}
        </div>
      </section>
    </>
  );
}