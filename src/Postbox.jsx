import React, { useState, useEffect } from 'react';
import './Postbox.css'; // Import CSS for styling

const PostBox = () => {
  const [postContent, setPostContent] = useState('');
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [visibility, setVisibility] = useState([]);

  // Update the current time every second
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      const formattedDate = now.toLocaleDateString();
      setCurrentTime(`${formattedDate} ${formattedTime}`);
    };

    updateCurrentTime(); // Initialize with the current time

    const timer = setInterval(updateCurrentTime, 60000); // Update every minute

    // Clean up the timer on component unmount
    return () => clearInterval(timer);
  }, []);

  // Handle changes in the post textarea
  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };

  // Handle changes in the username input field
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // **Function to toggle the visibility of a post**
  const toggleVisibility = (index) => {
    setVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  // Function to handle post submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (postContent.trim() && username.trim()) {
      // Get the current time
      const timeOfPost = new Date().toLocaleString();

      // Create a new post object
      const newPost = {
        username: username,
        content: postContent,
        time: timeOfPost,
      };

      // Add the new post to the list of posts
      setPosts([newPost, ...posts]);

      // **Add visibility state for the new post (default is visible)**
      setVisibility([true, ...visibility]);

      // Clear the input fields
      setPostContent('');
    } else {
      alert('Please enter a username and post content.');
    }
  };
  
  // **Function to export posts to CSV**
  const exportToCSV = () => {
    const csvRows = [];

    // Headers
    csvRows.push(['Username', 'Post', 'Time']);

    // **Convert each post to CSV row**
    posts.forEach((post) => {
      csvRows.push([post.username, post.content, post.time]);
    });

    // Generate CSV string
    const csvString = csvRows.map(row => row.join(',')).join('\n');

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv' });

    // Create a link element for download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'posts.csv');
    a.click();
  };


  return (
    <div className="postbox-container">
      <h2 className="current-time">Current Time: {currentTime}</h2>

      <form onSubmit={handleSubmit} className="postbox-form">
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
          className="input-username"
        />
        <textarea
          value={postContent}
          onChange={handlePostChange}
          placeholder="Write your post here..."
          rows="4"
          cols="50"
          className="input-post-content"
        />
        <button type="submit" className="submit-button">Post</button>
      </form>

      <h2>Posts</h2>
      <ul className="post-list">
        {posts.map((post, index) => (
          <li key={index} className="post-item">
            <strong>{post.username}</strong> <em>({post.time})</em>
            <button onClick={() => toggleVisibility(index)} className="toggle-button">
              {visibility[index] ? 'Hide' : 'Show'}
            </button>
            {visibility[index] && <p className="post-content">{post.content}</p>}
          </li>
        ))}
      </ul>

      <button onClick={exportToCSV} className="export-button">Export Posts to CSV</button>
    </div>
  );
};

export default PostBox;