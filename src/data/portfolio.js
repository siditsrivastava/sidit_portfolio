export const contact = {
  email: 'siditsrivastava84@gmail.com',
  phone: '+91 63925 80612',
  phoneHref: '+916392580612',
  location: 'Gurugram, Haryana, India',
  linkedin: 'https://www.linkedin.com/in/sidit-srivastava',
  github: 'https://github.com/siditsrivastava',
  resume: 'https://drive.google.com/file/d/18BIv9PpzgDepJZArGPXKPXXdBeOuuejg/view?usp=sharing',
  resumeDownload: 'https://drive.google.com/uc?export=download&id=18BIv9PpzgDepJZArGPXKPXXdBeOuuejg',
}

export const projects = [
  {
    id: '01',
    title: 'Real-Time Trading Platform',
    type: 'Client project · Frontend engineering',
    description: 'A responsive trading interface that processes live market updates and keeps profile, market, and transaction data synchronized.',
    contributions: ['Built live market updates with WebSocket, without page refreshes', 'Optimized Redux Toolkit state, rendering, and real-time data flow', 'Integrated REST APIs for profiles, market data, and transaction history'],
    stack: ['React.js', 'Redux Toolkit', 'WebSocket', 'Axios'],
    color: '#b8c7d9',
  },
  {
    id: '02',
    title: 'Email Automation Platform',
    type: 'Client project · AI & full-stack development',
    description: 'An email automation platform with AI-generated drafts based on the recipient’s status and the purpose of the message, helping users prepare and send emails faster.',
    contributions: ['Delivered React and TypeScript features with Python and FastAPI REST APIs', 'Built AI-powered email generation within an existing production platform', 'Resolved UI, backend, API integration, and data-flow issues'],
    stack: ['React.js', 'TypeScript', 'Python', 'FastAPI', 'REST APIs', 'LLMs'],
    color: '#b7cbbd',
  },
  {
    id: '03',
    title: 'AI Data Copilot',
    type: 'Client project · RAG & data visualization',
    description: 'A data copilot that answers natural-language questions with relevant database values, clear summaries, and Highcharts visualizations that make insights accessible to non-technical users.',
    contributions: ['Built database retrieval and insight workflows with Python, LangChain, RAG, and LLMs', 'Developed the React and TypeScript frontend with Highcharts charts and graphs', 'Presented relevant values and short summaries in response to natural-language questions'],
    stack: ['React.js', 'TypeScript', 'Highcharts', 'Python', 'LangChain', 'RAG', 'LLMs'],
    color: '#d8cbbd',
  },
  {
    id: '04',
    title: 'Enterprise Management System',
    type: 'Internal project · Full-stack development',
    description: 'An internal enterprise management system combining a reusable React frontend, structured application state, and a Node.js backend.',
    contributions: ['Built reusable React UI components', 'Designed scalable frontend architecture and Redux Toolkit state management', 'Developed the backend with Node.js'],
    stack: ['React.js', 'Redux Toolkit', 'Node.js'],
    color: '#c6c1d8',
  },
]

export const skills = [
  { number: '01', title: 'Frontend', items: ['React.js', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { number: '02', title: 'State & Visualization', items: ['Redux Toolkit', 'TanStack Query', 'Highcharts'] },
  { number: '03', title: 'Backend & APIs', items: ['REST APIs', 'WebSocket', 'Python', 'Node.js', 'FastAPI', 'Axios'] },
  { number: '04', title: 'Data & Architecture', items: ['SQL', 'Component-Based Architecture', 'API Integration', 'Real-Time Data Streaming'] },
  { number: '05', title: 'Generative AI', items: ['LangChain', 'RAG', 'LLMs', 'AI Email Generation', 'AI Data Copilots'] },
  { number: '06', title: 'Tools', items: ['Git', 'GitHub', 'Chrome DevTools'] },
]

export const experience = [
  {
    period: 'Dec 2024 — Present',
    role: 'Full Stack Software Developer',
    company: 'WeBuildTech · Gurugram, Haryana',
    detail: 'Building and maintaining production web applications at WeBuildTech, with AI full-stack work across three client projects and an internal enterprise management system.',
    achievements: [
      'Engineered a React trading frontend with Redux Toolkit, live WebSocket updates, and REST API integration.',
      'Delivered React and TypeScript features, Python/FastAPI APIs, and AI-generated email drafts for an email automation platform.',
      'Built a Python, LangChain, and RAG data copilot with natural-language questions and Highcharts visualizations.',
      'Developed an internal management system with reusable React components, Redux Toolkit, and a Node.js backend.',
      'Optimized rendering and data flow, debugged production issues, and followed existing architecture and coding conventions.',
    ],
    tags: ['React.js', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'LangChain', 'RAG'],
  },
]

export const education = [
  { year: 'Aug 2021 — Jul 2023', mark: 'MCA', course: 'Master of Computer Applications', place: 'Babu Banarasi Das University', note: 'A formal foundation in computer applications and software development.' },
  { year: '2023 — 2024', mark: 'WEB', course: 'Full Stack Web Development Program', place: 'Masai', note: 'Intensive, project-based training in React.js, Redux Toolkit, JavaScript, Node.js, SQL, and REST API design.' },
]
