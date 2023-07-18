import React, { useState, useEffect, useContext, useRef } from 'react'
import ReactModal from 'react-modal'
import LibrariesContext from '../contexts/LibrariesContext'
import VideosContext from '../contexts/VideosContext'
import useEmblaCarousel from 'embla-carousel-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Carousel from './Carousel'

ReactModal.setAppElement('#root')

const EditLibraryPage = () => {
  const { libraries, setLibraries } = useContext(LibrariesContext)
  const { videos: contextVideos } = useContext(VideosContext)
  const { id } = useParams()
  const navigate = useNavigate()
  /* eslint-disable */
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, slidesToScroll: 1 })
  const emblaApiRef = useRef(emblaApi)
  const [libraryName, setLibraryName] = useState('')
  const [videoPackages, setVideoPackages] = useState([[]])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currentPackageIndex, setCurrentPackageIndex] = useState(0) // index of the current package for adding videos

  useEffect(() => {
    emblaApiRef.current = emblaApi
  }, [emblaApi])

  useEffect(() => {
    if (emblaApiRef.current) {
      emblaApiRef.current.reInit()
    }
  }, [videoPackages])

  useEffect(() => {
    if (id) {
      const numericId = Number(id) // convert the id from string to number
      const library = libraries.find(library => library.id === numericId) // changed here

      if (library && library.videoPackages) {
        // ensure that videoPackages exists
        setLibraryName(library.library)
        const libraryVideoPackages = library.videoPackages.map(videoIds => (videoIds ? contextVideos.filter(video => videoIds.includes(video.id)) : [])) // ensure that videoIds exists
        setVideoPackages(libraryVideoPackages)
      }
    }
  }, [id, libraries, contextVideos])

  const handleSave = () => {
    const numericId = Number(id) // convert the id from string to number
    const newLibrary = {
      id: numericId || libraries.length + 1,
      library: libraryName,
      videoPackages: videoPackages.map(videoPackage => videoPackage.map(v => v.id))
    }

    if (numericId) {
      setLibraries(libraries.map(library => (library.id === numericId ? newLibrary : library))) // changed here
    } else {
      setLibraries(prevLibraries => [...prevLibraries, newLibrary])
    }

    navigate('/libraries')
  }

  const handleAddVideo = video => {
    if (!videoPackages[currentPackageIndex].find(v => v.id === video.id)) {
      setVideoPackages(prevVideoPackages => prevVideoPackages.map((videoPackage, i) => (i === currentPackageIndex ? [...videoPackage, video] : videoPackage)))
      setModalIsOpen(false)
    }
  }

  const handleAddPackage = () => {
    setVideoPackages(prevVideoPackages => [...prevVideoPackages, []]) // add a new empty package
    setCurrentPackageIndex(prevIndex => prevIndex + 1) // increment the current package index
  }

  return (
    <div className='library-edit-add-container'>
      {/* <h2>{id ? 'Edit' : 'Add'} Library</h2> */}
      <div className='library-edit-label'>
        <label>Library Name:</label>
        <input type='text' value={libraryName} onChange={event => setLibraryName(event.target.value)} />
      </div>
      <button className='button-classic button-edit-library-add' onClick={handleAddPackage}>
        Add Package
      </button>
      <div className='videos-container'>
        {videoPackages.map((videoPackage, packageIndex) => (
          <div key={packageIndex}>
            <div className='library-edit-label-package'>
              <div>Name of Package</div>
              <div>
                <button
                  className='button-classic'
                  onClick={() => {
                    setCurrentPackageIndex(packageIndex)
                    setModalIsOpen(true)
                  }}
                >
                  Add Video
                </button>
              </div>
            </div>
            <Carousel>
              {videoPackage.map((video, index) => (
                <div className='embla__slide' key={index} style={{ backgroundImage: `url(${video.languages[0].thumbnail})` }}>
                  {' '}
                  <div className='embla__slide__inner'>
                    <div className='embla__slide__content'>
                      {video.videoName}
                      <button className='button-classic ' onClick={() => setVideoPackages(prevVideoPackages => prevVideoPackages.map((vp, i) => (i === packageIndex ? vp.filter((_, vi) => vi !== index) : vp)))}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        ))}
      </div>
      <button className='button-general button-general-library-send' onClick={handleSave}>
        Save
      </button>
      <Link to='/libraries'>
        <button className='button-general' type='button'>
          Cancel
        </button>
      </Link>
      <ReactModal isOpen={modalIsOpen}>
        <h2>Select a Video</h2>
        <div className='modal-library-add-video-container'>
          {contextVideos.map(video => (
            <div
              key={video.id}
              className='video-thumbnail-container-modal'
              style={{
                backgroundImage: `url(${video.languages[0].thumbnail})`,
                width: '200px',
                height: '150px'
              }}
            >
              <button className='button-classic library-add-video-button' onClick={() => handleAddVideo(video)}>
                {video.videoName}
              </button>
            </div>
          ))}
        </div>
        <button className='button-general' onClick={() => setModalIsOpen(false)}>
          Close
        </button>
      </ReactModal>
    </div>
  )
}

export default EditLibraryPage
