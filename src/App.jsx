// App.js
import React, { useState, useEffect } from 'react';
import useDebounce from './Debounse';
import './App.css'

const App = () => {
  const [username, setUsername] = useState('');
  const debouncedUsername = useDebounce(username, 500); // 500ms debounce delay
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchAvatar = async () => {
      if (debouncedUsername) {
        try {
          const response = await fetch(`https://api.github.com/users/${debouncedUsername}`);
          const data = await response.json();
          setAvatarUrl(data.avatar_url);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setAvatarUrl(''); // Clear avatar on error
        }
      } else {
        setAvatarUrl(''); // Clear avatar if no username is provided
      }
    };

    fetchAvatar();
  }, [debouncedUsername]);

  return (
    <div className='app'>
      <h1 className='heading'>Github Avatar Viewer</h1>
      <input
      className='input'
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div>
        {avatarUrl && <img className='img-1' src={avatarUrl} alt="GitHub Avatar" />}
        {!avatarUrl && <p>No avatar available</p>}
      </div>
    </div>
  );
};

export default App;
