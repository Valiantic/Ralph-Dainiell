
export interface Skill {
    name: string;
    category: 'Programming Languages' | 'UI Development' |'App Architecture' | 'API & Networking' | 'Database Tools'  | 'Tools & Version Control' ;
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    duration: string;
    description: string[];
    logo?: string;
}

export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    issueDate: string;
    imageUrl: string;
}

export interface PortfolioData {
    name: string;
    location: string;
    profileImage?: string;
    roles: string[];
    contact: {
        email: string;
        phone: string;
        university: string;
    };
    socials: {
        facebook?: string;
        instagram?: string;
        youtube?: string;
        linkedin?: string;
    };
    bio: string[];
    skills: Skill[];
    experiences: Experience[];
    certificates: Certificate[];
    blogs?: BlogPost[]; 
}
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  url: string;
  blogs?: BlogPost[];
}