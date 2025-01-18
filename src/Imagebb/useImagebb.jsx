import axios from "axios";

export const useAxiosBB = axios.create({
    baseURL:'http://localhost:5000'
})
const useImagebb = () => {
    return useAxiosBB
};

export default useImagebb;
