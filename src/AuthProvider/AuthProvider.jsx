import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebaseinit";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user,setUser] = useState()
const [loading,setLoading] = useState(true)

const signupUser = (email,password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
}


const userLogin = (email,password) => {
    setLoading(true) 
    return signInWithEmailAndPassword(auth, email, password)
}
const userLogout = () => {
    setLoading(true)
    return signOut(auth)
}

const userInfo = (userData) => {
    return updateProfile(auth.currentUser, userData)
}


useEffect(()=> {
    const unsubcribe = onAuthStateChanged(auth,(currentUser) => {
        setUser(currentUser || null)
        setLoading(false)
    })
    return unsubcribe;
},[])


const Authinfo = {
    user,
    setUser,
    loading,
    setLoading,
    signupUser,
    userInfo,
    userLogout,
    userLogin
}
    return (
       <AuthContext.Provider value={Authinfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;