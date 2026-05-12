import { PortfolioData } from '../types/portfolio';

export const PORTFOLIO_DATA: PortfolioData = {
    name: "Ralph Dainiell Gonzaga",
    location: "Cavite, Philippines",
    profileImage: "/Images/profile.jpg",
    roles: ["iOS Developer"],
    contact: {
        email: "gonzagaralphdainiell@gmail.com",
        phone: "+63 945 289 3949",
        university: "Lyceum of the Philippines University - Cavite",
    },
    socials: {
        facebook: "https://www.facebook.com/ralphdainiell.gonzaga31",
        instagram: "https://www.instagram.com/gonzagaralphh/",
        youtube: "https://www.youtube.com/@gonzagaralphh18",
        linkedin: "https://www.linkedin.com/in/ralph-dainiell",
    },
    bio: [
    "I am a 20 year old IT student majoring in Web and Mobile Development, currently focused on building my path toward becoming an iOS Developer. My goal is to create clean, practical, and user-centered mobile applications while continuously strengthening my skills in Swift, SwiftUI, and modern iOS development.",

    "Before focusing on iOS development, I gained junior level experience in data analytics related work, including SQL, data organization, accuracy checking, pattern recognition, and basic data interpretation. This background helped me develop stronger attention to detail, logical thinking, and a more structured approach to solving problems.",

    "My interest in technology started with curiosity about how apps and digital products work, and it has grown into a career path I am serious about pursuing. I continue to learn through hands-on projects, improve through practice, and document my growth through YouTube videos as part of my journey in tech."
],
    skills: [
    { name: "Swift", category: "Programming Languages" },
    { name: "Python", category: "Programming Languages" },

    { name: "SwiftUI", category: "UI Development" },
    { name: "UIKit", category: "UI Development" },
    { name: "Auto Layout", category: "UI Development" },
    { name: "View Controllers", category: "UI Development" },
    { name: "Navigation & Flow", category: "UI Development" },

    { name: "MVVM", category: "App Architecture" },
    { name: "MVC", category: "App Architecture" },
    { name: "State Management", category: "App Architecture" },
    { name: "Memory Management (ARC)", category: "App Architecture" },
    { name: "App Lifecycle", category: "App Architecture" },


    { name: "REST API", category: "Networking" },
    { name: "JSON Parsing", category: "Networking" },


    { name: "Git & GitHub", category: "Dev Tools" },
    { name: "Xcode", category: "Dev Tools" },
    { name: "VS Code", category: "Dev Tools" },

    { name: "MySQL", category: "Database" },
    { name: "Supabase", category: "Database" },
   
    { name: "Figma", category: "Design Tools" },
    { name: "DetailsPro", category: "Design Tools" },
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
            title: "Introduction to Git",
            issuer: "DataCamp",
            issueDate: "May 5 2026",
            imageUrl: "/Images/certificates/Git.jpg"
        },
        {
            id: "cert1",
            title: "Associate Data Analyst",
            issuer: "DataCamp",
            issueDate: "April 11 2026",
            imageUrl: "/Images/certificates/associate-data-analyst-datacamp.jpg"
        },
        {
            id: "cert2",
            title: "SQL (Intermediate)",
            issuer: "HackerRank",
            issueDate: "March 29 2026",
            imageUrl: "/Images/certificates/sql-intermediate.jpg"
        },
        {
            id: "cert3",
            title: "Introduction to SQL",
            issuer: "DataCamp",
            issueDate: "March 25 2026",
            imageUrl: "/Images/certificates/sql-intro-datacamp.png"
        },
        {
            id: "cert4",
            title: "Data Science Essentials with Python",
            issuer: "Cisco Networking Academy",
            issueDate: "January 15 2026",
            imageUrl: "/Images/certificates/Data Science.jpg"
        },
        {
            id: "cert5",
            title: "Python Essentials 2",
            issuer: "Cisco Networking Academy",
            issueDate: "February 22 2025",
            imageUrl: "/Images/certificates/python 2.jpg"
        },
        {
            id: "cert6",
            title: "Python Essentials 1",
            issuer: "Cisco Networking Academy",
            issueDate: "December 16 2024",
            imageUrl: "/Images/certificates/python 1.jpg"
        }
    ]
};