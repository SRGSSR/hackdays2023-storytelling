import {useEffect, useState} from 'react'
import './App.css'
import {search} from './utils/archipanion.js'

function App() {
  const [results, setResults] = useState([])
  const [resultIndex, setResultIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState('Auto')

  useEffect(() => {
    const video = document.getElementById(`video-${resultIndex}`)
    if(video) video.play();
  }, [resultIndex]);

  const getSimilar = async (term) => {
    const ids = await search(term)
    console.log(ids)
    setResults(ids)
  }

  const playPause = () => {
    const video = document.getElementById(`video-${resultIndex}`)
    if(video) {
      if(video.paused) {
        video.play()
      }
      else video.pause()
    }
  }

  return (
    <>
      <div className="card">
        <input onChange={(e) => setSearchTerm(e.target.value)} type="text" value={searchTerm}/><br/>
        <button onClick={() => getSimilar(searchTerm)}>Test API</button>
        <button onClick={() => playPause()}>Play / Pause</button>
      </div>
      <div style={{ width: '100%'}}>
        {results.map((result, index) => (
          <div
            key={result.segmentId}
            style={{
              aspectRatio: '16 / 9',
              width: '100%',
              overflow: 'invisible',
              display: index===resultIndex ? 'block' : 'none'}}>
          <video
                 id={`video-${index}`}
                 preload="auto"
                 style={{width: '100%', height: '100%'}}
                 src={`https://srghackathon.archipanion.com/objects/${result.path}?width=200#t=${result.startabs}`}
                 onTimeUpdate={(vid) => {
                   console.log(vid.target.currentTime, result.startabs, result.endabs)
                   if(vid.target.currentTime>=result.endabs) {
                     vid.target.pause()
                     if(index !== results.length -1) setResultIndex( index+1)
                   }
                 }}
                 ></video>
            <div>{resultIndex} - {result.objectId} ({Math.round(result.score * 100)}%)</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
