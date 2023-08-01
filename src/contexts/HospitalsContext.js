import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const HospitalsContext = createContext()

export const HospitalsProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState([])
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDoctors, setSelectedDoctors] = useState([])
  const [selectedPatients, setSelectedPatients] = useState([])

  const API_BASE_URL = 'https://knowmoreapp.azurewebsites.net/api-noauth/execute-sp/'

  const fetchHospitals = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${API_BASE_URL}2efb3572-f15e-45be-8ef0-dbe9c9273529`, {})
      setHospitals(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDoctors = async () => {
    const response = await axios.post(`${API_BASE_URL}3b84f65e-1484-49d8-a86d-495652c29ebe`, {})
    setDoctors(response.data)
  }

  const fetchPatients = async () => {
    const response = await axios.post(`${API_BASE_URL}05375051-0405-4de4-8ad7-f0d0436b958c`, {})
    setPatients(response.data)
  }

  const deleteHospital = async id => {
    console.log(+id)
    try {
      await axios.post(`${API_BASE_URL}d9c0ef89-7997-4617-9961-cd1ca7aa9aaf`, { OrganizationId: +id })

      setHospitals(hospitals.filter(hospital => hospital.OrganizationId !== id))
      fetchHospitals()
    } catch (error) {
      console.log(error)
    }
  }

  const manageOrganization = async organizationData => {
    const response = await axios.post(`${API_BASE_URL}7fe67bd7-9f90-44c2-91b8-22415b253ce6`, organizationData)

    const updatedOrganization = response.data
    // If OrganizationId exists, update the hospital
    if (organizationData.OrganizationId) {
      setHospitals(hospitals.map(hospital => (hospital.OrganizationId === organizationData.OrganizationId ? updatedOrganization : hospital)))
    } else {
      // If OrganizationId doesn't exist, add the new hospital
      setHospitals([...hospitals, updatedOrganization])
    }
  }

  const handleDoctorSelection = doctorId => {
    setSelectedDoctors(prevSelectedDoctors => {
      if (prevSelectedDoctors.includes(doctorId)) {
        return prevSelectedDoctors.filter(Id => Id !== doctorId)
      } else {
        return [...prevSelectedDoctors, doctorId]
      }
    })
  }

  const handlePatientSelection = patientId => {
    setSelectedPatients(prevSelectedPatients => {
      if (prevSelectedPatients.includes(patientId)) {
        return prevSelectedPatients.filter(Id => Id !== patientId)
      } else {
        return [...prevSelectedPatients, patientId]
      }
    })
  }

  useEffect(() => {
    fetchHospitals()
    fetchDoctors()
    fetchPatients()
  }, [])

  return <HospitalsContext.Provider value={{ hospitals, loading, deleteHospital, manageOrganization, doctors, patients, selectedDoctors, selectedPatients, handleDoctorSelection, handlePatientSelection }}>{children}</HospitalsContext.Provider>
}
