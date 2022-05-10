import React, { useState } from 'react';
import { auth } from '../../API/Services/Auth';

export default function AuthProvider({ children } : { children: React.ReactNode}) {
    let [user, setUser] = useState<any>(null);

    let signIn = (newUser: string) => {
        if(auth.isAuthenticated) {
            setUser('user from login request response')
        }
        return auth.isAuthenticated;
    };

    let signOut = () => {
        
    }

    return(
        <></>
    )
}