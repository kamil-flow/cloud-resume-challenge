import React from "react"
import 'css/pages/resume.css'
import resumeData from "data/ResumeData";
import ResumeHeader from "comps/resume/ResumeHeader.jsx";

export default function ResumePage() {
  return (
        <>
          <ResumeHeader person={resumeData.person}></ResumeHeader>
          <section className="professional-summary">
            <h2>Professional summary</h2>
            <div className="items">
              <div className="item">
                <div className="item_heading">
                  <div className="info">
                    <p className="small">
                      The question “How can I be more useful?” has guided every step of my career.
                      I believe fulfilment comes from solving meaningful problems and helping
                      others work more effectively. Over more than a decade in logistics and
                      five years as a training coach, I’ve learned that clarity, active listening,
                      and structured collaboration are the foundation of great results.
                    </p>
                    <p className="small">
                      Working daily with M3, I became fascinated by how technology can simplify
                      complexity. This curiosity led me to study cloud computing, automation,
                      and data analytics in my free time. Learning AWS, Python, and Excel 
                      automation has deepened my understanding of how systems connect and 
                      strengthened my drive to improve how people and technology work together.
                    </p>
                  </div>
                </div>
              </div>
            </div>      
          </section>

          <section className="professional-experience">
            <h2>Professional experience</h2>
            <div className="items">
              <div className="item">
                <div className="item_heading">
                  <div className="info">
                    <h3>Logistics Coordinator</h3>
                  </div>
                  <div className="details">
                    <div className="location">Cloetta Holland</div>
                    <div className="duration">March 2021 - Present</div>
                  </div>
                </div>
                <ul>
                  <li>Keep stock levels at 99% accuracy</li>
                  <li>Automated Excel workflows for clearer reporting and time savings of over 120%</li>
                  <li>Mentored and onboarded new team members with detailed guides and coaching</li>
                  <li>
                    Led a master data improvement project: introduced an automated email workflow 
                    to alert the warehouse when new items are created. Developed Excel automation 
                    to ensure item information is proactively shared, preventing missed updates 
                    and delivery delays.
                  </li>
                </ul>
              </div>
            </div>  
          </section>

          <section className="projects">
            <h2>Projects</h2>
            <div className="items">
              <div className="item">
                <div className="item_heading">
                  <div className="info">
                    <h3>AWS-Powered Book Highlight Mailer</h3>
                    <ul>
                      <li>Built a system using AWS S3 and Lambda to send daily Kindle highlight summaries via email</li>
                    </ul>

                    <h3>Linux + Kindle Sync Automation</h3>
                    <ul>
                      <li>Used Bash scripting to synchronise book highlights from Kindle to laptop</li>
                    </ul>

                    <h3>Excel: Invoice organized file</h3>
                    <ul>
                      <li>Rebuilt a disorganised Excel tool into a clean, automated report generator</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="skills">
            <h2>Skills & Interests</h2>
            <div className="items">
              <div className="item">
                <div className="item_heading">
                  <div className="info">
                    <h3>Cloud Resume Challenge</h3>
                    <p>I learn the basics of cloud, and use projects to retain this knowledge.</p>
                  </div>
                  <div className="details">
                    <div className="location">Online</div>
                    <div className="duration">November 2025</div>
                  </div>
                </div>
                <ul>
                  <li>learn main AWS services</li>
                  <li>learn front and backend</li>
                  <li>document the whole project on GitHub</li>
                </ul>
              </div>
            </div>  
          </section>

          <section className="ongoing-learning">
            <div className="items">
              <div className="item">
                <div className="item_heading">
                  <div className="info">
                    <h3>AWS Solution Architect</h3>
                    <p>I'm studying AWS documentation, aiming to pass the AWS SAA exam.</p>
                  </div>
                  <div className="details">
                    <div className="location">Online</div>
                    <div className="duration">September 2025 - Present</div>
                  </div>
                </div>
                <ul>
                  <li>deep dive into AWS services</li>
                  <li>work in CLI</li>
                  <li>document the whole project on GitHub</li>
                </ul>
              </div>
            </div>  
          </section>
    </>
  );
}
