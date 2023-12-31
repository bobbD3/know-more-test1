import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar/NavBar'
import UsersPage from './components/UsersPage'
import CompanyPage from './components/CompanyPage'
import VideosPage from './components/VideosPage'
import LibrariesPage from './components/LibrariesPage'
import EditUserPage from './components/EditUserPage'
import EditCompanyPage from './components/EditCompanyPage'
import EditVideoPage from './components/EditVideoPage'
import EditLibraryPage from './components/EditLibraryPage'
import DoctorsPage from './components/DoctorsPage'
import PatientPage from './components/PatientPage'
import { LibrariesProvider } from './contexts/LibrariesContext'
import { UsersProvider } from './contexts/UserContext'
import { VideosProvider } from './contexts/VideosContext'
import { HospitalsProvider } from './contexts/HospitalsContext'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true') // Check initial login status from local storage

  useEffect(() => {
    localStorage.setItem('isLoggedIn', loggedIn)
  }, [loggedIn])

  const handleLogin = () => {
    setLoggedIn(true)
  }

  return (
    <Router>
      <div>
        <NavBar />
        <LibrariesProvider>
          <HospitalsProvider>
            <VideosProvider>
              <UsersProvider>
                <Routes>
                  {!loggedIn ? (
                    <Route path='/login' element={<LoginForm onLogin={handleLogin} />} />
                  ) : (
                    <>
                      <Route path='/' element={<UsersPage />} />
                      <Route path='/company' element={<CompanyPage />} />
                      <Route path='/videos' element={<VideosPage />} />
                      <Route path='/libraries' element={<LibrariesPage />} />
                      <Route path='/edit-user' element={<EditUserPage />} />
                      <Route path='/edit-user/:id' element={<EditUserPage />} />
                      <Route path='/add-company' element={<EditCompanyPage />} />
                      <Route path='/edit-company/:OrganizationId' element={<EditCompanyPage />} />
                      <Route path='/edit-video' element={<EditVideoPage />} />
                      <Route path='/edit-video/:id?' element={<EditVideoPage />} />
                      <Route path='/edit-library' element={<EditLibraryPage />} />
                      <Route path='/edit-library/:id?' element={<EditLibraryPage />} />
                      <Route path='/add-patient/' element={<PatientPage />} />
                      <Route path='/add-patient/:UserId' element={<PatientPage />} />
                      <Route path='/add-doctors/' element={<DoctorsPage />} />
                      <Route path='/add-doctors/:UserId' element={<DoctorsPage />} />
                    </>
                  )}
                </Routes>
              </UsersProvider>
            </VideosProvider>
          </HospitalsProvider>
        </LibrariesProvider>
      </div>
    </Router>
  )
}

export default App
