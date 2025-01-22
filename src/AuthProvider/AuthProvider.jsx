import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebaseinit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../Components/UseAxiosPublic/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const AxiosPublic = useAxiosPublic();
  const provider = new GoogleAuthProvider();
  const signupUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userGoogleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const userLogout = () => {
    setLoading(true);
    setUser();
    return signOut(auth);
  };

  const userInfo = (userData) => {
    return updateProfile(auth.currentUser, userData);
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser || null);
        // console.log(currentUser);
        const userData = { email: currentUser.email };
        AxiosPublic.post("/jwt", userData).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
        localStorage.removeItem("access-token");
      }
    });
    return unsubcribe;
  }, []);

  const Authinfo = {
    user,
    setUser,
    loading,
    setLoading,
    signupUser,
    userInfo,
    userLogout,
    userLogin,
    userGoogleLogin,
  };
  return (
    <AuthContext.Provider value={Authinfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
