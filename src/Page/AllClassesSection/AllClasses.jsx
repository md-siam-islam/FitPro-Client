import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../Components/UseAxiosPublic/useAxiosPublic';

const AllClasses = () => {
    const AxiosPublic = useAxiosPublic()

    const {data: newClass = {}} = useQuery({
        queryKey:['neqClass'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/newclass')
            return res.data
        }
    })
    return (
        <div>
            
        </div>
    );
};

export default AllClasses;