import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UsersContext } from '../contexts/UserContext'
import dummyUsers from '../data/data'

const initialFormState = {
  id: Date.now(),
  title: '',
  firstName: '',
  lastName: '',
  role: 'Patient',
  address1: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  mobile: '',
  confirmEmail: 'No',
  confirmPhone: 'No',
  confirmPolicy: 'No',
  language: 'English'
}

const roles = ['Patient']
const states = ['Alabama', 'Alaska']
const titles = ['Mr', 'Ms']
const confirmationOptions = ['Yes', 'No']
const languages = ['English', 'Non-English']

const PatientPage = () => {
  const { users, setUsers } = useContext(UsersContext)
  const [selectedDoctors, setSelectedDoctors] = useState([])
  const [formState, setFormState] = useState(initialFormState)
  const navigate = useNavigate()

  const handleCheckChange = doctorId => {
    setSelectedDoctors(prevState => {
      if (prevState.includes(doctorId)) {
        return prevState.filter(id => id !== doctorId)
      } else {
        return [...prevState, doctorId]
      }
    })
  }
  const handleChange = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    setUsers([...users, { ...formState, id: Date.now() }]) // add new user to shared state
    setFormState(initialFormState)
    navigate('/users')
  }

  const doctors = dummyUsers.filter(user => user.role === 'Doctor')

  return (
    <div>
      <form className='patientForm' onSubmit={handleSubmit}>
        <div>
          <div>Title:</div>
          <select className='patient_title_dropdown_title' name='title' value={formState.title} onChange={handleChange}>
            {titles.map((title, index) => (
              <option value={title} key={index}>
                {title}
              </option>
            ))}
          </select>
          <div>First Name</div>
          <input className='patient_title_dropdown_big' name='firstName' value={formState.firstName} onChange={handleChange} placeholder='First Name' />
          <div>Last Name</div>
          <input className='patient_title_dropdown_big' name='lastName' value={formState.lastName} onChange={handleChange} placeholder='Last Name' />
          <div>Role: {roles[0]}</div>
          {/* <select className='patient_title_dropdown_title' name='roles' value={formState.roles} onChange={handleChange}>
            {roles.map((roles, index) => (
              <option value={roles} key={index}>
                {roles}
              </option>
            ))}
          </select> */}
          <div>Address</div>
          <input className='patient_title_dropdown_big' name='address1' value={formState.address1} onChange={handleChange} placeholder='Address' />
          <div>City</div>
          <input className='patient_title_dropdown_big' name='city' value={formState.city} onChange={handleChange} placeholder='City' />
          <div className='users_address2'>
            <div>
              <div>States</div>
              <select className='patient_title_dropdown_state' name='states' value={formState.states} onChange={handleChange}>
                {states.map((state, index) => (
                  <option value={state} key={index}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div>Zip</div>
              <input className='patient_title_dropdown_zip' name='zip' value={formState.zip} onChange={handleChange} placeholder='Zip' />
            </div>
          </div>
          <div>Email</div>
          <input className='patient_title_dropdown_big' name='email' value={formState.email} onChange={handleChange} placeholder='Email' />
          <div>Mobile</div>
          <input className='patient_title_dropdown_big' name='mobile' value={formState.mobile} onChange={handleChange} placeholder='Mobile' />
        </div>
        <section>
          <div className='users_verificaiton'>
            {/* <div>
              <div>Verified Mobile</div>
              <select className='patient_dropdown_terms' name='confirmPhone' value={formState.confirmPhone} onChange={handleChange}>
                {confirmationOptions.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div> */}
            <div>
              <div>Accepted Terms</div>
              <select className='patient_dropdown_terms' name='confirmPolicy' value={formState.confirmPolicy} onChange={handleChange}>
                {confirmationOptions.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div>Language</div>
              <select className='patient_dropdown_terms-language' name='language' value={formState.language} onChange={handleChange}>
                {languages.map((language, index) => (
                  <option value={language} key={index}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            {/* <div>
              <div>Verified Email</div>
              <select className='patient_dropdown_terms' name='confirmEmail' value={formState.confirmEmail} onChange={handleChange}>
                {confirmationOptions.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
          <div className='doctor_locations_list'>
            <div>Doctors</div>
            <button className='button-classic button-classic-doctors-add' type='button'>
              Add
            </button>
          </div>
          <div className='users_list_box'>
            {doctors.map((doctor, index) => (
              <div key={index}>
                <label>
                  <input type='checkbox' checked={selectedDoctors.includes(doctor.id)} onChange={() => handleCheckChange(doctor.id)} />
                  {doctor.title} {doctor.firstName} {doctor.lastName}
                </label>
              </div>
            ))}
          </div>
        </section>
        <button className='button-general button-general-patient-send' type='submit'>
          Send Invite
        </button>
        <div className='button-general-patient-container '>
          <Link to='/users'>
            <button className='button-general button-general-patient-cancel' type='button'>
              Cancel
            </button>
          </Link>
          <button className='button-general button-general-patient-save' type='submit'>
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default PatientPage
