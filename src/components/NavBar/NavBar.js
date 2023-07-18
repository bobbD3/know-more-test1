import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation()

  const isActive = path => {
    return path === location.pathname ? 'active' : ''
  }

  return (
    <nav className='navBar'>
      <ul>
        {/* <li>
          <NavLink to='/' className={isActive('/')}>
            Login
          </NavLink>
        </li> */}
        <li>
          <NavLink to='/users' className={isActive('/users')}>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/company' className={isActive('/locations')}>
            Company
          </NavLink>
        </li>
        <li>
          <NavLink to='/videos' className={isActive('/videos')}>
            Videos
          </NavLink>
        </li>
        <li>
          <NavLink to='/libraries' className={isActive('/libraries')}>
            Libraries
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
