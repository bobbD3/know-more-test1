import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { HospitalsContext } from '../contexts/HospitalsContext'

const CompanyPage = () => {
  const { hospitals, setHospitals } = useContext(HospitalsContext)

  const removeUser = id => {
    setHospitals(hospitals.filter(user => user.id !== id))
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Hospital</th>
            <th>Address1</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.address1}</td>
              <td>{user.mobile}</td>
              <td className='user-add-button-possition-edit'>
                <Link to={`/edit-company/${user.id}`}>
                  <button className='button-classic '>Edit</button>
                </Link>
              </td>
              <td className='user-add-button-possition-remove'>
                <button className='button-classic' onClick={() => removeUser(user.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Link to={`/add-company`}>
          <button className='button-general user-add-button-possition'>Add</button>
        </Link>
      </div>
    </div>
  )
}

export default CompanyPage
