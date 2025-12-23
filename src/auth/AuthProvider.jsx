import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
export const AuthContext = createContext();
const auth = getAuth(app);
const googleLogin = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signInGoogle = () =>{

        setLoading(true);
        return signInWithPopup(auth, googleLogin);
    };
    
    const signIn =(email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const updateUser =(updateData) =>{
        return updateProfile(auth.currentUser, updateData);

    };
    const logOut = () =>{
        return signOut(auth);
    };
    const resetPassword = (email) =>{
        setLoading(true);
        return sendPasswordResetEmail(auth, email);

    };
    useEffect(() =>{
      const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);

       });
       return ( ) =>{
        unsubcribe();

       }

    }, []);
    const authData ={
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        loading,
        setLoading,
        updateUser,
        signInGoogle,
        resetPassword,
    };
    return <AuthContext.Provider value={authData}> {children} </AuthContext.Provider>
};

export default AuthProvider;