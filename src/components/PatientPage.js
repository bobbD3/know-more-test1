import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UsersContext } from '../contexts/UserContext'
// import dummyUsers from '../data/data'

const initialFormState = {
  id: Date.now(),
  title: '',
  firstName: '',
  lastName: '',
  role: 3,
  address1: '',
  city: '',
  state: '',
  zip: '',
  Email: '',
  mobile: '',
  confirmPolicy: 'No',
  language: 'English'
}

const titles = ['Mr', 'Ms']
const confirmationOptions = ['Yes', 'No']

const PatientPage = () => {
  const { users, states, languages, roles, manageUser, fetchUsers } = useContext(UsersContext)
  console.log(`Patienrs Page:`)
  console.log(users)
  const [selectedDoctors, setSelectedDoctors] = useState([])
  const [formState, setFormState] = useState({
    ...initialFormState,
    state: states.length > 0 ? states[0].Name : '',
    language: languages.length > 0 ? languages[0].Name : ''
  })

  const navigate = useNavigate()
  const { UserId } = useParams()
  const user = users.find(user => user.UserId === Number(UserId))

  useEffect(() => {
    if (user) {
      const roleExists = roles.some(role => role.RoleId === user.RoleId)
      console.log(roleExists)
      const role = roleExists ? user.RoleId : roles[0]?.RoleId || ''
      console.log(role)

      setFormState({
        UserId: user.UserId,
        title: user.Title,
        firstName: user.FirstName,
        lastName: user.LastName,
        role: role, // change this line
        address1: user.Address,
        city: user.City,
        state: user.State,
        zip: user.Zip,
        Email: user.Email,
        mobile: user.MobilePhone,
        confirmPolicy: user.AcceptedTerms === 1 ? 'Yes' : 'No',
        language: user.Language
      })
    }
  }, [user, roles])

  const handleCheckChange = doctorId => {
    setSelectedDoctors(prevState => {
      if (prevState.includes(doctorId)) {
        return prevState.filter(UserId => UserId !== doctorId)
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
    const role = roles.find(role => role.RoleId === formState.role)
    const language = languages.find(lang => lang.Name === formState.language)
    const state = states.find(state => state.Name === formState.state)

    const userData = {
      UserId: formState.UserId,
      RoleId: role?.RoleId, // use the RoleId of the role from context
      LanguageId: language?.Id || 1, // use the Id of the language from context
      AcceptedTerms: formState.confirmPolicy === 'Yes' ? 1 : 0,
      FirstName: formState.firstName,
      LastName: formState.lastName,
      Email: formState.Email,
      MobilePhone: formState.mobile,
      Address: formState.address1,
      City: formState.city,
      StateId: state?.Id, // use the Id of the state from context
      Zip: formState.zip,
      // OrganizationIds: selectedDoctors,
      OrganizationIds: [],
      LibraryIds: formState.libraryIds || [] // Added logic for library Ids
    }

    if (user) {
      // update existing user
      manageUser(userData)
    } else {
      // add new user
      manageUser({ ...userData })
    }

    console.log(userData)
    setFormState(initialFormState)
    fetchUsers()
    navigate('/')
  }

  const doctors = users.filter(user => user.Role === 'Physician')

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
          <div>Role: {roles.find(role => role.SystemCode === 'PAT')?.Name}</div>
          <div>Address</div>
          <input className='patient_title_dropdown_big' name='address1' value={formState.address1} onChange={handleChange} placeholder='Address' />
          <div>City</div>
          <input className='patient_title_dropdown_big' name='city' value={formState.city} onChange={handleChange} placeholder='City' />
          <div className='users_address2'>
            <div>
              <div>States</div>
              <select className='patient_title_dropdown_state' name='state' value={formState.state} onChange={handleChange}>
                {states.map((state, index) => (
                  <option value={state.Name} key={index}>
                    {state.Name}
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
          <input className='doctor_title_dropdown_big' name='Email' value={formState.Email} onChange={handleChange} placeholder='Email' />

          <div>Mobile</div>
          <input className='patient_title_dropdown_big' name='mobile' value={formState.mobile} onChange={handleChange} placeholder='Mobile' />
        </div>
        <section>
          <div className='users_verificaiton'>
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
                  <option value={language.Name} key={index}>
                    {language.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='doctor_locations_list'>
            <div>Doctors</div>
            {/* <button className='button-classic button-classic-doctors-add' type='button'>
              Add
            </button> */}
          </div>
          <div className='users_list_box'>
            {doctors.map((doctor, index) => (
              <div key={index}>
                <label>
                  <input type='checkbox' checked={selectedDoctors.includes(doctor.UserId)} onChange={() => handleCheckChange(doctor.UserId)} />
                  {doctor.Title} {doctor.FirstName} {doctor.LastName}
                </label>
              </div>
            ))}
          </div>
        </section>
        <button className='button-general button-general-patient-send' type='submit'>
          Send Invite
        </button>
        <div className='button-general-patient-container '>
          <Link to='/'>
            <button className='button-general button-general-patient-cancel' type='button'>
              Cancel
            </button>
          </Link>
          <button className='button-general button-general-patient-save' type='submit'>
            {user ? 'Save' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PatientPage
