import axios from "axios";

export const AxiosPublic = axios.create({
  baseURL: "https://assignment-12-server-red-one.vercel.app",
});

const useAxiosPublic = () => {
  return AxiosPublic;
};

export default useAxiosPublic;
