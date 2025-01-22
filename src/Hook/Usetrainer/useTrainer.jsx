import  { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useAxiosSecure from '../UseAxiosSecure/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";

const useTrainer = () => {
    const {user} = useContext(AuthContext)
    const AxiosSecure = useAxiosSecure()
    const {data: isTrainer = false, isLoading: isTrainerLoading} = useQuery({
        queryKey: [user?.email, "isTrainer"],
        queryFn: async () => {
          try {
            const res = await AxiosSecure.get(`/check-trainer/${user?.email}`);
            if (res?.data) {
              // console.log(res.data.trainer);
              return res.data.trainer ;
            }
            return false;
          } catch (error) {
            console.error("Error fetching trainer status:", error);
            return false;
          }
        }
      });
    return [isTrainer,isTrainerLoading]
};

export default useTrainer;