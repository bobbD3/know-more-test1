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
      const numericId = Number(id)
      const library = libraries.find(library => library.id === numericId)

      if (library && library.videoPackages) {
        setLibraryName(library.library)
        const libraryVideoPackages = library.videoPackages.map(videoIds => (videoIds ? videoIds.map(videoId => contextVideos.find(video => video.id === videoId)) : []))
        setVideoPackages(libraryVideoPackages)
      }
    }
  }, [id, libraries, contextVideos])

  useEffect(() => {
    if (emblaApiRef.current) {
      emblaApiRef.current.reInit()
    }
  }, [videoPackages])

  useEffect(() => {
    emblaApiRef.current = emblaApi
    if (emblaApi) {
      emblaApi.reInit()
    }
  }, [emblaApi])

  const handleSave = () => {
    const numericId = Number(id) // convert the id from string to number

    const newLibrary = {
      id: numericId || libraries.length + 1,
      library: libraryName,
      videoPackages: videoPackages.map(videoPackage => videoPackage.map(v => v.id))
    }

    if (numericId) {
      setLibraries(libraries.map(library => (library.id === numericId ? newLibrary : library))) // changed here
      console.log(libraries)
    } else {
      setLibraries(prevLibraries => [...prevLibraries, newLibrary])
      console.log(libraries)
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
    setVideoPackages(prevVideoPackages => [...prevVideoPackages, []])
    setCurrentPackageIndex(prevIndex => prevIndex + 1)
  }

  const handleDragEnd = result => {
    if (!result.destination || !result.source) {
      return
    }

    const { source, destination } = result

    setVideoPackages(prev => {
      const newVideoPackages = [...prev]
      const sourcePackageIndex = parseInt(source.droppableId.replace('carousel-', ''), 10)
      const destinationPackageIndex = parseInt(destination.droppableId.replace('carousel-', ''), 10)

      // Make sure both source and destination packages exist before performing operations
      if (newVideoPackages[sourcePackageIndex] && newVideoPackages[destinationPackageIndex]) {
        const [removed] = newVideoPackages[sourcePackageIndex].splice(source.index, 1)
        newVideoPackages[destinationPackageIndex].splice(destination.index, 0, removed)
      }

      return newVideoPackages
    })
  }

  return (
    <div className='library_edit_add_container'>
      {/* <h2>{id ? 'Edit' : 'Add'} Library</h2> */}
      <div className='library-edit-label'>
        <label>Program Package Name:</label>
        <input type='text' value={libraryName} onChange={event => setLibraryName(event.target.value)} />
      </div>
      <button className='button-classic button-edit-library-add' onClick={handleAddPackage}>
        Add Category
      </button>
      <div className='videos_container'>
        {videoPackages.map((videoPackage, packageIndex) => (
          <div key={packageIndex}>
            <div className='library_edit_label_package'>
              <div>
                <input type='text' placeholder='Name your category' />
              </div>
              <div>
                <button
                  className='button-classic'
                  onClick={() => {
                    setCurrentPackageIndex(packageIndex)
                    setModalIsOpen(true)
                  }}
                >
                  Add Program
                </button>
              </div>
            </div>
            <Carousel onDragEnd={handleDragEnd} droppableId={`carousel-${packageIndex}`}>
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
      <Link to='/libraries'>
        <button className='button-general button-general-library-send' type='button'>
          Cancel
        </button>
      </Link>
      <button className='button-general' onClick={handleSave}>
        {id ? 'Save' : 'Create'}
      </button>
      <ReactModal isOpen={modalIsOpen}>
        <h2>Select a Program</h2>
        <div className='modal_library_add_video_container'>
          {contextVideos.map(video => (
            <div
              key={video.id}
              className='video_thumbnail_container_modal'
              style={{
                backgroundImage: `url(${video.languages[0].thumbnail})`,
                width: '200px',
                height: '150px'
              }}
            >
              <button className='button-classic library-add-video-button' onClick={() => handleAddVideo(video)}>
                Add
              </button>
              <div>{video.videoName}</div>
            </div>
          ))}
        </div>
        <button className='button-general button-general-library-close' onClick={() => setModalIsOpen(false)}>
          Close
        </button>
      </ReactModal>
    </div>
  )
}

export default EditLibraryPage
