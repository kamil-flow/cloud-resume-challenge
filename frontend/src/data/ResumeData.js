// resumeData.js
// All textual content from your ResumePage component extracted into a single object.
// Import into your React page and render as needed:
// import resumeData from './resumeData';

 const resumeData = {
  person: {
    name: "Kamil Wolczynski",
    locationLine: "Kalmthout, Belgium • kamil.wolfczynski@gmail.com • +31 61 123 123",
    email: "kamil.wolfczynski@gmail.com",
    phone: "+31 61 123 123",
    location: "Kalmthout, Belgium"
  },

  professionalSummary: {
    title: "Professional summary",
    paragraphs: [
      "The question “How can I be more useful?” has guided every step of my career. I believe fulfilment comes from solving meaningful problems and helping others work more effectively. Over more than a decade in logistics and five years as a training coach, I’ve learned that clarity, active listening, and structured collaboration are the foundation of great results.",
      "Working daily with M3, I became fascinated by how technology can simplify complexity. This curiosity led me to study cloud computing, automation, and data analytics in my free time. Learning AWS, Python, and Excel automation has deepened my understanding of how systems connect and strengthened my drive to improve how people and technology work together."
    ]
  },

  professionalExperience: {
    title: "Professional experience",
    items: [
      {
        role: "Logistics Coordinator",
        company: "Cloetta Holland",
        duration: "March 2021 - Present",
        bullets: [
          "Keep stock levels at 99% accuracy",
          "Automated Excel workflows for clearer reporting and time savings of over 120%",
          "Mentored and onboarded new team members with detailed guides and coaching",
          "Led a master data improvement project: introduced an automated email workflow to alert the warehouse when new items are created. Developed Excel automation to ensure item information is proactively shared, preventing missed updates and delivery delays."
        ]
      }
    ]
  },

  projects: {
    title: "Projects",
    items: [
      {
        title: "AWS-Powered Book Highlight Mailer",
        bullets: [
          "Built a system using AWS S3 and Lambda to send daily Kindle highlight summaries via email"
        ]
      },
      {
        title: "Linux + Kindle Sync Automation",
        bullets: [
          "Used Bash scripting to synchronise book highlights from Kindle to laptop"
        ]
      },
      {
        title: "Excel: Invoice organized file",
        bullets: [
          "Rebuilt a disorganised Excel tool into a clean, automated report generator"
        ]
      }
    ]
  },

  skills: {
    title: "Skills & Interests",
    items: [
      {
        title: "Cloud Resume Challenge",
        description: "I learn the basics of cloud, and use projects to retain this knowledge.",
        details: {
          location: "Online",
          duration: "November 2025"
        },
        bullets: [
          "learn main AWS services",
          "learn front and backend",
          "document the whole project on GitHub"
        ]
      }
    ]
  },

  ongoingLearning: {
    title: "Ongoing learning",
    items: [
      {
        title: "AWS Solution Architect",
        description: "I'm studying AWS documentation, aiming to pass the AWS SAA exam.",
        details: {
          location: "Online",
          duration: "September 2025 - Present"
        },
        bullets: [
          "deep dive into AWS services",
          "work in CLI",
          "document the whole project on GitHub"
        ]
      }
    ]
  }
};

export default resumeData;
