import React from 'react';
import LibrarySong from './LibrarySong';

function Library({audioRef, songs, setCurrentSong, isPlaying, libraryState, setSongs}) {
  return (
    <div className={`library ${libraryState ? 'active-library' : ''}`}>
        <h2>Library</h2>
        <div className='library-songs'>
            {songs.map((song) => (
              <LibrarySong 
              cover = {song.cover}
              name = {song.name}
              artist = {song.artist}
              active = {song.active}
              setCurrentSong={setCurrentSong} 
              songs = {songs} 
              id = {song.id} 
              key = {song.id} 
              audioRef={audioRef} 
              isPlaying = {isPlaying} 
              setSongs={setSongs}
              />
          )
            )}
        </div>
    </div>
  )
}

export default Library