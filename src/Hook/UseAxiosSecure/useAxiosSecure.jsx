import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";


export const AxiosSecure = axios.create({
    baseURL:"http://localhost:5000"
})
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {userLogout} = useContext(AuthContext)
    AxiosSecure.interceptors.request.use(
        (config) =>{
            const token = localStorage.getItem("access-token")
            if(!token){
             console.log("token missing");
            }else{
                config.headers.authorization=`Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    )
    AxiosSecure.interceptors.response.use(
        function (response) {
            return response
        },
       async (error) => {
            const status = error.response.status
            if(status === 401 || status === 403){
                await userLogout()
                navigate('/login')
            }
            return Promise.reject(error)

        }
    )
    return AxiosSecure
};

export default useAxiosSecure;