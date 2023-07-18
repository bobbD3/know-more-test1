import React, { useState } from 'react'
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
import LibrariesContext from './contexts/LibrariesContext'
import { UsersProvider } from './contexts/UserContext'
import { VideosProvider } from './contexts/VideosContext'
import { HospitalsProvider } from './contexts/HospitalsContext'
import dummyLibraries from './data/libraries'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [libraries, setLibraries] = useState(dummyLibraries)

  const handleLogin = () => {
    setLoggedIn(true)
  }

  return (
    <Router>
      <div>
        <NavBar />
        <LibrariesContext.Provider value={{ libraries, setLibraries }}>
          <HospitalsProvider>
            <VideosProvider>
              <UsersProvider>
                <Routes>
                  {!loggedIn ? (
                    <Route path='/' element={<LoginForm onLogin={handleLogin} />} />
                  ) : (
                    <>
                      <Route path='/users' element={<UsersPage />} />
                      <Route path='/company' element={<CompanyPage />} />
                      <Route path='/videos' element={<VideosPage />} />
                      <Route path='/libraries' element={<LibrariesPage />} />
                      <Route path='/edit-user' element={<EditUserPage />} />
                      <Route path='/edit-user/:id' element={<EditUserPage />} />
                      <Route path='/add-company' element={<EditCompanyPage />} />
                      <Route path='/edit-company/:id' element={<EditCompanyPage />} />
                      <Route path='/edit-video' element={<EditVideoPage />} />
                      <Route path='/edit-video/:id' element={<EditVideoPage />} />
                      <Route path='/edit-library' element={<EditLibraryPage />} />
                      <Route path='/edit-library/:id' element={<EditLibraryPage />} />
                      <Route path='/add-patient' element={<PatientPage />} />
                      <Route path='/add-doctors' element={<DoctorsPage />} />
                    </>
                  )}
                </Routes>
              </UsersProvider>
            </VideosProvider>
          </HospitalsProvider>
        </LibrariesContext.Provider>
      </div>
    </Router>
  )
}

export default App
