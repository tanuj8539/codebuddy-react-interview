import React, { useEffect, useState } from "react";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://codebuddy.review/posts");

        if (response.status === 200) {
          const result = await response.json();
          setPosts(result.data);
        }
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <div className="posts-container">
        {posts?.length > 0 ? (
          posts.map((post) => (
            <div className="post" key={post.id}>
              <img src={post.image} alt={post.writeup} />
              <div className="post-content">
                <img src={post.avatar} alt={post.firstName} className="avatar" />
                <h2 className="name">
                  {post.firstName} {post.lastName}
                </h2>
                <p className="text">{post.writeup}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="posts-error-message">No data found</div>
        )}
      </div>
    </div>
  );
};

export default Posts;
