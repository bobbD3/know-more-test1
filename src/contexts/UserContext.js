import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const UsersContext = createContext()

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [states, setStates] = useState([])
  const [languages, setLanguages] = useState([])
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [titles, setTitles] = useState([])

  const API_BASE_URL = 'https://knowmoreapp.azurewebsites.net/api-noauth/execute-sp/'

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${API_BASE_URL}3c2752f5-d6f9-4557-af70-e9932b5ffe40`, {})
      setUsers(response.data)
      setLoading(false)
    } catch (error) {
      console.log('Error fetching users: ', error)
      setLoading(false)
    }
  }

  const fetchStates = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}fcc47dba-168b-4c6e-a10c-cdf7e9819391`, {})
      setStates(response.data)
    } catch (error) {
      console.log('Error fetching States: ', error)
    }
  }

  const fetchLanguages = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}d44bcd9d-94a6-41e9-8fe4-fa0b4a46529c`, {})
      setLanguages(response.data)
    } catch (error) {
      console.log('Error fetching Languages: ', error)
    }
  }

  const fetchRoles = async () => {
    // New fetch function for roles
    try {
      const response = await axios.post(`${API_BASE_URL}5754d4c3-161b-485f-80e8-8d3533684905`, {})
      setRoles(response.data)
    } catch (error) {
      console.log('Error fetching Roles: ', error)
    }
  }
  const fetchTitles = async () => {
    // New fetch function for roles
    try {
      const response = await axios.post(`${API_BASE_URL}5754d4c3-161b-485f-80e8-8d3533684905`, {})
      setTitles(response.data)
    } catch (error) {
      console.log('Error fetching Roles: ', error)
    }
  }

  const deleteUser = async UserId => {
    try {
      await axios.post(`${API_BASE_URL}9687cbd0-86e9-421b-be4f-e3a56922741c`, { UserId: UserId })
      setUsers(users.filter(user => user.UserId !== UserId))
      fetchUsers()
    } catch (error) {
      console.log('Error DeleteUser: ', error)
    }
  }

  const manageUser = async userData => {
    try {
      await axios.post(`${API_BASE_URL}da58acad-90ee-4e56-8757-106c9a96f71e`, userData)
      fetchUsers() // Fetch users to update the local state after change
    } catch (error) {
      console.log('Error Manage User: ', error)
    }
  }

  useEffect(() => {
    fetchUsers()
    fetchStates()
    fetchLanguages()
    fetchRoles()
  }, [])

  return <UsersContext.Provider value={{ users, titles, loading, deleteUser, manageUser, states, languages, roles, fetchUsers }}>{children}</UsersContext.Provider>
}
