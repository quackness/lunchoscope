'use client'
import { useAuth } from '@/Context/userAuth'
import React, { useEffect } from 'react'

const User = () => {

    const { addUser } = useAuth();

    const testUser = {
        id: "123",
        email: "vansh@yahoo.com",
        hashedPassword: "hello",
        isAdmin: true,
        name: "vansh",
        sentimentLeft: 5,
        subscribed: false
    }

    useEffect(() => {
        addUser(testUser);
    }, [])


    return (
        <div>
            Hello world
        </div>
    )
}

export default User
