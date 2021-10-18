import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class  Nav extends Component  {
  render () {
    const authedUser = this.props.authedUser
    const user = this.props.authedUser ? this.props.users[authedUser]: null
  
    return (
      <nav className='nav'>
        <ul className='navbar__menu'>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/logout' activeClassName='active'>
              logout
            </NavLink>
          </li>
          <li className='avatar-name'>
            {(user !== null) && (
                <span className='logo' >{user.name}</span>
            )     }      
          </li>
          <li className='avatar-icon'>
          {(user !== null) && (
                <img
                    src={user.avatarURL}
                    alt={`Avatar of ${user.name}`}
                    className='avatar-icon'
                    />       
            )}      
          </li>

        </ul>
      </nav>
    )
  }
}

function mapStateToProps ({  users, authedUser }) {
  return {
    users,
    authedUser,
  }
}

export default  connect(mapStateToProps)(Nav)