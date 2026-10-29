// All portfolio content lives here. Edit this file to update the site.
export const TBA = 'To be added later'

export const profile = {
  name: 'MD Afridy Hossain Arman',
  headline: 'Technology Sales Professional | Web Development Enthusiast',
  intro:
    "I’m a technology-focused professional with experience in Tech Sales and a background in Computer Science and Engineering. I have an interest in web development and design, and I continue to develop my technical skills while growing professionally.",
  // Leave empty ('') until you have them. Empty values are shown as placeholders / hidden.
  email: '',
  github: '', // e.g. https://github.com/username
  linkedin: '', // e.g. https://www.linkedin.com/in/username
  photo: '', // e.g. '/profile.jpg' (put the file inside /public)
  whatsapp: '+8801986456613', // country code + number, no + or spaces. e.g. 8801XXXXXXXXX
}

export function whatsappLink(): string {
  const n = profile.whatsapp.replace(/\D/g, '')
  return n ? 'https://wa.me/' + n + '?text=' + encodeURIComponent('Hello Arman, I found your portfolio and would like to talk.') : ''
}

export const about = [
  'I work in technology sales, where I communicate with customers and connect them with the right technology.',
  'My technical foundation comes from a Diploma in Engineering in Computer Science and Technology, along with training in Computer Office Application and a Web Development and Design Internship.',
  'I keep learning HTML, CSS, Java and React, and I’m working towards building and showcasing my own web projects.',
]

export const skills = {
  current: ['HTML', 'CSS', 'Java', 'React'],
  training: ['Computer Office Application', 'Web Development and Design Internship'],
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  focus?: string
  details: string
  current?: boolean
}

export const experience: ExperienceItem[] = [
  {
    role: 'Sales Executive — Tech Sales',
    company: 'SM Technology',
    period: 'October 2025 – Present',
    focus: 'Technology Sales and Customer Communication',
    details: 'Specific responsibilities, products and achievements: ' + TBA,
    current: true,
  },
  {
    role: 'Job title to be confirmed',
    company: 'Abul Khair Tobacco',
    period: '2024',
    details: 'Responsibilities: ' + TBA,
  },
]

export interface EducationItem {
  title: string
  institution?: string
  subjectLabel: string
  subject: string
  year?: string
  resultLabel: string
  result: string
}

// Dates and results are kept exactly as supplied.
export const education: EducationItem[] = [
  { title: 'Diploma in Engineering', institution: 'Kushtia Polytechnic Institute', subjectLabel: 'Department', subject: 'Computer Science and Engineering (CSE)', year: '2023', resultLabel: 'CGPA', result: '3.59' },
  { title: 'Secondary School Certificate (SSC)', institution: 'Barokhada Secondary School', subjectLabel: 'Group', subject: 'Science', year: '2029', resultLabel: 'GPA', result: '4.00' },
  { title: 'English Proficiency', subjectLabel: 'Skill', subject: 'English language', resultLabel: 'Level', result: 'B2' },
]

export const training = {
  office: { title: 'Computer Office Application', category: 'Computer Training / Office Applications' },
  internship: {
    title: 'Web Development and Design Internship',
    field: 'Web Development and Design',
    organization: TBA,
    duration: TBA,
    responsibilities: TBA,
    certificate: TBA,
  },
}

export interface Project {
  title: string
  description: string
  tech: string[]
  image?: string
  demo?: string
  repo?: string
}

// Add projects here. Example:
// { title: 'My App', description: '...', tech: ['React'], demo: 'https://...', repo: 'https://github.com/...' }
export const projects: Project[] = []

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'training', label: 'Training' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
