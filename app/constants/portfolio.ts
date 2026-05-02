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
    "I am an aspiring iOS App Developer with a strong interest in building clean, reliable, and user-focused mobile applications. My current career direction is focused on Swift, SwiftUI, and modern iOS development practices.",

    "Alongside my transition into iOS development, I have junior-level experience performing data analyst-related tasks, including organizing data, identifying patterns, interpreting information, and supporting data-driven work.",

    "This background has strengthened my attention to detail, analytical thinking, and accuracy qualities that I apply to writing structured code, solving development challenges, and improving user-centered solutions.",

    "My goal is to contribute to a professional team where I can apply my technical foundation, analytical background, and creative mindset while continuously growing into an industry-ready mobile app developer."
],
    skills: [
    { name: "Swift", category: "Programming Language" },
    { name: "SwiftUI", category: "Programming Language" },
    { name: "Python", category: "Programming Language" },
    { name: "HTML5", category: "Programming Language" },
    { name: "CSS", category: "Programming Language" },

  
    { name: "UIKit", category: "UI Development" },
    { name: "Auto Layout", category: "UI Development" },
    { name: "View Controllers", category: "UI Development" },
    { name: "Navigation & Flow", category: "UI Development" },

    { name: "MVVM", category: "Architecture" },
    { name: "MVC", category: "Architecture" },
    { name: "State Management", category: "Architecture" },
    { name: "Memory Management (ARC)", category: "Architecture" },


    { name: "REST API", category: "Networking" },
    { name: "JSON Parsing", category: "Networking" },
    { name: "App Lifecycle", category: "Networking" },
    { name: "Error Handling", category: "Networking" },


    { name: "Git & Github", category: "Tools & DevOps" },
    { name: "Data Handling", category: "Tools & DevOps" },

    { name: "MySQL", category: "Database Tools" },
    { name: "SQLlite", category: "Database Tools" },


    { name: "Figma", category: "Design Tools" },
    { name: "DetailsPro", category: "Design Tools" },
],
    experiences: [
        {
            id: "1",
            role: "Audit Assistant",
            company: "Tagaytay Highlands",
            duration: "May 2023 - Aug 2024",
            description: [
                "Provided support to the internal audit team by examining financial records, validating transactions, and ensuring adherence to established policies and procedures. Assisted in inventory and cash audits, prepared audit documentation and reports, and contributed to the strengthening of internal control processes."
            ],
            logo: "/Images/experience/tagaytay highlands.png"
        },
        {
            id: "2",
            role: "Police Clerk",
            company: "NPC Silang Cavite",
            duration: "Nov 2022 - Jan 2023",
            description: ["Delivered frontline administrative support for police clearance services by assisting citizens with registration and application processing. Managed payment collection, verified applicant information, and conducted biometric data capture. Ensured accurate record keeping, proper documentation, and efficient processing of police clearance requests in accordance with standard procedures."],
            logo: "/Images/experience/police.png"
        },
    ],
    certificates: [
        {
            id: "cert0",
            title: "Associate Data Analyst",
            issuer: "DataCamp",
            issueDate: "April 11 2026",
            imageUrl: "/Images/certificates/associate-data-analyst-datacamp.jpg"
        },
        {
            id: "cert1",
            title: "SQL (Intermediate)",
            issuer: "HackerRank",
            issueDate: "March 29 2026",
            imageUrl: "/Images/certificates/sql-intermediate.jpg"
        },
        {
            id: "cert2",
            title: "Introduction to SQL",
            issuer: "DataCamp",
            issueDate: "March 25 2026",
            imageUrl: "/Images/certificates/sql-intro-datacamp.png"
        },
        {
            id: "cert3",
            title: "Data Science Essentials with Python",
            issuer: "Cisco Networking Academy",
            issueDate: "January 15 2026",
            imageUrl: "/Images/certificates/Data Science.jpg"
        },
        {
            id: "cert4",
            title: "Python Essentials 2",
            issuer: "Cisco Networking Academy",
            issueDate: "February 22 2025",
            imageUrl: "/Images/certificates/python 2.jpg"
        },
        {
            id: "cert5",
            title: "Python Essentials 1",
            issuer: "Cisco Networking Academy",
            issueDate: "December 16 2024",
            imageUrl: "/Images/certificates/python 1.jpg"
        }
    ]
};