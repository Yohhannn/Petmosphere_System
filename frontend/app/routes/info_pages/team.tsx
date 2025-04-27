import React from 'react';
import Out_Header from "~/routes/components/out_header";
import ScrollToTopButton from "~/routes/utility/util_scroll_up";
import 'animate.css';

export function meta() {
    return [
        { title: "( ✦ ) PETMOSPHERE - TEAM" },
        { name: "description", content: "Who are behind PETMOSPHERE?" },
    ];
}

const Team = () => {
    const teamMembers = [
        {
            name: 'Abella, Raymund Zyron',
            role: 'Backend Developer',
            img: 'main_assets/team_profile/profile_abella.png',
            bio: 'Raymund plays a key role in implementing the system’s server-side logic, ensuring seamless and efficient backend functionality.',
        },
        {
            name: 'Dela Peña, Sam Alexies',
            role: 'Database',
            img: 'main_assets/team_profile/profile_delapena.png',
            bio: 'Sam manages the structure and performance of the PETMOSPHERE database, securing data integrity and efficient queries.',
        },
        {
            name: 'Delima, Claudin Jelou',
            role: 'Layout Manager',
            img: 'main_assets/team_profile/profile_delima.png',
            bio: 'Claudin handles the layout design, ensuring a beautiful and intuitive user interface for all PETMOSPHERE pages.',
        },
        {
            name: 'Lauglaug, Joehannes',
            role: 'Backend Developer',
            img: 'main_assets/team_profile/profile_lauglaug.png',
            bio: 'Joehannes contributes to the backend development, maintaining logic and functionality for a smooth user experience.',
        },
        {
            name: 'Lim, Phoebe Gaile',
            role: 'Tester/QA',
            img: 'main_assets/team_profile/profile_lim.png',
            bio: 'Phoebe ensures the platform is bug-free and user-ready, thoroughly testing features and optimizing performance.',
        },
        {
            name: 'Mahilom, John Paul',
            role: 'Frontend Developer',
            img: 'main_assets/team_profile/profile_mahilom.png',
            bio: 'John Paul develops the user-facing side of PETMOSPHERE, crafting responsive and engaging visuals.',
        },
        {
            name: 'Mangubat, Khezy Gwen',
            role: 'Project Manager',
            img: 'main_assets/team_profile/profile_mangubat.png',
            bio: 'Khezy oversees the whole PETMOSPHERE development process, aligning tasks and timelines to ensure project success.',
        },
        {
            name: 'Talingting, Edmark',
            role: 'Back-end - Security',
            img: 'main_assets/team_profile/profile_talingting.png',
            bio: 'Edmark focuses on securing backend systems, implementing safety protocols and managing server-side vulnerabilities.',
        },
    ];

    return (
        <>
            {/* Sticky Header */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeIn">
                <Out_Header />
            </div>
            <ScrollToTopButton />
            <div className="bg-[#F4F2F2] mt-20 min-h-screen animate__animated animate__fadeIn">
                <div
                    className="bg-[#8E57B2] text-white py-24 text-center bg-cover bg-center"
                    style={{ backgroundImage: "url('main_assets/team_profile/team_banner.png')" }}
                >
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl font-bold mb-4 animate_animated animate__bounceIn">About Our Team</h1>
                        <p className="text-lg max-w-2xl mx-auto">
                            We are the PETMOSPHERE team, passionate about promoting pet adoption and innovation through technology and teamwork.
                        </p>
                    </div>
                </div>

                <div className="max-w-8xl mx-auto 2xl:max-w-7xl bg-white shadow-lg rounded-lg p-6">
                    <section className="py-12 bg-white">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="text-3xl font-bold mb-6 text-[#8E57B2] animate__animated animate__fadeInDown">Meet the Team</h2>
                            <p className="text-gray-600 max-w-3xl mx-auto mb-10 animate__animated animate__fadeInDown">
                                The dedicated team behind PETMOSPHERE: developers, designers, analysts, and leaders working together to create change.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {teamMembers.map((member, index) => (
                                    <div
                                        key={index}
                                        className="card bg-white shadow-md border border-[#8E57B2]/20 rounded-xl p-6 transform transition-transform hover:scale-105 animate__animated animate__delay-1s animate__bounceIn"
                                    >
                                        <img
                                            src={member.img}
                                            alt={member.name}
                                            className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-[#F69332]"
                                        />
                                        <h3 className="text-lg font-bold text-[#8E57B2]">{member.name}</h3>
                                        <p className="text-[#F69332] font-semibold mb-2">{member.role}</p>
                                        <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="bg-[#8E57B2] py-10 px-6 animate__animated animate__fadeIn">
                        <div className="container mx-auto flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="md:w-1/2">
                                {/* Default for lg and above */}
                                <img
                                    src="/main_assets/images/image_ctu_admin.png"
                                    alt="School"
                                    className="hidden md:block w-full h-auto object-cover"
                                />

                                {/* For sm and md screens */}
                                <img
                                    src="/main_assets/images/image_ctu.png"
                                    alt="School"
                                    className="block md:hidden w-full h-auto object-cover"
                                />
                            </div>

                            <div className="md:w-1/2 p-6 md:p-10">
                                <div className="flex items-center mb-4">
                                    <img
                                        src="/main_assets/logo/logo_ctu.png"
                                        alt="School Logo"
                                        className="w-16 h-16 object-contain mr-4"
                                    />
                                    <h2 className="text-2xl font-bold text-[#8E57B2]">
                                        CEBU TECHNOLOGICAL UNIVERSITY - <i>MAIN</i>
                                    </h2>
                                </div>
                                <p className="text-gray-700 text-md leading-relaxed">
                                    CTU-Main is a premier institution dedicated to fostering innovation, creativity, and excellence. Our students are inspired to apply their skills to bring digital solutions to life.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <footer className="bg-[#8E57B2] py-6 text-white text-center">
                    <p>&copy; 2024 PETMOSPHERE Team. All Rights Reserved.</p>
                </footer>
            </div>

        </>

    );
};

export default Team;
