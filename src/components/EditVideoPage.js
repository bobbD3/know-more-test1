import React, { useState, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import VideosContext from '../contexts/VideosContext'

const VideoAddEditPage = () => {
  const { videos, setVideos } = useContext(VideosContext)
  const { id } = useParams()
  const isEditing = id !== undefined
  const videoToEdit = isEditing ? videos.find(video => video.id === Number(id)) : null

  const [videoName, setVideoName] = useState(isEditing ? videoToEdit.videoName : '')
  const [prescribed, setPrescribed] = useState(isEditing ? videoToEdit.prescribed : false)
  const [languages, setLanguages] = useState(isEditing ? videoToEdit.languages || [] : [{ thumbnail: null, videoFile: null, language: '', videoURL: '', status: 'Uploading' }])

  const navigate = useNavigate()

  const handleInputChange = (event, index) => {
    const newLanguages = languages.slice() // Copy the languages array
    newLanguages[index][event.target.name] = event.target.value // Update the specific field
    setLanguages(newLanguages)
  }

  const handleFileChange = (event, index, type) => {
    const newLanguages = languages.slice() // Copy the languages array
    newLanguages[index][type] = event.target.files[0] // Update the specific field
    newLanguages[index][type + 'Name'] = event.target.files[0] ? event.target.files[0].name : '' // Store the name of the file
    setLanguages(newLanguages)
  }

  const addLanguage = () => {
    setLanguages([
      ...languages,
      {
        thumbnail: null,
        videoFile: null,
        language: '',
        videoURL: '',
        status: 'Uploading'
      }
    ])
  }

  // const removeLanguage = index => {
  //   setLanguages(languages.filter((_, i) => i !== index))
  // }

  const handleFormSubmit = event => {
    event.preventDefault()

    const newVideo = {
      id: isEditing ? videoToEdit.id : videos.length + 1,
      videoName,
      prescribed,
      languages
    }

    if (isEditing) {
      setVideos(videos.map(video => (video.id === newVideo.id ? newVideo : video)))
    } else {
      setVideos([...videos, newVideo])
    }

    // Confirmation and redirect
    const confirm = window.confirm('Are you sure you want to save?')
    if (confirm) {
      navigate('/videos')
    }
  }

  return (
    <form className='video_container' onSubmit={handleFormSubmit}>
      <div className='video_form'>
        <div className='video_edit_label'>
          <div>
            <label className='video_edit_label_name'>
              Program Name:
              <input type='text' name='videoName' value={videoName} onChange={e => setVideoName(e.target.value)} />
            </label>
          </div>
          <div>
            <label className='video_edit_label_prescribed'>
              Prescribed:
              <select name='prescribed' value={prescribed} onChange={e => setPrescribed(e.target.value)}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </label>
          </div>
        </div>
        <button className='button-general' type='button' onClick={addLanguage}>
          Add Language
        </button>
      </div>
      <div className='video_edit_veritcal_scroll'>
        {languages.map((language, index) => (
          <div className='video_form_scroll' key={index}>
            <div className='thumbnail_upload'>
              <div className='thumnail-holder'>
                <label>
                  <div className='button-classic-thumbnail video-thumbnail-holder-upload'>Upload</div>
                  <div className='video_thumbnail_holder'>Thumbnail</div>
                  <input type='file' style={{ display: 'none' }} onChange={e => handleFileChange(e, index, 'thumbnail')} />
                  {language.thumbnailName ? language.thumbnailName.substring(0, 8) : ' '}
                </label>
              </div>
            </div>
            <div className='video-upload'>
              <div className='thumnail-holder'>
                <label>
                  <div className='button-classic-thumbnail video-thumbnail-holder-upload'>Upload</div>
                  <div className='video_video_holder'>Program</div>
                  <input type='file' style={{ display: 'none' }} onChange={e => handleFileChange(e, index, 'videoFile')} />
                  {language.videoFileName ? language.videoFileName.substring(0, 8) : ' '}
                </label>
              </div>
            </div>
            <div>
              <label className='video_edit_label_column'>
                Language:
                <select name='language' value={language.language} onChange={e => handleInputChange(e, index)}>
                  <option value=''>Select a language</option>
                  <option value='English'>English</option>
                  <option value='Spanish'>Spanish</option>
                  <option value='Italian'>Italian</option>
                  <option value='German'>German</option>
                </select>
              </label>
              <label className='video_edit_label_column'>
                Owner:
                <input type='text' name='videoURL' />
              </label>
            </div>
            <div>
              <label className='video_edit_label_url'>
                Tags
                <input type='text' name='Tags' />
              </label>
              <div>
                <label className='video_edit_label_url '>
                  Closed Caption
                  <div className='video_closed_caption'>
                    <input className='video_cc_edit_label_url_input' type='file' style={{ display: 'none' }} onChange={e => handleFileChange(e, index, 'closedCaption')} />
                    <input className='video_cc_edit_label_url_input' type='text' name='closedCaptionName' value={language.closedCaptionName || ''} disabled />
                    <button className='button-classic video-cc-edit-label-url-input-button ' type='button' onClick={() => document.getElementsByName('closedCaptionName')[index].previousSibling.click()}>
                      Upload
                    </button>
                  </div>
                </label>
              </div>
            </div>
            <div className='video_edit_label_url '>
              Description
              <textarea className='video-descripiton'></textarea>
            </div>
            <label className='video_edit_label_prescribed'>
              Status:
              {/* <select name='status' value={language.status} onChange={e => handleInputChange(e, index)}>
                <option value='Inactive'>Inactive</option>
                <option value='Active'>Active</option>
              </select> */}
            </label>
            {/* <button className='button-general' type='button' onClick={() => removeLanguage(index)}>
              Remove
            </button> */}
          </div>
        ))}
      </div>
      <button className='button-general button-general-video-send' type='submit'>
        {isEditing ? 'Save' : 'Create'}
      </button>

      <Link to='/videos'>
        <button className='button-general' type='button'>
          Cancel
        </button>
      </Link>
    </form>
  )
}

export default VideoAddEditPage
