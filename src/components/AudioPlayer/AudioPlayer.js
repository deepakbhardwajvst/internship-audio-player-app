import { useState, useEffect } from 'react';
const AudioPlayer = ({ playlist }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [audioFile, setAudioFile] = useState(null);

    useEffect(() => {

        const lastPlayedTrackIndex = parseInt(localStorage.getItem('lastPlayedTrackIndex'), 10) || 0;
        setCurrentTrackIndex(lastPlayedTrackIndex);
    }, []);

    const playNextTrack = () => {
        const nextTrackIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextTrackIndex);
        localStorage.setItem('lastPlayedTrackIndex', nextTrackIndex.toString());
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setAudioFile(file);
    };

    return (
        <div>
            <h2>Now Playing: {playlist[currentTrackIndex].name}</h2>
            <audio controls onEnded={playNextTrack}>
                {audioFile ? (
                    <source src={URL.createObjectURL(audioFile)} type={audioFile.type} />
                ) : (
                    <source src={playlist[currentTrackIndex].url} type="audio/mp3" />
                )}
                Your browser does not support the audio element.
            </audio>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
        </div>
    );
};

export default AudioPlayer;
