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
        "I am an aspiring IT professional currently building my foundation in software development, with a growing focus on iOS application development. I continuously refine my technical skills in Swift and modern iOS technologies to create efficient, user-centered applications. I approach every learning opportunity with discipline, aiming for accuracy, reliability, and continuous improvement.",
        
        "I am deeply committed to becoming a professional iOS app developer, and I actively prepare for real-world challenges through consistent practice, exploration, and hands-on experience. My curiosity about how applications impact user experience and solve real problems drives me to keep improving and expanding my expertise in this field.",
        
        "Beyond my technical development, I bring creative skills in video editing and content creation. By combining technical understanding with creativity, I produce engaging digital content that communicates ideas clearly, effectively, and with impact.",

        "I also document my journey as an IT student and aspiring iOS developer through content creation, where I share insights, experiences, and lessons learned along the way. Committed to continuous growth, I am always seeking opportunities to learn, collaborate, and contribute meaningfully through both my technical and creative skill set."
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


    { name: "Xcode", category: "Tools & DevOps" },
    { name: "Git & GitHub", category: "Tools & DevOps" },
    { name: "Debugging", category: "Tools & DevOps" },
    { name: "Data Handling", category: "Tools & DevOps" },

    { name: "MySQL", category: "Database" },
    { name: "SQLlite", category: "Database" },


    { name: "Figma", category: "Design" },
    { name: "DetailsPro", category: "Design" },
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