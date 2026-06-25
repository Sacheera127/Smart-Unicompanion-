import React from "react";

const TEAM_MEMBERS = [
    {
        id: 1,
        name: "Madhawa Aravinda",
        role: "Fullstack Developer",
        description: "Core system developer",
        image: "/madhawa_aravinda.jpeg",
    },
    {
        id: 2,
        name: "Sacheera Nimesh",
        role: "Backend Developer",
        description: "Backend support",
        image: "/sacheera_nimesh.jpeg",
    },
    {
        id: 3,
        name: "Chamath Jayasekara",
        role: "Backend Developer",
        description: "API development",
        image: "/chamath_jayasekara.jpeg",
    },
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