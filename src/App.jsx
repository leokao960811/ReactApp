import React from 'react';
import PostBox from './Postbox'; // Adjust the path if needed

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Welcome to the Post App</h1>
      <PostBox />  {/* Use the PostBox component here */}
    </div>
  );
}

export default App;