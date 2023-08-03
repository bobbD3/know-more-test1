import React, { useState, useEffect, useContext } from 'react'
import { UsersContext } from '../contexts/UserContext'
import { useNavigate, useParams, Link } from 'react-router-dom'

const EditUserPage = () => {
  const { users, setUsers } = useContext(UsersContext)
  const { id } = useParams()
  const navigate = useNavigate()

  // Initial state for the form
  const [formState, setFormState] = useState({
    title: '',
    firstName: '',
    lastName: '',
    role: '',
    address1: '',
    email: '',
    mobile: '',
    confirmEmail: '',
    confirmPhone: '',
    confirmPolicy: '',
    language: '',
    videoURL: '',
    status: '',
    library: '',
    package: ''
  })

  useEffect(() => {
    // Get the user to edit when the component mounts
    const userToEdit = users.find(user => user.id === Number(id))

    if (userToEdit) {
      setFormState(userToEdit)
    }
  }, [users, id])

  const handleChange = event => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    const updatedUsers = users.map(user => (user.id === Number(id) ? formState : user))

    setUsers(updatedUsers)
    navigate('/')
  }

  return (
    <div className='edit_user_container'>
      <h2>Edit User</h2>
      <form className='edit-user-form' onSubmit={handleSubmit}>
        {Object.keys(formState).map(key => (
          <div className='edit-user-form-input' key={key}>
            <label className='edit-user-form-label'>{key}</label>
            <input className='edit-user-form-input' name={key} value={formState[key]} onChange={handleChange} />
          </div>
        ))}
        <button className='button-general' type='submit'>
          Save
        </button>
        <Link to='/'>
          <button className='button-general' type='button'>
            Cancel
          </button>
        </Link>
      </form>
    </div>
  )
}

export default EditUserPage
