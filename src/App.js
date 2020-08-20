import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from "./components/Header";
import Home from './components/pages/Home';
import Login from './components/Authorization/Login';
import Register from './components/Authorization/Register';
import UserContext from './context/UserContext';


let baseUrl;
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003';
} else {
  baseUrl = 'https://ventdchatapp-backend.herokuapp.com';
}
console.log('current base URL:', baseUrl);


export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        baseUrl + "/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get(baseUrl + "/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" render={() => <Login baseUrl={baseUrl} />} />
              <Route path="/register" render={() => <Register baseUrl={baseUrl} />} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  )
}
