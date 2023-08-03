import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import VideosContext from '../contexts/VideosContext'

const VideoPage = () => {
  const { videos, setVideos } = useContext(VideosContext)

  const removeVideo = id => {
    setVideos(videos.filter(video => video.id !== id))
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            {/* <th>Language</th>
            <th>Package</th> */}
            <th>Program URL</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {videos.map(video =>
            video.languages.slice(0, 1).map((lang, index) => (
              <tr key={index}>
                <td>
                  <div className='video_thumbnail_container' style={{ backgroundImage: `url(${lang.thumbnail})`, width: '135px', height: '75px' }}></div>
                </td>
                <td>{video.videoName}</td>
                {/* <td>{lang.language}</td>
                <td>{video.package}</td> */}
                <td>{lang.videoURL}</td>
                <td>{lang.status}</td>
                <td>
                  <Link to={`/edit-video/${video.id}`}>
                    <button className='button-classic video-add-button-possition-edit'>Edit Program</button>
                  </Link>
                </td>
                <td>
                  <button className='button-classic video-add-button-possition-remove' onClick={() => removeVideo(video.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div>
        <Link to={`/edit-video`}>
          <button className='button-general video-add-button-possition'>Add Program</button>
        </Link>
      </div>
    </div>
  )
}

export default VideoPage
