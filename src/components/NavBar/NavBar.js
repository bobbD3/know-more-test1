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
          <NavLink to='/' className={isActive('/login')}>
            Login
          </NavLink>
        </li> */}
        <li>
          <NavLink to='/' className={isActive('/')}>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/company' className={isActive('/locations')}>
            Organizations
          </NavLink>
        </li>
        <li>
          <NavLink to='/videos' className={isActive('/videos')}>
            Programs
          </NavLink>
        </li>
        <li>
          <NavLink to='/libraries' className={isActive('/libraries')}>
            Program Packages
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
