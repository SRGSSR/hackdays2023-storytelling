import {useEffect, useState} from 'react'
import './App.css'
import {search} from './utils/archipanion.js'

function App() {
  const [results, setResults] = useState([])
  const [resultIndex, setResultIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState('Auto')
  const [sequenceText, setSequenceText] = useState('Blue Auto:0\nDog:5\nCat:5')

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
    const searchTerms = sequenceText.split('\n').map(s => {
      const [term, duration] = s.split(':');
      return {term, duration: parseInt(duration)};
    });
    const results = (await Promise.all(searchTerms.map(async s => {
      let similars = await search(s.term,  20);
      let pos = 0;
      for (let i = 0; i < similars.length; i++) {
        if (s.duration === 0) {
          similars = similars.slice(0, i + 1);
          break;
        }
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
        <div>
          <textarea onChange={(e) => setSequenceText(e.target.value)} value={sequenceText}></textarea>
        <button onClick={updateResults}>Test Sequence</button>
        </div>
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
