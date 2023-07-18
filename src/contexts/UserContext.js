import React, { createContext, useState } from 'react'
import dummyUsers from '../data/data'

export const UsersContext = createContext()

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(dummyUsers)

  return <UsersContext.Provider value={{ users, setUsers }}>{children}</UsersContext.Provider>
}
