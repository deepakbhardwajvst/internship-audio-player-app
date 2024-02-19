
const Playlist = ({ playlist }) => {
    return (
        <div>
            <h2>Playlist Component</h2>
            <ul>
                {playlist.map((track, index) => (
                    <li key={index}>{track.name}</li>
                ))}
            </ul>
            <h2>Playlist Component Ends Here</h2>

        </div>
    );
};

export default Playlist;