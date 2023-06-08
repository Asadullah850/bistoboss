import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import app from './firebase.config';

const auth = getAuth(app);

export const AuthContext = createContext(null)



const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();

    const newUser = (email, pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }
    const login = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logOut = () => {
        signOut(auth)
    }

    const updateUser = (displayName, photoURL) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName, photoURL
        })
    }

    const authInfo = {
        user,
        loading,
        newUser,
        login,
        logOut,
        updateUser,
        googleLogin
    }
    useEffect(() => {
        const unSubscribed = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)

            if (currentUser) {
                axios.post(`http://localhost:3000/jwt`, { email: currentUser.email })
                    .then(data => {
                        // console.log(data.data.token);
                        localStorage.setItem('token', data.data.token)
                        setLoading(false)
                    })
            } else{
                localStorage.removeItem('token')
            }

        })
        return () => {
            return unSubscribed();
        }
    }, [])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;