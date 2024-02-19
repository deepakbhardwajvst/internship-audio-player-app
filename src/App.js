import React, { useState, useEffect } from 'react';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';

const App = () => {
  const [playlist, setPlaylist] = useState(() => {
    const storedPlaylist = localStorage.getItem('playlist');
    return JSON.parse(storedPlaylist);
  });

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  const addNewTrack = (newTrack) => {
    setPlaylist([...playlist, newTrack]);
  };
  const resetHandler = (newTrack) => {
    setPlaylist("");
  };

  return (
    <div className="App">
      <AudioPlayer playlist={playlist} />
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => {
          const file = e.target.files[0];
          const newTrack = { name: file.name, url: `/${file.name}` };

          addNewTrack(newTrack);
        }}
      />
      <button onClick={resetHandler}>reset</button>
    </div>
  );
};

export default App;

