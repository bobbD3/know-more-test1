import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import LibrariesContext from '../contexts/LibrariesContext'

const LibrariesPage = () => {
  const { libraries, setLibraries } = useContext(LibrariesContext)
  const removeLibrary = id => {
    setLibraries(libraries.filter(library => library.id !== id))
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Program Packages</th>
          </tr>
        </thead>
        <tbody>
          {libraries.map(library => {
            return (
              <tr className='library_td_possition' key={library.id}>
                <td>{library.library}</td>
                <td className='library_add_button_possition_edit'>
                  <Link to={`/edit-library/${library.id}`}>
                    <button className='button-classic'>Edit Package</button>
                  </Link>
                </td>
                <td className='library_add_button_possition_remove'>
                  <button className='button-classic' onClick={() => removeLibrary(library.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <Link to={`/edit-library`}>
          <button className='button-general video-add-button-possition'>Add Package</button>
        </Link>
      </div>
    </div>
  )
}

export default LibrariesPage
