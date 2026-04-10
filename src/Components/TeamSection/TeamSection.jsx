import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../UseAxiosPublic/useAxiosPublic';

const TeamSection = () => {
    const AxiosPublic = useAxiosPublic();
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        AxiosPublic.get('/trainer?limit=6')
            .then((res) => setTrainers(res.data))
            .catch((error) => console.error('Error fetching trainers:', error));
    }, []);

    return (
        <section className="py-20 px-6 w-full" style={{ background: '#f9f6f1' }}>

            {/* Header */}
            <div className="text-center mb-14">
                <span
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest text-[#b37800] mb-4"
                    style={{ background: 'rgba(255,183,50,0.12)', border: '1px solid rgba(255,183,50,0.35)' }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB732]" />
                    Our Experts
                </span>

                <h2
                    className="text-4xl font-bold text-[#1a1a2e] mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Meet Our{' '}
                    <span className="text-[#FFB732] italic">Trainers</span>
                </h2>

                <p className="text-[15px] font-light text-[#7a8394] max-w-md mx-auto leading-relaxed mb-4">
                    World-class professionals dedicated to helping you reach your peak performance and fitness goals.
                </p>

                <div className="w-14 h-[3px] bg-[#FFB732] rounded-full mx-auto" />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {trainers.map((trainer) => (
                    <div
                        key={trainer._id}
                        className="bg-white rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                        style={{ border: '0.5px solid #ece8e0' }}
                    >
                        {/* Card Top — Dark */}
                        <div className="bg-[#1a1a2e] px-6 pt-8 pb-5 text-center relative">
                            {/* Gold top bar */}
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FFB732]" />

                            {/* Avatar */}
                            <div
                                className="w-24 h-24 rounded-full mx-auto mb-4 p-[3px]"
                                style={{ border: '3px solid #FFB732' }}
                            >
                                <img
                                    src={trainer.profileImage}
                                    alt={trainer.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>

                            {/* Name */}
                            <h3
                                className="text-lg font-bold text-[#f5f0e8] mb-2"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {trainer.name}
                            </h3>

                            {/* Experience badge */}
                            <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-[#FFB732]"
                                style={{
                                    background: 'rgba(255,183,50,0.15)',
                                    border: '0.5px solid rgba(255,183,50,0.3)',
                                }}
                            >
                                ⚡ {trainer.experience} Years Experience
                            </span>
                        </div>

                        {/* Card Body */}
                        <div className="px-5 py-5">
                            {/* Expertise */}
                            <p className="text-[10px] font-medium text-[#b0b8c8] uppercase tracking-widest mb-2">
                                Expertise
                            </p>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {trainer.expertise.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-2.5 py-1 rounded-md text-[11.5px] font-medium text-[#b37800]"
                                        style={{
                                            background: 'rgba(255,183,50,0.08)',
                                            border: '0.5px solid rgba(255,183,50,0.25)',
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Details */}
                            <p
                                className="text-[13px] text-[#7a8394] leading-relaxed mb-4 pt-4"
                                style={{ borderTop: '0.5px solid #ece8e0' }}
                            >
                                {trainer.details}
                            </p>

                            {/* Button */}
                            {/* <button
                                className="w-full py-2.5 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 bg-[#1a1a2e] text-[#FFB732] hover:bg-[#FFB732] hover:text-[#1a1000]"
                            >
                                View Profile →
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TeamSection;