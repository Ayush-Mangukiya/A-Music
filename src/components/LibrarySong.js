import React from "react";

function LibrarySong({name,
    artist,
    cover,
    id,
    setCurrentSong,
    songs,
    audioRef,
    isPlaying,
    setSongs,
    active
  }) {

  const songSelectHandler = () => {
    const selectedSong = songs.filter((s) => s.id === id);
    // filter returns array of an object : State : [{…}]
    // so we access 0th index
    // console.log(selectedSong);
    setCurrentSong({...selectedSong[0]});

    const newSongs = songs.map((song) => {
      if(song.id === id) {
        return {
          ...song,
          active: true,
        }
      } else {
        return {
          ...song,
          active: false,
        }
      }
    });
    setSongs(newSongs);
    if(isPlaying) audioRef.current.play();

  }

  return (
    <div onClick={songSelectHandler} className="library-song">
        <img src={cover} alt={name}></img>
        <div className="song-description">
            <h3>{name}</h3>
            <h4>{artist}</h4>
        </div>
    </div>
  )
}

export default LibrarySong 