
const Playlist = ({ playlist }) => {
    return (
        <div>
            <h2>Playlist</h2>
            <ul>
                {playlist.map((track, index) => (
                    <li key={index}>{track.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;