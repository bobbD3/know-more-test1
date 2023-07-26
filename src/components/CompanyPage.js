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
            <th>Organization</th>
            <th>Address</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.address1}</td>
              <td>{user.mobile}</td>
              <td className='organization-add-button-possition-edit'>
                <Link to={`/edit-company/${user.id}`}>
                  <button className='button-classic '>Edit Organization</button>
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
          <button className='button-general user-add-button-possition'>Add Organization</button>
        </Link>
      </div>
    </div>
  )
}

export default CompanyPage
