import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost'; // Import the BlogPost component

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://api.example.com/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-semibold mb-6"></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {posts.map((post) => (
          <Post key={post.id} title={post.title} content={post.content} />
        ))}
      </div>
      <BlogPost /> {/* Render the BlogPost component */}
    </div>
  );
};

const Post = ({ title, content }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default Blog;
