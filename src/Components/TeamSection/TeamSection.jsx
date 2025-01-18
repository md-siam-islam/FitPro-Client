import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../UseAxiosPublic/useAxiosPublic';

const TeamSection = () => {
    const AxiosPublic = useAxiosPublic();

    const [trainers, setTrainers] = useState([]); // State-এর ডিফল্ট ভ্যালু একটি খালি অ্যারে দিন

    useEffect(() => {
        // API কল
        AxiosPublic.get('/trainer?limit=3') // Route এর নাম সঠিক করা হয়েছে
            .then((res) => {
                setTrainers(res.data); // ডাটা state-এ সেট করা
            })
            .catch((error) => {
                console.error('Error fetching trainers:', error); // কোনো ত্রুটি হলে লগ করা
            });
    }, []);

    return (
        <div className="team-section bg-gray-100 py-12 my-10 px-5">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Meet Our Trainers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {trainers.map((trainer) => (
                        <div
                            key={trainer._id} 
                            className="bg-white rounded-lg shadow-lg p-6 text-center"
                        >
                            <img
                                src={trainer.profileImage} 
                                
                                alt={trainer.name}
                                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                            />
                            <h3 className="text-xl font-semibold mb-2">{trainer.name}</h3> 
                            <p className="text-gray-600 mb-4">Experience: {trainer.experience}</p>
                            <h4 className="text-gray-800 font-medium">Expertise:</h4>
                            <p className="text-gray-600">{trainer.expertise.join(', ')}</p> 
                            <p>Details : {trainer.details}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamSection;
