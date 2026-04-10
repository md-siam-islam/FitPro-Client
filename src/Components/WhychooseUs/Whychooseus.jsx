import React from 'react';
import { FaUserShield, FaChalkboardTeacher, FaHeartbeat, FaDumbbell } from 'react-icons/fa';

const WhyChooseUs = () => {
    const features = [
        {
            id: 1,
            icon: <FaDumbbell className="text-4xl" />,
            title: "Modern Equipment",
            description: "We provide high-quality fitness machines and tools to ensure your workout is safe and effective."
        },
        {
            id: 2,
            icon: <FaChalkboardTeacher className="text-4xl" />,
            title: "Expert Trainers",
            description: "Our certified trainers are here to guide you with personalized workout plans and professional advice."
        },
        {
            id: 3,
            icon: <FaUserShield className="text-4xl" />,
            title: "Safe Environment",
            description: "Your health and safety are our priority. We maintain a clean, sanitized, and secure gym space."
        },
        {
            id: 4,
            icon: <FaHeartbeat className="text-4xl" />,
            title: "Health Tracking",
            description: "Monitor your progress with our advanced health tracking tools and regular body assessments."
        }
    ];

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    
                    {/* Left Side: Content & Image */}
                    <div className="lg:w-1/2 relative">
                        <div className="z-10 relative">
                            <h2 className="text-[#FFA500] font-bold uppercase tracking-[4px] mb-3">Why FitPro?</h2>
                            <h1 className="text-xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                                Push Your Limits <br /> 
                                <span className="text-[#FFA500]">Beyond Boundaries</span>
                            </h1>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                FitPro is not just a gym; it's a community dedicated to your physical and mental transformation. 
                                We combine science-based training with a supportive atmosphere to help you reach your peak performance.
                            </p>
                            
                            {/* Decorative Image with Card */}
                            <div className="relative rounded-[25px] overflow-hidden group">
                                <img 
                                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
                                    alt="Workout" 
                                    className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl flex items-center gap-6 shadow-lg">
                                    <div className="bg-[#FFA500] text-white p-4 rounded-2xl font-black text-2xl">
                                        10+
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Years of Experience</h4>
                                        <p className="text-sm text-gray-500 italic">Transforming lives since 2016</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Background Decoration */}
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -z-0"></div>
                    </div>

                    {/* Right Side: Features Grid */}
                    <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((feature) => (
                            <div 
                                key={feature.id} 
                                className="group p-8 bg-white rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#FFA500]/20"
                            >
                                <div className="mb-6 inline-flex p-4 rounded-2xl bg-gray-50 text-gray-800 group-hover:bg-[#FFA500] group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FFA500] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;