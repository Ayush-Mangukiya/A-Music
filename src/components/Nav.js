import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

function Nav({libraryState, setLibraryState}) {
    const openLibraryHandler = () => {
        setLibraryState(!libraryState);
    }

  return (
    <nav>
        <h1>AMusic</h1>
        <button 
        className={libraryState ? "library-active" : ""}
        onClick={openLibraryHandler}>
            Library
            <FontAwesomeIcon icon={faMusic} />
        </button>
    </nav>
  )
}

export default Nav