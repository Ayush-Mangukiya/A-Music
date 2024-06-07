import React, { useState, useRef } from 'react';

// Import Style
import './styles/app.scss';

// Import Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

// Import utils
import data from './data';

function App() {

  const [songs, setSongs] = useState(data);
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

    setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation});
  }

  const songEndHandler =  () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if(isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryState ? 'library-active' : ''}`}>
      <Nav libraryState={libraryState} setLibraryState={setLibraryState} />
      <Song currentSong={currentSong}  />
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
        currentSong = {currentSong} 
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
