import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { HospitalsContext } from '../contexts/HospitalsContext'

const EditCompanyPage = () => {
  const { hospitals, updateHospital } = useContext(HospitalsContext)
  const [locationName, setLocationName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [phone, setPhone] = useState('')
  const [state, setState] = useState('')
  const [selectedDoctors, setSelectedDoctors] = useState([])
  const [selectedPatients, setSelectedPatients] = useState([])

  const navigate = useNavigate()
  // Get the id from the URL
  let { id } = useParams()
  id = parseInt(id)

  // Run this effect when the component mounts and whenever the id changes
  useEffect(() => {
    // Find the corresponding hospital
    const hospital = hospitals.find(h => h.id === id)

    // If the hospital exists, update the state
    if (hospital) {
      setLocationName(hospital.name)
      setAddress(hospital.address1)
      setPhone(hospital.mobile)
    }
  }, [id, hospitals])

  const doctors = [
    { id: 1, name: 'Doctor 1' },
    { id: 2, name: 'Doctor 2' },
    { id: 3, name: 'Doctor 3' }
    // Add more doctors as needed
  ]

  const patients = [
    { id: 1, name: 'Patient 1' },
    { id: 2, name: 'Patient 2' },
    { id: 3, name: 'Patient 3' }
    // Add more patients as needed
  ]

  const handleFormSubmit = event => {
    event.preventDefault()

    const updatedHospital = {
      id,
      name: locationName,
      address1: address,
      mobile: phone,
      city,
      zip,
      state,
      doctors: selectedDoctors,
      patients: selectedPatients
      // add other fields here as necessary
    }

    updateHospital(updatedHospital)

    navigate('/company')
  }

  const handleDoctorCheckboxChange = doctorId => {
    setSelectedDoctors(prevSelectedDoctors => {
      if (prevSelectedDoctors.includes(doctorId)) {
        return prevSelectedDoctors.filter(id => id !== doctorId)
      } else {
        return [...prevSelectedDoctors, doctorId]
      }
    })
  }

  const handlePatientCheckboxChange = patientId => {
    setSelectedPatients(prevSelectedPatients => {
      if (prevSelectedPatients.includes(patientId)) {
        return prevSelectedPatients.filter(id => id !== patientId)
      } else {
        return [...prevSelectedPatients, patientId]
      }
    })
  }

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
              <select className='company_title_dropdown_state' name='state' value={state} onChange={event => setState(event.target.value)}>
                <option value=''>Select State</option>
                <option value='Alabama'>Alabama</option>
                <option value='Alaska'>Alaska</option>
                {/* Add more state options as needed */}
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
              <div key={doctor.id}>
                <label>
                  <input type='checkbox' checked={selectedDoctors.includes(doctor.id)} onChange={() => handleDoctorCheckboxChange(doctor.id)} />
                  {doctor.name}
                </label>
              </div>
            ))}
          </div>

          {/* Patients Information */}
          <div>Patients Information</div>
          <div className='company_form_patient_checkboxes'>
            {patients.map(patient => (
              <div key={patient.id}>
                <label>
                  <input type='checkbox' checked={selectedPatients.includes(patient.id)} onChange={() => handlePatientCheckboxChange(patient.id)} />
                  {patient.name}
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
            <button className='button-general position-company-save' type='submit'>
              {id ? 'Save' : 'Create'}
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default EditCompanyPage
