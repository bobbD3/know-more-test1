import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = e => {
    e.preventDefault()

    // Simulating login authentication
    const dummyUsername = 'admin'
    const dummyPassword = 'password'

    if (username === dummyUsername && password === dummyPassword) {
      // Call the onLogin prop function to change loggedIn state to true
      onLogin()

      // Redirect to the "/users" page after successful login
      navigate('/users')
    } else {
      // Display an error message or perform other login failure logic
      console.log('Login failed')
    }
  }

  return (
    <div className='login-form-container'>
      <form onSubmit={handleLogin} className='login-form'>
        <div className='login-form-content'>
          <h2 className='login-name'>Username:</h2>
          <input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} className='login-input' />
          <br />
          <h2 className='login-password'>Password:</h2>
          <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} className='login-input' />
          <button type='submit' className='login-button'>
            Login:
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
