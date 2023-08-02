import React, { createContext, useState } from 'react'
import dummyLibraries from '../data/libraries'

const LibrariesContext = createContext()

export const LibrariesProvider = ({ children }) => {
  const [libraries, setLibraries] = useState(dummyLibraries)

  return <LibrariesContext.Provider value={{ libraries, setLibraries }}>{children}</LibrariesContext.Provider>
}

export default LibrariesContext
