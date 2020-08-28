import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Chat from './Chat'

export default function Home() {
    // const { userData } = useContext(UserContext)

    return (
        <div className={"chat-page"}>
                            <>
                <h3>What's on Your Mind?</h3>
                <Chat name={'user'} />
                </>
            {/* {userData.user ? (
                <>
                <h3>What's on Your Mind, {userData.user.username}?</h3>
                <Chat name={userData.user.username} />
                </>
            ) : (
                <>
                <h2>Please login</h2>
                <Link id="login-link" to="/login">Login</Link>
                </>
            )} */}
        </div>
    )
}
