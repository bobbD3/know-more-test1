import React, { createContext, useState, useEffect } from 'react'

export const UsersContext = createContext()

const API_BASE_URL = 'https://knowmoreapp.azurewebsites.net/api-noauth/execute-sp/'

const getUrlWithId = id => `${API_BASE_URL}${id}`

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // generate URL with ID
    const url = getUrlWithId('3c2752f5-d6f9-4557-af70-e9932b5ffe40')

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
      // body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error))
  }, [])

  return <UsersContext.Provider value={{ users, setUsers }}>{children}</UsersContext.Provider>
}
