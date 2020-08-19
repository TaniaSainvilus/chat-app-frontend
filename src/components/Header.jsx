import React, { Component } from 'react'
import Auth from './Authorization/Auth'
// import logo from '../public/VentdLogo.png'

class Header extends Component {
  render() {
    return (
      <header id="Header">
        <div>
          <h1 id="title">VENTD</h1>
          <h4 id="sub-title">Your Feelings are Valid</h4>
          {/* <img id="ventd-logo" src={logo} alt="Ventd Logo"></img> */}
        </div>
        <Auth/>
      </header>
    )
  }
}

export default Header