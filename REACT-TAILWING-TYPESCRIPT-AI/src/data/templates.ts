import type { ResumeModel, Template } from '../types'

export const templates: Template[] = [
  {
    id: 'modern-freelancer',
    name: 'Modern Freelancer',
    description: 'Minimal, clean resume with strong emphasis on skills and projects.',
    level: 'Mid',
    role: 'Designer',
    price: 'Free',
    features: ['Clean typography', 'Section highlights', '2-column skill grid'],
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'dev-professional',
    name: 'Dev Professional',
    description: 'Modern dev-friendly template with project and experience focus.',
    level: 'Senior',
    role: 'Developer',
    price: 'Premium',
    features: ['Coding skills bars', 'ATS-friendly layout', 'Download-ready'],
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'product-lead',
    name: 'Product Lead',
    description: 'Professional layout for product managers and leaders.',
    level: 'Senior',
    role: 'Product',
    price: 'Premium',
    features: ['Leadership section', 'Metric callouts', 'Compact profile'],
    image:
      'https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'junior-start',
    name: 'Junior Start',
    description: 'Simple starter resume for entry-level roles.',
    level: 'Junior',
    role: 'Developer',
    price: 'Free',
    features: ['Easy edit', 'Basic template', 'ATS optimized'],
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
  }
]

export const blankResume: ResumeModel = {
  personal: {
    fullName: 'Your Name',
    title: 'Software Engineer',
    email: 'you@example.com',
    phone: '+1234567890',
    location: 'City, Country',
    summary: 'A polished resume summary goes here.'
  },
  education: [
    {
      school: 'University Name',
      degree: 'BSc in Computer Science',
      from: '2018',
      to: '2022',
      description: 'Academic achievements and honors.'
    }
  ],
  experience: [
    {
      company: 'Company Inc.',
      position: 'Frontend Developer',
      from: '2023',
      to: 'Present',
      bullets: ['Built responsive UI modules', 'Reduced load time by 30%']
    }
  ],
  skills: ['React', 'TypeScript', 'Tailwind', 'API Design'],
  projects: [
    {
      name: 'Resume Maker',
      description: 'Interactive builder and analyzer for career assets.',
      link: 'https://example.com'
    }
  ]
}
