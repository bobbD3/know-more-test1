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
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {libraries.map(library => {
            return (
              <tr className='library-td-possition' key={library.id}>
                <td>{library.library}</td>
                <td className='user-add-button-possition-edit'>
                  <Link to={`/edit-library/${library.id}`}>
                    <button className='button-classic'>Edit</button>
                  </Link>
                </td>
                <td className='user-add-button-possition-remove'>
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
          <button className='button-general user-add-button-possition'>Add</button>
        </Link>
      </div>
    </div>
  )
}

export default LibrariesPage
