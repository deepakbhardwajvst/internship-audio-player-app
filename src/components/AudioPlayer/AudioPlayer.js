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
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleAudioError = (error) => {
        console.error('Audio playback error:', error);
    };
    if (playlist.length === 0 || currentTrackIndex >= playlist.length) {
        return <div>No tracks available</div>;
    }

    return (
        <div className="audio-player-container">
            <h2 className="now-playing">Now Playing: {playlist[currentTrackIndex].name}</h2>
            <audio
                ref={audioRef}
                controls
                onEnded={handleAudioEnded}
                onTimeUpdate={handleTimeUpdate}
                onError={handleAudioError}
                src={playlist[currentTrackIndex].url}
                className="audio-element"
            >
                Your browser does not support the audio element.
            </audio>
            <ul className="playlist">
                {playlist.map((track, index) => (
                    <li key={index} onClick={() => playSelectedTrack(index)} className="playlist-item">
                        <div className="track-info">
                            <span className="track-name">{track.name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default AudioPlayer;
