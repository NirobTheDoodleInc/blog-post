import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Auth, Hub } from 'aws-amplify'
export default function Navbar() {
    const [signedUser, setSignedUser] = useState(false)

    useEffect(() => {
        authListener()
    }, [])

    const authListener = async () => {
        Hub.listen("auth", (data) => {
            switch (data.payload.event) {
                case "signIn":
                    return setSignedUser(true)
                case "signOut":
                    return setSignedUser(false)
            }
        })

        try {
            await Auth.currentAuthenticatedUser
            setSignedUser(true)
        } catch (error) {
            console.error(error)
        }
    }
    const navArray = [
        {
            title: "Home",
            slug: "/"
        },
        {
            title: "Create Post",
            slug: "/create-post"
        },
        {
            title: "Profile",
            slug: "/profile"
        }
    ]

    const signedNav = [
        {
            title: "My Post",
            slug: "/my-post"
        }
    ]
    return (
        <nav className='flex justify-center pt-3 pb-3 space-x-4 border-b bg-cyan-500 border-gray-300'>
            {
                navArray.map((item, index) => {
                    return (
                        <Link href={item.slug} key={index}>{item.title}</Link>
                    )
                })
            }

            {
                signedUser ?
                    signedNav.map((item, index) => {
                        return (
                            <Link href={item.slug} key={index}>{item.title}</Link>
                        )
                    }) : null
            }
        </nav>
    )
}
