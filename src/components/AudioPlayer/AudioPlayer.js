import React, { useState, useEffect, useRef } from 'react';

const AudioPlayer = ({ playlist }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioRef = useRef(null);

    useEffect(() => {
        const lastPlayedTrackIndex = parseInt(localStorage.getItem('lastPlayedTrackIndex'), 10) || 0;
        const lastPlaybackPosition = parseFloat(localStorage.getItem('lastPlaybackPosition')) || 0;

        setCurrentTrackIndex(lastPlayedTrackIndex);
        setCurrentTime(lastPlaybackPosition);
    }, []);

    useEffect(() => {
        localStorage.setItem('lastPlayedTrackIndex', currentTrackIndex.toString());
    }, [currentTrackIndex]);

    useEffect(() => {
        localStorage.setItem('lastPlaybackPosition', currentTime.toString());
    }, [currentTime]);

    const playNextTrack = () => {
        const nextTrackIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextTrackIndex);
    };

    const playSelectedTrack = (index) => {
        setCurrentTrackIndex(index);
    };

    const handleAudioEnded = () => {
        playNextTrack();
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };
    const handleAudioError = (error) => {
        console.error('Audio playback error:', error);
    };
    if (playlist.length === 0 || currentTrackIndex >= playlist.length) {
        return <div>No tracks available</div>;
    }

    return (
        <div>
            <h2>Now Playing: {playlist[currentTrackIndex].name}</h2>
            <audio
                ref={audioRef}
                controls
                onEnded={handleAudioEnded}
                onTimeUpdate={handleTimeUpdate}
                onError={handleAudioError}
                src={playlist[currentTrackIndex].url}
            >
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
