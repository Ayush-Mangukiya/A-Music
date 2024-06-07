import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

function Player({currentSong, isPlaying, setIsPlaying}) {

  const audioRef = useRef(null);

  // Event Handlers
  const playSongHandler = () => {
    console.log(audioRef.current);
    if(isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }

  const timeUpdateHandller = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // console.log(current);
    setSongInfo({...songInfo, currentTime: current, duration})
  }

  const getTime = (time) => {
    return (Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2))
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value});
  }

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  })
 
  return (
    <div className='player'>
        <div className='time-control'>
            <p>{getTime(songInfo.currentTime)}</p>
            <input min={0} max={songInfo.duration} value={songInfo.currentTime} type='range' onChange={dragHandler}></input>
            <p>{getTime(songInfo.duration)}</p>
        </div>
        <div className='play-control'>
            <FontAwesomeIcon className='skip-back' size='2x' icon = {faAngleLeft} />

            <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon = {isPlaying ? faPause : faPlay} />
            
            <FontAwesomeIcon className='skip-forward' size='2x' icon = {faAngleRight} />
        </div>
        <audio onTimeUpdate={timeUpdateHandller} ref={audioRef} src={currentSong.audio} onLoadedMetadata={timeUpdateHandller}></audio>
    </div>
  )
}

export default Player