import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'

export const AuthContext = createContext();

const UserContex = ({children}) => {
    const auth = getAuth(app)
    const [user, setUser] = useState(null)

    const createUser = (email, password) =>{
       return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('the user inside state',currentUser);
            setUser(currentUser);
        });
        return () => unsubscribe();
    },[])

    const authInfo = {user, createUser, signIn, logOut}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContex;