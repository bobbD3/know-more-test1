import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UsersContext } from '../contexts/UserContext'
import { HospitalsContext } from '../contexts/HospitalsContext'

const initialFormState = {
  id: Date.now(),
  title: '',
  firstName: '',
  lastName: '',
  role: 2,
  address1: '',
  city: '',
  state: '',
  zip: '',
  Email: '',
  mobile: '',
  confirmPolicy: 'No',
  language: 'English'
}

console.log(initialFormState)
const titles = ['Mr', 'Ms', 'Dr']
const confirmationOptions = ['Yes', 'No']
const library = ['New Library 1	', 'New Library 2', 'New Library 3']

const DoctorPage = () => {
  const { hospitals } = useContext(HospitalsContext)
  const { users, states, languages, roles, manageUser, fetchUsers } = useContext(UsersContext)
  const [formState, setFormState] = useState({
    ...initialFormState,
    state: states.length > 0 ? states[0].Name : '',
    language: languages.length > 0 ? languages[0].Name : ''
  })
  const [selectedHospitals, setSelectedHospitals] = useState([])
  const navigate = useNavigate()

  const { UserId } = useParams()
  const user = users.find(user => user.UserId === Number(UserId))
  // Fetch the user's data when the page loads

  useEffect(() => {
    if (user) {
      const roleExists = roles.some(role => role.RoleId === user.RoleId)
      console.log(roleExists)
      const role = roleExists ? user.RoleId : roles[0]?.RoleId || ''
      console.log(role)

      setFormState({
        UserId: user.UserId, // only on update
        title: user.Title,
        firstName: user.FirstName,
        lastName: user.LastName,
        role: role,
        address1: user.Address,
        city: user.City,
        state: user.State,
        zip: user.Zip,
        Email: user.Email,
        mobile: user.MobilePhone,
        confirmPolicy: user.AcceptedTerms === 1 ? 'Yes' : 'No',
        language: user.Language,
        SSOID: user.SSOID
      })

      setSelectedHospitals(user.OrganizationIds || [])
    }
  }, [user, roles])

  const handleCheckChangeHospital = hospitalsId => {
    setSelectedHospitals(prevState => {
      if (prevState.includes(hospitalsId)) {
        return prevState.filter(id => id !== hospitalsId)
      } else {
        return [...prevState, hospitalsId]
      }
    })
  }

  const handleChange = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const role = roles.find(role => role.RoleId === formState.role)
    const language = languages.find(lang => lang.Name === formState.language)
    const state = states.find(state => state.Name === formState.state)

    const userData = {
      UserId: formState.UserId,
      RoleId: role?.RoleId,
      LanguageId: language?.Id || 1,
      AcceptedTerms: formState.confirmPolicy === 'Yes' ? 1 : 0,
      FirstName: formState.firstName,
      LastName: formState.lastName,
      Email: formState.Email,
      MobilePhone: formState.mobile,
      Address: formState.address1,
      City: formState.city,
      StateId: state?.Id,
      Zip: formState.zip,
      OrganizationIds: selectedHospitals,
      LibraryIds: []
    }

    if (user) {
      // update existing user
      await manageUser(userData)
      console.log(userData)
    } else {
      // add new user
      await manageUser({ ...userData })
    }

    console.log(userData)
    fetchUsers() // Ensures that this function always runs after manageUser
    setFormState(initialFormState)
    navigate('/')
  }

  return (
    <div>
      <form className='doctorForm' onSubmit={handleSubmit}>
        <div>
          <div>Title:</div>
          <select className='doctor_title_dropdown_title' name='title' value={formState.title} onChange={handleChange}>
            {titles.map((title, index) => (
              <option value={title} key={index}>
                {title}
              </option>
            ))}
          </select>
          <div className=''>First Name</div>
          <input className='doctor_title_dropdown_big' name='firstName' value={formState.firstName} onChange={handleChange} placeholder='First Name' />
          <div>Last Name</div>
          <input className='doctor_title_dropdown_big' name='lastName' value={formState.lastName} onChange={handleChange} placeholder='Last Name' />
          <div>Role: {roles.find(role => role.SystemCode === 'PHY')?.Name}</div>
          <div>Address</div>
          <input className='doctor_title_dropdown_big' name='address1' value={formState.address1} onChange={handleChange} placeholder='Address' />
          <div>City</div>
          <input className='doctor_title_dropdown_big' name='city' value={formState.city} onChange={handleChange} placeholder='City' />
          <div className='users_address2'>
            <div>
              <div>States</div>
              <select className='doctor_title_dropdown_state' name='state' value={formState.state} onChange={handleChange}>
                {states.map((state, index) => (
                  <option value={state.Name} key={index}>
                    {state.Name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div>Zip</div>
              <input className='doctor_title_dropdown_zip' name='zip' value={formState.zip} onChange={handleChange} placeholder='Zip' />
            </div>
          </div>

          <div>Email</div>
          <input className='doctor_title_dropdown_big' name='Email' value={formState.Email} onChange={handleChange} placeholder='Email' />

          <div>Mobile</div>
          <input className='doctor_title_dropdown_big' name='mobile' value={formState.mobile} onChange={handleChange} placeholder='Mobile' />
        </div>
        <section>
          <div className='users_verificaiton'>
            <div>
              <div>Accepted Terms</div>
              <select className='doctor_dropdown_terms' name='confirmPolicy' value={formState.confirmPolicy} onChange={handleChange}>
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
            <div>Organization</div>
          </div>
          <div className='users_list_box'>
            {hospitals.map((hospital, index) => (
              <div key={index}>
                <label>
                  <input type='checkbox' checked={selectedHospitals.includes(hospital.OrganizationId)} onChange={() => handleCheckChangeHospital(hospital.OrganizationId)} />
                  {hospital.Name} {hospital.Address}
                </label>
              </div>
            ))}
          </div>
          <div className='doctor_library'>Library</div>
          <select className='doctor_title_dropdown_library' name='title' value={formState.library} onChange={handleChange}>
            {library.map((library, index) => (
              <option value={library} key={index}>
                {library}
              </option>
            ))}
          </select>
        </section>

        <button className='button-general ' type='submit'>
          Send Invite
        </button>
        <div className='button-general-doctor-container'>
          <Link to='/'>
            <button className='button-general position-doctor-cancel' type='button'>
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

export default DoctorPage
