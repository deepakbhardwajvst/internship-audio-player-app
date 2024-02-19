import React, { useState, useEffect } from 'react';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import "./App.css";

const App = () => {
  const [playlist, setPlaylist] = useState(() => {
    const storedPlaylist = localStorage.getItem('playlist');
    return JSON.parse(storedPlaylist) || []; // Provide an empty array as a default value
  });

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  const addNewTrack = (newTrack) => {
    setPlaylist([...playlist, newTrack]);
  };

  const resetHandler = () => {
    setPlaylist([]);
  };

  return (
    <div className="app">
      <div className="app-container">
        <AudioPlayer playlist={playlist} />
        <div className="upload-section">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const newTrack = { name: file.name, url: `/${file.name}` };
              addNewTrack(newTrack);
            }}
          />
          <button onClick={resetHandler}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default App;
