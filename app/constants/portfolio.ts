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
        "I am a versatile IT professional with a strong foundation in database management and data analysis. I continuously refine my technical skills to transform complex data into actionable insights and efficient solutions. I approach every project with precision, ensuring accuracy, reliability, and measurable impact.",
        "I am deeply passionate about pursuing a career as a Data Analyst, and I am actively preparing myself for real-world challenges by continuously learning, exploring, and building practical experience. My curiosity about data and its potential to drive decision-making motivates me to keep improving and expanding my expertise in this field.",
        "Beyond my technical abilities, I bring creative skills in video editing. By combining analytical thinking with creativity, I create engaging digital content that communicates ideas clearly and effectively.",
        "I also document my journey as an IT student and aspiring Data Analyst through content creation, where I share insights, experiences, and lessons learned along the way. Committed to continuous growth, I am always looking for opportunities to learn, collaborate, and contribute meaningfully through my skill set."
    ],
    skills: [
        { name: "MySQL", category: "Programming Language" },
        { name: "Python", category: "Programming Language" },
        { name: "HTML", category: "Programming Language" },
        { name: "CSS", category: "Programming Language" },
        { name: "Excel", category: "Analytics Software" },
        { name: "Power BI", category: "Analytics Software" },
        { name: "Google BigQuery", category: "Cloud Data" },
        { name: "Adobe Premiere Pro", category: "Editing Software" },
        { name: "Final Cut Pro", category: "Editing Software" },
        { name: "Figma", category: "Editing Software" },
        
        
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