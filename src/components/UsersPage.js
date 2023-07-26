import React, { useContext } from 'react'
import { UsersContext } from '../contexts/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import icon from '../images/Auction.svg'

const UsersPage = () => {
  const { users, setUsers } = useContext(UsersContext)
  console.log(users)
  const navigate = useNavigate()

  const removeUser = Id => {
    setUsers(users.filter(user => user.Id !== Id))
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
      <button value='doctor' className='button-general user-add-button-possition-doctor' onClick={e => handleAddUser(e.target.value)}>
        Add Doctor
      </button>
      <button value='patient' className='button-general user-add-button-possition-patient' onClick={e => handleAddUser(e.target.value)}>
        Add Patient
      </button>
      {/* <select className='button-general user-add-button-possition' onChange={e => handleAddUser(e.target.value)}>
        <option value='doctor'>Add Doctor</option>
        <option value='patient'>Add Patient</option>
      </select> */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Address</th>
            <th>Email</th>
            <th>Mobile</th>
            {/* <th>Icon</th>
            <th>Icon</th> */}
            <th>
              <img src={icon} alt='icon' />{' '}
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.Id}>
              <td>{user.Title}</td>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.Role}</td>
              <td>{`${user.State}`}</td>
              <td>{user.Email}</td>
              <td>{user.MobileNumber}</td>
              {/* <td>{user.confirmEmail}</td>
              <td>{user.confirmPhone}</td> */}
              <td>{user.HasAcceptedTerms ? 'Yes' : 'No'}</td>
              {/* <td className='user-add-button-possition-edit'>
                <Link to={`/edit-user/${user.id}`}>
                  <button className='button-classic'>Edit</button>
                </Link>
              </td> */}
              <td className='user-add-button-possition-edit'>
                <Link to={user.Title === 'Dr.' ? `/add-doctors/${user.Id}` : `/add-patient/${user.Id}`}>
                  <button className='button-classic'>Edit User</button>
                </Link>
              </td>
              <td className='user-add-button-possition-remove'>
                <button className='button-classic ' onClick={() => removeUser(user.Id)}>
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
