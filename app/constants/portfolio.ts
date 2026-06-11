import { PortfolioData } from '../types/portfolio';

export const PORTFOLIO_DATA: PortfolioData = {
    name: "Ralph Dainiell Gonzaga",
    location: "Cavite, Philippines",
    profileImage: "/Images/profile.jpg",
    roles: ["iOS Developer \ DevOps"],
    contact: {
        email: "gonzagaralphdainiell@gmail.com",
        phone: "+63 945 289 3949",
        university: "Lyceum of the Philippines University - Cavite",
    },
    socials: {
        instagram: "https://www.instagram.com/gonzagaralphh/",
        youtube: "https://www.youtube.com/@gonzagaralphh18",
        linkedin: "https://www.linkedin.com/in/ralph-dainiell",
    },
    bio: [
    "I am a 20 year old IT student majoring in Web and Mobile Development, currently focused on building my path toward becoming an iOS Developer. My goal is to create clean, practical, and user-centered mobile applications while continuously strengthening my skills in Swift, SwiftUI, and modern iOS development.",

    "My interest in technology has grown from curiosity about how apps and digital products work into a career path I am committed to, built through hands-on projects, consistent practice, and documenting my journey on YouTube. I also bring junior-level experience in data analytics including SQL, data organization, and pattern recognition which developed my attention to detail and a structured approach to problem-solving.",
],
    skills: [
    { name: "Swift", category: "Programming Languages" },
    { name: "Python", category: "Programming Languages" },

    { name: "SwiftUI", category: "UI Development" },
    { name: "UIKit", category: "UI Development" },

    { name: "MVVM", category: "App Architecture" },
    { name: "MVC", category: "App Architecture" },
    { name: "State Management", category: "App Architecture" },
    { name: "Memory Management (ARC)", category: "App Architecture" },
    { name: "App Lifecycle", category: "App Architecture" },


    { name: "REST API", category: "Networking" },
    { name: "JSON Parsing", category: "Networking" },
    
    { name: "Swift Data", category: "Database" },
    { name: "Tableplus", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "Supabase", category: "Database" },
    { name: "Firebase", category: "Database" },
    { name: "Realm", category: "Database" },
    { name: "SQLite", category: "Database" },

    { name: "Git", category: "Tools & Version Control" },
    { name: "GitHub", category: "Tools & Version Control" },
    { name: "Xcode", category: "Tools & Version Control" },
    { name: "VS Code", category: "Tools & Version Control" },
    { name: "Figma", category: "Tools & Version Control" },
    { name: "DetailsPro", category: "Tools & Version Control" },
],
    experiences: [
        {
            id: "1",
            role: "Audit Assistant",
            company: "Tagaytay Highlands",
            duration: "2024",
            description: [
                "Provided support to the internal audit team by examining financial records, validating transactions, and ensuring adherence to established policies and procedures. Assisted in inventory and cash audits, prepared audit documentation and reports, and contributed to the strengthening of internal control processes."
            ],
            logo: "/Images/experience/tagaytay highlands.png"
        },
        {
            id: "2",
            role: "Police Clerk",
            company: "NPC Silang Cavite",
            duration: "2023",
            description: ["Delivered frontline administrative support for police clearance services by assisting citizens with registration and application processing. Managed payment collection, verified applicant information, and conducted biometric data capture. Ensured accurate record keeping, proper documentation, and efficient processing of police clearance requests in accordance with standard procedures."],
            logo: "/Images/experience/police.png"
        },
    ],
    certificates: [
        {
            id: "cert0",
            title: "Github Foundations",
            issuer: "DataCamp",
            issueDate: "May 5 2026",
            imageUrl: "/Images/certificates/GithubFoundations.jpg"
        },
        {
            id: "cert1",
            title: "Intermediate to Git",
            issuer: "DataCamp",
            issueDate: "May 5 2026",
            imageUrl: "/Images/certificates/intermediateGIT.png"
        },
        {
            id: "cert2",
            title: "Introduction to Git",
            issuer: "DataCamp",
            issueDate: "May 5 2026",
            imageUrl: "/Images/certificates/git.png"
        },
        {
            id: "cert3",
            title: "Associate Data Analyst",
            issuer: "DataCamp",
            issueDate: "April 11 2026",
            imageUrl: "/Images/certificates/associate-data-analyst-datacamp.jpg"
        },
        {
            id: "cert4",
            title: "SQL (Intermediate)",
            issuer: "HackerRank",
            issueDate: "March 29 2026",
            imageUrl: "/Images/certificates/sql-intermediate.jpg"
        },
        {
            id: "cert5",
            title: "Introduction to SQL",
            issuer: "DataCamp",
            issueDate: "March 25 2026",
            imageUrl: "/Images/certificates/sql-intro-datacamp.png"
        },
        {
            id: "cert6",
            title: "Data Science with Python",
            issuer: "Cisco Networking Academy",
            issueDate: "January 15 2026",
            imageUrl: "/Images/certificates/Data Science.jpg"
        },
        {
            id: "cert7",
            title: "Python Essentials 2",
            issuer: "Cisco Networking Academy",
            issueDate: "February 22 2025",
            imageUrl: "/Images/certificates/python 2.jpg"
        },
        {
            id: "cert8",
            title: "Python Essentials 1",
            issuer: "Cisco Networking Academy",
            issueDate: "December 16 2024",
            imageUrl: "/Images/certificates/python 1.jpg"
        }
    ]
};