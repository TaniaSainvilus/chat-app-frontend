import React, { Component } from 'react'
import Auth from './Authorization/Auth'

class Header extends Component {
  render() {
    return (
      <header id="Header">
        <h1 className="title">Ventd</h1>
        <Auth/>
      </header>
    )
  }
}

export default Header