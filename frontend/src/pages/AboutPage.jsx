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
    const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
    const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans selection:bg-primary-500 selection:text-white">
            <PublicNavbar transparentOnTop={false} />

            {/* ── What is this / About Section ─────────────────────────────────────── */}
            <section id="about" className="pt-32 pb-24 bg-white dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-16 items-center"
                    >
                        <motion.div variants={fadeInUp}>
                            <h1 className="text-5xl font-black mb-6 tracking-tight">What is our goal?</h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                Finding a good boarding place, knowing the best local food spots, and figuring out the quickest bus routes shouldn't be a hassle.
                            </p>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Unify centralizes this information. We empower senior students to act as Campus Admins, verifying and maintaining a pristine directory of resources specific to their university, ensuring new students have a seamless transition into campus life.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <BuildingIcon size={32} className="text-primary-500 mb-4" />
                                    <div className="text-3xl font-black mb-1">31+</div>
                                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Universities</div>
                                </div>
                                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <MapPinIcon size={32} className="text-indigo-500 mb-4" />
                                    <div className="text-3xl font-black mb-1">1000+</div>
                                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Local Listings</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="relative">
                            <div className="aspect-square rounded-3xl border border-white/50 dark:border-slate-700 shadow-2xl flex items-center justify-center relative overflow-hidden group">
                                <img src="/campus_students.png" alt="University Students" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

                                <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute top-8 right-8 p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
                                    <ShieldCheckIcon size={28} className="text-green-500" />
                                </motion.div>
                                <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }} className="absolute bottom-8 left-8 p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
                                    <BuildingIcon size={28} className="text-indigo-500" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

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