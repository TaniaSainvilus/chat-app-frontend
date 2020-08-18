import React, {useState, useContext} from 'react'
import {useHistory} from "react-router-dom"
import UserContext from "../../context/UserContext"
import Axios from 'axios'
import ErrorMsg from "../Error/ErrorMsg"

export default function Login(props) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const { setUserData } = useContext(UserContext)
    const history = useHistory()

    const submit = async (event) => {
        event.preventDefault()
        try {
        const loginUser = { email, password }
        const loginRes = await Axios.post(props.baseUrl + "/user/login", loginUser)
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
        })
        localStorage.setItem("auth-token", loginRes.data.token)
        history.push('/')
            } catch (err) {
                err.response.data.msg && setError(err.response.data.msg)
            }
    }
    return (
        <div className="page">
            <h2>Login</h2>
            {error && (
                <ErrorMsg message={error} clearError={() => setError(undefined)} />
            )}
            <form className="form-auth" onSubmit={submit}>
                <input 
                id="login-email" 
                placeholder="Email"
                type="email" 
                onChange={(event) => setEmail(event.target.value)}
                />

                <input 
                id="login-password" 
                placeholder="Password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                />

                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

