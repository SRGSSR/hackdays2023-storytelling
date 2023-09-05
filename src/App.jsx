import {useRef, useState} from 'react'
import './App.css'
import { Player, ControlBar } from 'video-react';

const getSimilar = async(term) => {
    const ids = await similar(term)
    console.log(ids)
}

const playlist = [{},
    {
        url: 'https://srghackathon.archipanion.com/objects/Hess_D_23-167485-35_Antenne__01_03_1965-FARO.mp4?width=1024',
        start: 20.000,
        end: 25.000,
    }, {
        url: 'https://srghackathon.archipanion.com/objects/Hess_D_23-167499-12_Antenne__14_01_1972-FARO.mp4?width=1024',
        start: 40.000,
        end: 55.000,
    }];

function App() {
    const [count, setCount] = useState(0);
    const playerRef = useRef();

    return (
        <>
            <div className="card">
                <button onClick={() => getSimilar("Auto")}>Test API</button>
            </div>
            <div className="card">
                {
                    playlist.map((item, index) => (
                        <Player autoPlay={count === index} ref={playerRef} startTime={item.start} className={'player'}>
                            {count === index && item.url ? <source src={item.url} type="video/mp4"/> : null}
                        </Player>
                    ))
                }
                <button onClick={() => setCount((count) => count + 1)} className={'counter'}>
                    count is {count}
                </button>
            </div>
        </>
    );
}

export default App
