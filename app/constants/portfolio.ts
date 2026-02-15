
import { PortfolioData } from '../types/portfolio';

export const PORTFOLIO_DATA: PortfolioData = {
    name: "Ralph Dainiell Gonzaga",
    location: "Cavite, Philippines",
    profileImage: "/Images/profile.jpg",
    roles: ["Data Analyst", "Vlogger"],
    contact: {
        email: "gonzagaralphdainiell@gmail.com",
        phone: "+63 956 357 5817",
        university: "Lyceum of the Philippines University - Cavite",
    },
    socials: {
        facebook: "https://www.facebook.com/ralphdainiell.gonzaga31",
        instagram: "https://www.instagram.com/gonzagaralphh/",
        youtube: "https://www.youtube.com/@gonzagaralphh18",
        linkedin: "https://www.linkedin.com/in/ralph-dainiell",
    },
    bio: [
        "I am a versatile IT professional with expertise in database management, data analysis, and programming, including SQL, Python, and R. Continuously refining my technical skills, I transform complex data into actionable insights and efficient solutions. I approach every project with precision, ensuring accuracy, reliability, and measurable impact.",
        "In addition to my technical expertise, I bring creative skills in video editing using Adobe Premiere Pro and UI/UX design with Figma. By combining analytical thinking with creativity, I deliver visually engaging, user-centered digital experiences. Bridging technology and design allows me to provide innovative solutions that are both functional and aesthetically appealing.",
        "I also document my career journey as a YouTube content creator, sharing knowledge and experiences while exploring new trends in technology and digital media. Committed to continuous growth, I strive to expand both my technical and creative abilities. I welcome opportunities to collaborate, learn, and make meaningful contributions through my diverse skill set."
    ],
    skills: [
        { name: "MySQL", category: "Programming Language" },
        { name: "R", category: "Programming Language" },
        { name: "CSS", category: "Programming Language" },
        { name: "Python", category: "Programming Language" },
        { name: "HTML", category: "Programming Language" },
        { name: "Excel", category: "Analytics Software" },
        { name: "Power BI", category: "Analytics Software" },
        { name: "Tableau", category: "Analytics Software" },
        { name: "Adobe Premiere Pro", category: "Editing Software" },
        { name: "Adobe Photoshop", category: "Editing Software" },
        { name: "Figma", category: "Editing Software" },
        { name: "Final Cut Pro", category: "Editing Software" },
    ],
    experiences: [
        {
            id: "1",
            role: "Creative Director",
            company: "The Creative Team",
            duration: "Oct 2024 - Dec 2024",
            description: [
                "Planned and managed the creative and technical aspects of university events, from structuring event flow to operating cameras, lighting, and sound systems during live productions."
            ],
            logo: "/Images/experience/lpu.jpg"
        },
        {
            id: "2",
            role: "Audit Assistant",
            company: "Tagaytay Highlands",
            duration: "May 2024 - Aug 2024",
            description: [
                "Provided support to the internal audit team by examining financial records, validating transactions, and ensuring adherence to established policies and procedures. Assisted in inventory and cash audits, prepared audit documentation and reports, and contributed to the strengthening of internal control processes."
            ],
            logo: "/Images/experience/tagaytay highlands.png"
        },
        {
            id: "3",
            role: "Police Clerk",
            company: "Silang Cavite",
            duration: "Nov 2023 - Jan 2024",
            description: ["Delivered frontline administrative support for police clearance services by assisting citizens with registration and application processing. Managed payment collection, verified applicant information, and conducted biometric data capture. Ensured accurate record keeping, proper documentation, and efficient processing of police clearance requests in accordance with standard procedures."],
            logo: "/Images/experience/police.png"
        }
    ],
    certificates: [
        {
            id: "cert1",
            title: "Python Essentials 1",
            issuer: "Cisco Networking Academy",
            issueDate: "16 Dec 2024",
            imageUrl: "/Images/certificates/python 1.jpg"
        },
        {
            id: "cert2",
            title: "Python Essentials 2",
            issuer: "Cisco Networking Academy",
            issueDate: "22 Feb 2025",
            imageUrl: "/Images/certificates/python 2.jpg"
        },
        {
            id: "cert3",
            title: "Data Science Essentials with Python",
            issuer: "Cisco Networking Academy",
            issueDate: "15 Jan 2026",
            imageUrl: "/Images/certificates/Data Science.jpg"
        }
    ]
};
