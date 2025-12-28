import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from "firebase/auth";
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleLogin = new GoogleAuthProvider();

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000'
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleLogin);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (updateData) => {
        return updateProfile(auth.currentUser, updateData);
    };

    const logOut = () => {
        setLoading(true);
        localStorage.removeItem('access-token');
        return signOut(auth);
    };

    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                try {
                    const res = await axiosPublic.post('/jwt', userInfo);

                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                    }
                } catch (error) {
                    console.error("JWT error:", error);
                    localStorage.removeItem('access-token');
                }
            } else {
                localStorage.removeItem('access-token');
            }
            
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authData = {
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

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;