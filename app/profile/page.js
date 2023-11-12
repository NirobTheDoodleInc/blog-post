"use client";
import { Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import "../../configureAmplify"
import Navbar from '../components/navbar';
import { withAuthenticator } from '@aws-amplify/ui-react';

function Profile() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = async () => {
        const user = await Auth.currentAuthenticatedUser()
        setUser(user)
    }
    if (!user) return null
    return (
        <div>
            <Navbar></Navbar>
            <h1 className='text-3xl font-semibold tracking-wide mt-6'>Profile</h1>
            <h1 className='font-medium text-gray-500 my-2'>{user?.username}</h1>
            <p className='text-sm text-gray-500 mb-6'>{user?.attributes?.email}</p>

        </div>
    )
}

export default withAuthenticator(Profile)