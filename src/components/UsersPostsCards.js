import React, { useState, useEffect } from 'react';

const UsersPosts = ({ userId }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [userId]); // Include userId in the dependency array to fetch posts when userId changes

  return (
    <div className='d-flex flex-wrap justify-content-around p-2'>
      {posts && posts.map(post => (
        <div key={post.id} className="card" style={{ width: "18rem", marginBottom: "10px", borderRadius: "10px" }}>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersPosts;
