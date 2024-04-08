"use client";

import { ReactNode, createContext, useContext, useState } from "react";

export interface User {
    id: string;
    email: string;
    hashedPassword: string;
    isAdmin: boolean;
    name: string;
    sentimentLeft: number;
    subscribed: boolean;
}

export interface UserContext {
    user: User;
    addUser: (myUser: User) => void;
    setUser: (myUser: User | null) => void;
}

export const userContext = createContext<UserContext | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {

    // const [user, setUser] = useState<User>({
    //     id: "",
    //     email: "",
    //     hashedPassword: "",
    //     isAdmin: false,
    //     name: "",
    //     sentimentLeft: 0,
    //     subscribed: false
    // })
    const [user, setUser] = useState<User | null>();

    const addUser = (myUser: User) => {

        setUser(myUser);

    }

    return (
        // user showing redline but it still works
        <userContext.Provider value={{ user, addUser, setUser }}>
            {children}
        </userContext.Provider>
    )

}

export function useAuth() {
    const userContextValue = useContext(userContext);

    if (!userContextValue) {
        throw new Error('UserContext used outside of provider');
    }

    return userContextValue;
}