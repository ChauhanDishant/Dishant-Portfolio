import type { Experience, Project } from "@/types";

export const EXPERIENCES: Experience[] = [
  {
    id: "thinkbiz-technologies",
    title: "Junior Full Stack Developer",
    company: "ThinkBiz Technologies Private Ltd.",
    location: "Ahmedabad, Gujarat, India",
    period: "Jan 2025 – Present",
    startDate: "2025-01-01",
    endDate: null,
    type: "current",
    description:
      "Working as a Full Stack Developer on large-scale enterprise web applications, contributing to both ongoing system enhancements and production issue resolution across frontend, backend, and infrastructure layers.",
    highlights: [
      "Started as a Full Stack Intern and transitioned to a full-time Junior Developer after successful completion of a 6-month internship",
      "Strengthened core web fundamentals including HTML, CSS, JavaScript, and TypeScript, followed by in-depth React development",
      "Built frontend features using React with hooks, Redux, Context API, debouncing techniques, and multi-language support",
      "Worked on backend services using Node.js and Express, integrating REST APIs and handling data-driven workflows",
      "Actively contributed to production issue resolution by debugging APIs and existing functionalities across development, staging, and production environments",
      "Implemented system enhancements and new features as part of ongoing improvement initiatives, modifying existing workflows where required",
      "Contributed to system replication and environment setup by adapting existing codebases to new environments with different configurations",
      "Handled API and frontend adjustments during migration from one API gateway solution to another to align with updated infrastructure requirements",
      "Gained hands-on exposure to cloud and infrastructure workflows including container image handling, serverless execution, storage services, and secrets management",
      "Developed practical understanding of relational databases and explored caching and queue-based concepts independently",
    ],
    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Node.js",
      "Express",
      "REST APIs",
      "MySQL",
      "AWS (ECR, Lambda, S3, RDS, Secrets Manager)",
      "Swagger",
      "Storybook",
      "PostgreSQL (self-learning)",
      "Redis (self-learning)",
    ],
  },
  {
    id: "internship-miracle-technolabs",
    title: "Frontend Development Intern",
    company: "Miracle TechnoLabs",
    location: "Jamnagar, Gujarat, India (Remote)",
    period: "May 2023 – Jun 2023",
    startDate: "2023-05-01",
    endDate: "2023-06-30",
    type: "internship",
    description:
      "Completed a college summer internship focused on building a strong foundation in frontend web development using modern JavaScript frameworks.",
    highlights: [
      "Learned and practiced core web fundamentals including HTML, CSS, and JavaScript",
      "Gained hands-on exposure to React.js and component-based UI development",
      "Built basic learning projects to understand React concepts such as components, props, and state",
      "Implemented simple UI layouts and interactive features as part of guided tasks",
      "Developed an understanding of frontend development workflows and best practices",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React.js"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "workguru",
    title: "WorkGuru – Business & Workforce Management System",
    description:
      "A Mern-stack business and workforce management application that helps small and medium-scale businesses manage workers, attendance, loans, inventory, clients, orders, and invoices from a single platform.",
    longDescription:
      "WorkGuru is designed to replace manual and fragmented record-keeping systems with a centralized digital solution. The application is divided into business management and worker management modules, enabling efficient handling of daily operations such as attendance tracking, loan management, inventory monitoring, and invoice generation.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "REST APIs",
    ],
    featured: true,
    icon: "📊",
    link: "#",
    githubUrl: "https://github.com/ChauhanDishant/WorkGuru",
  },
  {
    id: "homemakers",
    title: "HomeMakers – Home Service Booking Platform",
    description:
      "A web-based home service booking platform that allows users to schedule and manage household services such as carpentry, plumbing, painting, movers, and packers.",
    longDescription:
      "HomeMakers simplifies the process of booking and managing home services through an easy-to-use interface. Users can schedule service appointments, track tasks, and receive reminders, making household management more organized and efficient.",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    featured: true,
    icon: "🏠",
    link: "#",
    githubUrl: "https://github.com/ChauhanDishant/Homemakers",
  },
  {
    id: "dynamic-checklist-builder",
    title: "Dynamic Checklist Builder",
    description:
      "A dynamic checklist and form-building web application that allows users to create customizable checklists based on configurable form fields.",
    longDescription:
      "The Dynamic Checklist Builder enables users to define form structures dynamically and generate checklists without hardcoding fields. The project focuses on flexibility, reusability, and dynamic rendering of form inputs, making it suitable for inspection flows, audits, and requirement-based checklists.",
    technologies: ["React", "TypeScript", "JavaScript", "Node.js", "REST APIs"],
    featured: true,
    icon: "🧩",
    link: "#",
    githubUrl: "https://github.com/ChauhanDishant",
  },
];

export const GITHUB_USERNAME = "ChauhanDishant";

export const SKILLS_BY_CATEGORY = {
  Frontend: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Redux"],
  Backend: ["Node.js", "Express", "MySQL", "REST APIs"],
  "Cloud & DevOps": ["AWS (ECR, Lambda, S3, RDS)", "Git", "Swagger"],
  "Tools & Others": ["Storybook", "Redis (learning path)"],
};

export const SOCIAL_LINKS = {
  LinkedIn: {
    url: "https://www.linkedin.com/in/chauhandishant/",
  },
  College: {
    name: "CHARUSAT",
    url: "https://www.charusat.ac.in/",
  },
  Company: {
    ThinkBiz: {
      name: "ThinkBiz Technology Private Ltd.",
      url: "https://www.linkedin.com/company/thinkbiz-technology-private-limited/",
    },
    MiracleTechnoLabs: {
      name: "Miracle TechnoLabs",
      url: "https://www.linkedin.com/company/miracle-technolabs/",
    },
  },
  GitHub: {
    url: "https://github.com/ChauhanDishant",
  },
};

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkovwqab";

export const TOAST_SUCCESS = "Signal received 📡 I’ll respond shortly.";
export const TOAST_ERROR = "Something went wrong 🚨 Please try again later.";
