import React, { useState } from 'react';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import Playlist from './components/Playlist/Playlist';

const App = () => {
  const [playlist, setPlaylist] = useState([
    { name: 'Track 1', url: '/track1.mp3' },
    { name: 'Track 2', url: '/track2.mp3' },

  ]);

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
          const newTrack = { name: file.name, url: URL.createObjectURL(file) };
          addNewTrack(newTrack);
        }}
      />
    </div>
  );
};

export default App;
