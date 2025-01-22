import  { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useAxiosSecure from '../UseAxiosSecure/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";

const useTrainer = () => {
    const {user,loading} = useContext(AuthContext)
    const AxiosSecure = useAxiosSecure()
    const {data: isTrainer = false, isLoading: isTrainerLoading} = useQuery({
        queryKey: [user?.email, "isTrainer"],
        enabled:!loading && !!user?.email,
        queryFn: async () => {
          const res = await AxiosSecure.get(`/check-trainer/${user?.email}`)
          return res.data.trainer
        }
      });
    return [isTrainer,isTrainerLoading]
};

export default useTrainer;