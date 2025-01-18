import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useAxiosSecure from '../UseAxiosSecure/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";

const useTrainer = () => {
    const {user} = useContext(AuthContext)
    const AxiosSecure = useAxiosSecure()
    const {data: isTrainer = false , isPending: isTrainerLoading} = useQuery({
        queryKey:[user?.email,"isTrainer"],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/trainer/${user.email}`)
            // console.log(res.data.trainer);
            return res.data.trainer
        }
    })
    return [isTrainer,isTrainerLoading]
};

export default useTrainer;