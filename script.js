document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const albumCover = document.getElementById('album-cover');
    const songName = document.getElementById('song-name');
    const artist = document.getElementById('artist');
  
    generateBtn.addEventListener('click', () => {
      fetchRandomSong()
        .then(displaySongInfo)
        .catch(error => console.error('Error:', error));
    });
  
    async function fetchRandomSong() {
      const response = await fetch('https://itunes.apple.com/us/rss/topsongs/limit=100/json');
      const data = await response.json();
      const entries = data.feed.entry;
      if (!entries || entries.length === 0) {
        throw new Error('No songs found.');
      }
      const randomIndex = Math.floor(Math.random() * entries.length);
      return entries[randomIndex];
    }
  
    function displaySongInfo(song) {
      albumCover.src = song['im:image'][2].label;
      songName.textContent = song['im:name'].label;
      artist.textContent = song['im:artist'].label;
    }
  });
  