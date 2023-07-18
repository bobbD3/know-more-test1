import React, { useContext } from 'react'
import { UsersContext } from '../contexts/UserContext'
import { Link, useNavigate } from 'react-router-dom'

const UsersPage = () => {
  const { users, setUsers } = useContext(UsersContext)
  const navigate = useNavigate()
  const removeUser = id => {
    setUsers(users.filter(user => user.id !== id))
  }

  const handleAddUser = option => {
    if (option === 'doctor') {
      navigate('/add-doctors')
    } else if (option === 'patient') {
      navigate('/add-patient')
    }
  }

  return (
    <div>
      <select className='button-general user-add-button-possition' onChange={e => handleAddUser(e.target.value)}>
        <option value=''>Add</option>
        <option value='doctor'>Add Doctor</option>
        <option value='patient'>Add Patient</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Address1</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Icon</th>
            <th>Icon</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.title}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td>{user.address1}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.confirmEmail}</td>
              <td>{user.confirmPhone}</td>
              <td>{user.confirmPolicy}</td>
              {/* <td className='user-add-button-possition-edit'>
                <Link to={`/edit-user/${user.id}`}>
                  <button className='button-classic'>Edit</button>
                </Link>
              </td> */}
              <td className='user-add-button-possition-edit'>
                <Link to={user.title === 'Dr.' ? `/add-doctors/` : `/add-patient/`}>
                  <button className='button-classic'>Edit</button>
                </Link>
              </td>
              <td className='user-add-button-possition-remove'>
                <button className='button-classic ' onClick={() => removeUser(user.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div></div>
    </div>
  )
}

export default UsersPage
