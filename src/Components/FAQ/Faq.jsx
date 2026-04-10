import React, { useState } from 'react';
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa';

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const faqData = [
        {
            question: "How do I start my fitness journey at FitPro?",
            answer: "Simply choose a class from our Featured Classes or sign up for a membership. Our expert trainers will guide you through an initial assessment to create your personalized plan."
        },
        {
            question: "Do you provide personalized diet plans?",
            answer: "Yes! Our premium and diamond memberships include customized nutrition guides prepared by certified nutritionists to complement your workout routine."
        },
        {
            question: "Can I cancel my membership anytime?",
            answer: "We offer flexible membership plans. While basic plans have a monthly cycle, you can upgrade or pause your subscription through your user dashboard."
        },
        {
            question: "Is there a trial period for new members?",
            answer: "Absolutely! We offer a 3-day free pass for new users to experience our modern equipment and join any group class before committing."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    
                    {/* Left Side: Heading, Details & FAQ */}
                    <div className="lg:w-1/2 w-full">
                        <div className="mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <FaQuestionCircle className="text-[#FFA500] text-xl" />
                                <span className="text-[#FFA500] font-bold uppercase tracking-[4px] text-sm">Common Inquiries</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                Frequently Asked <br />
                                <span className="text-[#FFA500]">Questions</span>
                            </h1>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                Everything you need to know about our gym, classes, and memberships. 
                                Can't find the answer you're looking for? Feel free to contact our support team.
                            </p>
                        </div>

                        {/* Accordion */}
                        <div className="space-y-4">
                            {faqData.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={`rounded-2xl border-2 transition-all duration-300 ${
                                        activeIndex === index ? "border-[#FFA500] bg-orange-50/30" : "border-gray-100 bg-white"
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full flex justify-between items-center p-5 md:p-6 text-left"
                                    >
                                        <span className={`text-lg font-bold ${activeIndex === index ? "text-gray-900" : "text-gray-700"}`}>
                                            {item.question}
                                        </span>
                                        <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all ${
                                            activeIndex === index ? "bg-[#FFA500] text-white rotate-180" : "bg-gray-100 text-gray-400"
                                        }`}>
                                            {activeIndex === index ? <FaMinus size={12} /> : <FaPlus size={12} />}
                                        </div>
                                    </button>
                                    
                                    <div className={`overflow-hidden transition-all duration-500 ${
                                        activeIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                                    }`}>
                                        <div className="p-6 pt-0 text-gray-500 leading-relaxed border-t border-dashed border-gray-200 mt-2">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Image */}
                    <div className="lg:w-1/2 w-full relative">
                        <div className="relative group">
                            {/* Main Image */}
                            <div className="rounded-[25px] overflow-hidden relative z-10">
                                <img 
                                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" 
                                    alt="Fitness FAQ" 
                                    className="w-full h-[680px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#FFA500]/20 to-transparent"></div>
                            </div>

                            {/* Decorative Floating Card */}
                            <div className="absolute -bottom-10 -left-10 bg-[#1a1a1a] p-8 rounded-[30px] shadow-2xl z-20 hidden md:block border-4 border-white">
                                <h4 className="text-[#FFA500] text-3xl font-black mb-1">24/7</h4>
                                <p className="text-white text-sm font-bold uppercase tracking-widest">Support <br /> Available</p>
                            </div>

                            {/* Background Shape */}
                            <div className="absolute -top-10 -right-10 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-60 -z-0"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Faq;