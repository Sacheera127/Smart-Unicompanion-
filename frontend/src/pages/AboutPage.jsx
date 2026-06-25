import React from "react";
import { motion } from "framer-motion";
import PublicNavbar from "../components/PublicNavbar";
import {
    BuildingIcon,
    MapPinIcon,
    ShieldCheckIcon,
    GithubIcon,
    LinkedinIcon,
    InstagramIcon,
    MailIcon
} from "../components/Icons";

const TEAM_MEMBERS = [
    {
        id: 1,
        name: "Madhawa Aravinda",
        role: "Creator, Lead Developer & Fullstack Dev",
        description: "The visionary who conceptualized the idea and played a major role in developing the core system.",
        image: "/madhawa_aravinda.jpeg",
        github: "https://github.com/madhawaaravinda05-dotco/",
        linkedin: "https://www.linkedin.com/in/madhawa-aravinda-ab4bb8319/",
        instagram: "https://www.instagram.com/aravinda_molagoda/",
        email: "mailto:madhawaaravinda05@gmail.com"
    },
    {
        id: 2,
        name: "Sacheera Nimesh",
        role: "Lead Backend Developer",
        description: "A skilled backend developer who played a crucial role in guiding the team to success.",
        image: "/sacheera_nimesh.jpeg",
        github: "https://github.com/Sacheera127",
        linkedin: "https://www.linkedin.com/in/sacheera-nimesh-38a5b638b/",
        instagram: "https://www.instagram.com/sacheera_nimesh/",
        email: "mailto:sacheeranimesh0513@gmail.com"
    },
    {
        id: 3,
        name: "Chamath Jayasekara",
        role: "Backend Developer",
        description: "A talented backend developer dedicated to building robust and scalable systems.",
        image: "/chamath_jayasekara.jpeg",
        github: "https://github.com/chamathjayasekara/",
        linkedin: "https://www.linkedin.com/in/chamath-jayasekara-a5241a324/",
        instagram: "https://www.instagram.com/chamath_frenzzy/",
        email: "mailto:chamathgayanasara2002@gmail.com"
    },
    {
        id: 4,
        name: "Yohan Wimalasooriya",
        role: "Backend Developer",
        description: "A passionate backend developer ensuring smooth operations behind the scenes.",
        image: "/Yohan.jpeg",
        github: "https://github.com/YohanWimalasooriya/",
        linkedin: "https://www.linkedin.com/in/yohan-wimalasooriya-692690390?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagram: "https://www.instagram.com/_primeyohan?igsh=bjVhc3pkODRxd2w5%2F",
        email: "mailto:yohanwimalasooriya0001@gmail.com"
    },
    {
        id: 5,
        name: "Vikum Madhushanka",
        role: "Backend Developer",
        description: "A focused backend developer specializing in system logic and architecture.",
        image: "/Vikum.jpeg",
        github: "https://github.com/Vikum-Madhushanka",
        linkedin: "#",
        instagram: "#",
        email: "mailto:vikumworkml@gmail.com"
    },
    {
        id: 6,
        name: "Vihangi Pabasara",
        role: "Frontend Team Leader",
        description: "A brilliant frontend developer who leads the team in creating engaging user interfaces.",
        image: "/vihagi.jpeg",
        github: "https://github.com/vpb03",
        linkedin: "https://www.linkedin.com/in/vihangipabasara?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
        instagram: "https://www.instagram.com/vihangi_pabasara?igsh=aGFja2c2NWtienYw&utm_source=qr",
        email: "mailto:vpbrahmana@students.nsbm.ac.lk"
    },
    {
        id: 7,
        name: "Mandira Kalupahana",
        role: "Frontend Developer",
        description: "A creative frontend developer focused on crafting beautiful user experiences.",
        image: "/mandira.png",
        github: "https://github.com/magawani",
        linkedin: "https://www.linkedin.com/in/mandira-kalupahana-a8aa45353?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        instagram: "https://www.instagram.com/ag_avani?igsh=MWJtMHN1NHgxZ3h6ZQ==",
        email: "#"
    },
    {
        id: 8,
        name: "Shamila Sewmini",
        role: "Frontend Developer",
        description: "A talented frontend developer passionate about building interactive and user-friendly interfaces.",
        image: "/shamil.jpeg",
        github: "https://github.com/ShamilaS2",
        linkedin: "https://www.linkedin.com/in/shamila-sewmini-3a868632a",
        instagram: "#",
        email: "mailto:shamilasewmini2004@gmail.com"
    },
    {
        id: 9,
        name: "Sachira Kavindu",
        role: "Frontend Developer",
        description: "A skilled frontend developer who brings ideas to life with clean, modern code.",
        image: "/sachirakavindu.jpeg",
        github: "https://github.com/SachiraK7",
        linkedin: "https://www.linkedin.com/in/sachira-kavindu-169a17387",
        instagram: "https://www.instagram.com/sachirakavindu/",
        email: "mailto:sachirakavindu7@gmail.com"
    }
];

export default function AboutPage() {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>

            {/* About Section */}
            <section>
                <h1>About Us</h1>
                <p>
                    We help students find boarding places, food spots, and transport
                    information easily.
                </p>
            </section>

            <hr />

            {/* Team Section */}
            <section>
                <h2>Team Members</h2>

                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    {TEAM_MEMBERS.map((member) => (
                        <div
                            key={member.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "15px",
                                width: "200px",
                                borderRadius: "10px",
                                textAlign: "center",
                            }}
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                }}
                            />
                            <h3>{member.name}</h3>
                            <p>{member.role}</p>
                            <small>{member.description}</small>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}