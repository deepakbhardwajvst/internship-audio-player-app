import React, { useState, useEffect } from 'react';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import Playlist from './components/Playlist/Playlist';

const App = () => {
  const [playlist, setPlaylist] = useState(() => {
    const storedPlaylist = localStorage.getItem('playlist');
    return storedPlaylist ? JSON.parse(storedPlaylist) : [];
  });

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  const addNewTrack = (newTrack) => {
    setPlaylist([...playlist, newTrack]);
  };

  return (
    <div className="App">
      <AudioPlayer playlist={playlist} />
      <Playlist playlist={playlist} />
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => {
          const file = e.target.files[0];
          const newTrack = { name: file.name, url: `/${file.name}` };

          addNewTrack(newTrack);
        }}
      />
    </div>
  );
};

export default App;

