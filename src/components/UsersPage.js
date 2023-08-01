import React, { useContext, useEffect, useState } from 'react'
import { UsersContext } from '../contexts/UserContext'
import { Link, useNavigate } from 'react-router-dom'
// import icon from '../images/Auction.svg'

const UsersPage = () => {
  const { users: usersFromContext, loading, deleteUser } = useContext(UsersContext)
  const [users, setUsers] = useState([]) // Local state to store users
  console.log(users)

  const navigate = useNavigate()

  useEffect(() => {
    setUsers(usersFromContext) // Update localUsers state whenever 'users' changes
  }, [usersFromContext])

  const handleRemoveUser = async userId => {
    try {
      await deleteUser(userId)
    } catch (error) {
      console.error('Failed to remove the user', error)
    }
  }

  const handleAddUser = option => {
    if (option === 'doctor') {
      navigate('/add-doctors')
    } else if (option === 'patient') {
      navigate('/add-patient')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <button value='doctor' className='button-general user-add-button-possition-doctor' onClick={e => handleAddUser(e.target.value)}>
        Add Doctor
      </button>
      <button value='patient' className='button-general user-add-button-possition-patient' onClick={e => handleAddUser(e.target.value)}>
        Add Patient
      </button>
      <table>
        <thead>
          <tr key='keys'>
            <th>Title</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Address</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>
              Accepted Terms
              {/* <img src={icon} alt='icon' />{' '} */}
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={(user + index).toString()}>
              <td>{user.Title || '-'}</td>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.Role}</td>
              <td>{user.State}</td>
              <td>{user.Email || '-'}</td>
              <td>{user.MobilePhone}</td>
              <td className='user-accepted-terms'>{user.HasAcceptedTerms ? 'Yes' : 'No'}</td>
              <td className='user-add-button-possition-edit'>
                <Link to={user.RoleId === Number(2) ? `/add-doctors/${user.UserId}` : `/add-patient/${user.UserId}`}>
                  <button className='button-classic'>Edit User</button>
                </Link>
              </td>
              <td className='user-add-button-possition-remove'>
                <button className='button-classic' onClick={() => handleRemoveUser(user.UserId)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage
