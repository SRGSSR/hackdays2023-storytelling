import {useEffect, useState} from 'react'
import './App.css'
import {search} from './utils/archipanion.js'

const searchTerms = [
  {
    duration: 5,
    term: 'Auto'
  }, {
    duration: 5,
    term: 'Dog'
  }, {
    duration: 5,
    term: 'Cat'
  },
];

function App() {
  const [results, setResults] = useState([])
  const [resultIndex, setResultIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState('Auto')

  useEffect(() => {
    const video = document.getElementById(`video-${resultIndex}`)
    if (video) video.play();
  }, [resultIndex]);

  const playPause = () => {
    const video = document.getElementById(`video-${resultIndex}`)
    if(video) {
      if(video.paused) {
        video.play()
      }
      else video.pause()
    }
  }

  const updateResults = async () => {
    const results = (await Promise.all(searchTerms.map(async s => {
      let similars = await search(s.term,  20);
      let pos = 0;
      for (let i = 0; i < similars.length; i++) {
        pos += similars[i].endabs - similars[i].startabs;
        if (pos > s.duration) {
          similars[i].endabs -= pos - s.duration;
          similars = similars.slice(0, i + 1);
          break;
        }
      }
      return similars;
    }))).flat();

    console.log('results', results.map(r => ({
      't': r.term, 'd': r.endabs - r.startabs
    })));
    setResults(results);
  };

  return (
    <>
      <div className="card">
        <div>
          <input onChange={(e) => setSearchTerm(e.target.value)} type="text" value={searchTerm}/>
          <button onClick={async () => setResults(await search(searchTerm, 5))}>Search</button>
        </div>
        <button onClick={updateResults}>Test Sequence</button>
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
                     if (index < results.length - 1) {
                       setResultIndex(index + 1)
                     }
                   }
                 }}
                 ></video>
            <div><b>[{result.term}]</b> {resultIndex} - {result.objectId} ({Math.round(result.score * 100)}%)</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
