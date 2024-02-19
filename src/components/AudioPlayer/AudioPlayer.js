import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ playlist }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    useEffect(() => {
        const lastPlayedTrackIndex = parseInt(localStorage.getItem('lastPlayedTrackIndex'), 10) || 0;
        setCurrentTrackIndex(lastPlayedTrackIndex);
    }, []);

    const playNextTrack = () => {
        const nextTrackIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextTrackIndex);
        localStorage.setItem('lastPlayedTrackIndex', nextTrackIndex.toString());
    };

    const playSelectedTrack = (index) => {
        setCurrentTrackIndex(index);
        localStorage.setItem('lastPlayedTrackIndex', index.toString());
    };

    const handleAudioEnded = () => {
        playNextTrack();
    };

    if (playlist.length === 0 || currentTrackIndex >= playlist.length) {
        return <div>No tracks available</div>;
    }

    return (
        <div>
            <h2>Now Playing: {playlist[currentTrackIndex].name}</h2>
            <audio controls onEnded={handleAudioEnded}>
                <source src={playlist[currentTrackIndex].url} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
            <ul>
                {playlist.map((track, index) => (
                    <li key={index} onClick={() => playSelectedTrack(index)}>
                        {track.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AudioPlayer;
