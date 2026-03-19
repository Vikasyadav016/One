export type Template = {
  id: string
  name: string
  description: string
  level: 'Junior' | 'Mid' | 'Senior'
  role: 'Developer' | 'Designer' | 'Product' | 'Manager'
  price: 'Free' | 'Premium'
  features: string[]
  image: string
}

export type ResumeModel = {
  personal: {
    fullName: string
    title: string
    email: string
    phone: string
    location: string
    summary: string
  }
  education: Array<{ school: string; degree: string; from: string; to: string; description: string }>
  experience: Array<{ company: string; position: string; from: string; to: string; bullets: string[] }>
  skills: string[]
  projects: Array<{ name: string; description: string; link: string }>
}

export type User = { id: string; name: string; email: string }

export type Analysis = { score: number; insights: string[] }
