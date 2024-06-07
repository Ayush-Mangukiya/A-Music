import React, { useState } from 'react';

// Import Style
import './styles/app.scss';

// Import Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';

// Import utils
import data from './utils';

function App() {

  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <h1>Welcome to AMusic</h1>
      <Song currentSong={currentSong}  />
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <Library songs={songs} />
    </div>
  );
}

export default App;
