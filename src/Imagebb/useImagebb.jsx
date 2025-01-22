import axios from "axios";

export const useAxiosBB = axios.create({
  baseURL: "https://assignment-12-server-red-one.vercel.app",
});
const useImagebb = () => {
  return useAxiosBB;
};

export default useImagebb;
