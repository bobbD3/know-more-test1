import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { HospitalsContext } from '../contexts/HospitalsContext'
import { UsersContext } from '../contexts/UserContext'

const EditCompanyPage = () => {
  const { hospitals, manageOrganization, doctors, patients, selectedDoctors, selectedPatients, handleDoctorSelection, handlePatientSelection } = useContext(HospitalsContext)
  const { states } = useContext(UsersContext)

  const [locationName, setLocationName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedStateId, setSelectedStateId] = useState(null)

  const navigate = useNavigate()
  // Get the id from the URL
  let { OrganizationId } = useParams()

  // Run this effect when the component mounts and whenever the Id changes
  useEffect(() => {
    // Find the corresponding hospital
    const hospital = hospitals.find(h => h?.OrganizationId === Number(OrganizationId))

    if (hospital) {
      // If the hospital exists, update the state
      setLocationName(hospital.Name || '')
      setAddress(hospital.Address || '')
      setPhone(hospital.Phone || '')
      setCity(hospital.City || '')
      setZip(hospital.Zip || '')
    } else {
      // If the hospital does not exist, reset all fields to their default values
      setLocationName('')
      setAddress('')
      setPhone('')
      setCity('')
      setZip('')
    }
  }, [OrganizationId, hospitals])

  const handleFormSubmit = event => {
    event.preventDefault()

    const organizationData = {
      Name: locationName,
      Phone: phone,
      Address: address,
      City: city,
      StateId: selectedStateId,
      Zip: zip,
      DoctorIds: selectedDoctors,
      PatientIds: selectedPatients
    }

    console.log(`It is working!`)
    // Include the OrganizationId only if Id is defined
    if (OrganizationId) {
      organizationData.OrganizationId = OrganizationId
    }

    console.log(organizationData)
    manageOrganization(organizationData)
    navigate('/company')
  }

  const handleDoctorCheckboxChange = doctorId => {
    handleDoctorSelection(doctorId)
  }

  const handlePatientCheckboxChange = patientId => {
    handlePatientSelection(patientId)
  }
  if (!hospitals) return <div>Loading...</div>

  return (
    <div>
      <form className='company_form' onSubmit={handleFormSubmit}>
        <div>
          <div>Organization Name</div>
          <input className='company_title_dropdown_big' type='text' name='locationName' value={locationName} onChange={event => setLocationName(event.target.value)} placeholder='Location Name' />

          <div>Address</div>
          <input className='company_title_dropdown_big' type='text' name='address' value={address} onChange={event => setAddress(event.target.value)} placeholder='Address' />

          <div>City</div>
          <input className='company_title_dropdown_big' type='text' name='city' value={city} onChange={event => setCity(event.target.value)} placeholder='City' />

          <div className='company_form_dropdown_state'>
            <div>
              <div>State</div>
              <select
                className='company_title_dropdown_state'
                onChange={event => {
                  const selectedState = states.find(state => state.Name === event.target.value)
                  setSelectedStateId(selectedState)
                }}
              >
                {' '}
                {states.map((state, index) => (
                  <option value={state.Name} key={index}>
                    {state.Name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div>Zip</div>
              <input className='company_title_dropdown_zip' type='text' name='zip' value={zip} onChange={event => setZip(event.target.value)} placeholder='Zip' />
            </div>
          </div>

          <div>Phone</div>
          <input className='company_title_dropdown_big' type='text' name='phone' value={phone} onChange={event => setPhone(event.target.value)} placeholder='Phone' />
        </div>
        <div>
          {/* Additional boxes for doctors and patients information */}
          {/* Doctors Information */}
          <div>Doctors Information</div>
          <div className='company_form_doctor_checkboxes'>
            {doctors.map(doctor => (
              <div key={doctor.Id}>
                <label>
                  <input type='checkbox' checked={selectedDoctors.includes(doctor.Id)} onChange={() => handleDoctorCheckboxChange(doctor.Id)} />
                  {`${doctor.FirstName} ${doctor.LastName}`}
                </label>
              </div>
            ))}
          </div>

          {/* Patients Information */}
          <div>Patients Information</div>
          <div className='company_form_patient_checkboxes'>
            {patients.map(patient => (
              <div key={patient.Id}>
                <label>
                  <input type='checkbox' checked={selectedPatients.includes(patient.Id)} onChange={() => handlePatientCheckboxChange(patient.Id)} />
                  {`${patient.FirstName} ${patient.LastName}`}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div> </div>
        <div className='company_form_buttons'>
          <Link to='/company'>
            <button className='button-general position-company-cancel' type='button'>
              Cancel
            </button>
          </Link>
          <button className='button-general position-company-save' type='submit'>
            {OrganizationId ? 'Save' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCompanyPage
