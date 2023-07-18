// import React, { createContext, useState } from 'react'
// import dummyHospitals from '../data/hospitals'

// export const HospitalsContext = createContext()

// export const HospitalsProvider = ({ children }) => {
//   const [hospitals, setHospitals] = useState(dummyHospitals)

//   return <HospitalsContext.Provider value={{ hospitals, setHospitals }}>{children}</HospitalsContext.Provider>
// }

import { createContext, useState } from 'react'
import dummyHospitals from '../data/hospitals'

export const HospitalsContext = createContext()

export const HospitalsProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState(dummyHospitals)

  const updateHospital = updatedHospital => {
    setHospitals(hospitals.map(hospital => (hospital.id === updatedHospital.id ? updatedHospital : hospital)))
  }

  return <HospitalsContext.Provider value={{ hospitals, updateHospital }}>{children}</HospitalsContext.Provider>
}
