import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../UseAxiosSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const AxiosSecure = useAxiosSecure()
    const {data: isAdmin = false , isPending: isAdminLoading} = useQuery({
        queryKey:[user?.email,"isAdmin"],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/user/${user.email}`)
            return res.data.admin
        }
    })
    return [isAdmin,isAdminLoading]
};

export default useAdmin;