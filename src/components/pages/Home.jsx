import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Chat from './Chat'

export default function Home() {
    const { userData } = useContext(UserContext)

    return (
        <div className={userData.user ? "chat-page" : "page"}>
            {userData.user ? (
                <>
                <h2>Let's chat {userData.user.username}!</h2>
                <Chat name={userData.user.username} />
                </>
            ) : (
                <>
                <h2>Please login</h2>
                <Link id="login-link" to="/login">Login</Link>
                </>
            )}
        </div>
    )
}
