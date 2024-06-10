import React, { useState, useRef } from 'react';

// Import Style
import './styles/app.scss';

// Import Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

// Import utils
import chillhop from './data';
import { PlayAudio } from './util';

function App() {

  const [songs, setSongs] = useState(chillhop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const [libraryState, setLibraryState] = useState(false);

  // Ref
  const audioRef = useRef(null);
  
  const timeUpdateHandller = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // console.log(current);
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation, volume: e.target.volume});
  }

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    PlayAudio(isPlaying, audioRef);
    return;
  }

  return (
    <div className={`App ${libraryState ? 'library-active' : ''}`}>
      <Nav libraryState={libraryState} setLibraryState={setLibraryState} />
      <Song isPlaying={isPlaying} currentSong={currentSong}  />
      <Player 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        audioRef = {audioRef}
        setSongInfo = {setSongInfo}
        songInfo = {songInfo}
        songs = {songs}
        setCurrentSong = {setCurrentSong}
        setSongs= {setSongs} />

      <Library 
        audioRef = {audioRef}
        songs={songs} 
        setCurrentSong = {setCurrentSong}
        isPlaying = {isPlaying}
        libraryState = {libraryState}
        setSongs = { setSongs }
        />

      <audio 
        onTimeUpdate={timeUpdateHandller} 
        ref={audioRef} 
        src={currentSong.audio} 
        onLoadedMetadata={timeUpdateHandller}
        onEnded={songEndHandler}>
      </audio>
    </div>
  );
}

export default App;
