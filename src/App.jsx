import {useEffect, useState} from 'react'
import './App.css'
import {search} from './utils/archipanion.js'
import {Inputs} from "./components/Inputs.jsx";
import {VideoMetadata, VideoSequence} from "./components/VideoSequence.jsx";
import {VideoStitcher} from "./components/VideoStitcher.jsx";

function App() {
  const [results, setResults] = useState([])
  const [resultIndex, setResultIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState('Auto')
  const [sequenceText, setSequenceText] = useState('Blue Auto:0\nDog:5\nCat:5')
  const [isLoading, setIsLoading] = useState(false)
  const [listMode, setListMode] = useState(false)

  useEffect(() => {
    const hash = window.location.hash;
    const value = decodeURIComponent(hash.substring(3));
    if (hash.startsWith('#T#')) {
      setSearchTerm(value);
      setSequenceText('');
      updateTerm(value);
    } else if (hash.startsWith('#S#')) {
      setSearchTerm('');
      setSequenceText(value);
      updateSequence(value)
    }
  }, []);

  useEffect(() => {
    const video = document.getElementById(`video-${resultIndex}`)
    if (video && resultIndex!==0) video.play();
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

  const updateSequence = async (text) => {
    setIsLoading(true)
    const searchTerms = text.split('\n').map(s => {
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
    setIsLoading(false)
  };

  async function updateTerm(term) {
    setIsLoading(true)
    const apiResults = await search(term, 5)
    setResults(apiResults);
    setIsLoading(false)
  }

  const search1TermClick = () => {
    window.location.hash = `T#${searchTerm}`;
    updateTerm(searchTerm);
  };

  const searchSequence = () => {
    window.location.hash = `S#${sequenceText.replaceAll('\n', '%0A')}`;
    updateSequence(sequenceText);
  };

  return (
    <div className="app">
      <div className="header"></div>
      <main>
      <Inputs onSearchTermChanged={(e) => setSearchTerm(e.target.value)} searchTerm={searchTerm}
              onSearchTermClick={search1TermClick}
              onSequenceChange={(e) => setSequenceText(e)} sequenceText={sequenceText}
              onSearchSequenceClick={searchSequence}
              isLoading={isLoading}
              onListMode={() => setListMode(true)}
                onVideoMode={() => setListMode(false)}
      />
      <VideoStitcher results={results} onPlayPause={() => playPause()} callbackfn={(result, index) => (
            listMode ? (<VideoMetadata key={result.segmentId} index={index} resultIndex={resultIndex} result={result}/>) :
                (<VideoSequence key={result.segmentId} index={index} resultIndex={resultIndex} result={result}
                               onTimeUpdate={(vid) => {
                                 console.log(vid.target.currentTime, result.startabs, result.endabs)
                                 if (vid.target.currentTime >= result.endabs) {
                                   vid.target.pause()
                                   if (index < results.length - 1) {
                                     setResultIndex(index + 1)
                                   } else {
                                     setResultIndex(0)
                                   }
                                 }
                               }}/>)
      )}/>
      </main>
    </div>
  )
}

export default App
