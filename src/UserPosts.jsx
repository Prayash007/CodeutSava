// src/UserPosts.jsx

import React, { useEffect, useState } from 'react';
import client from './appwriteConfig';
import { Query } from 'appwrite';

const UserPosts = ({ userId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await client.database.listDocuments('posts_collection_id', [
                    Query.equal('userId', userId)
                ]);
                setPosts(response.documents);
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };

        fetchPosts();
    }, [userId]);

    return (
        <div>
            <h4>User Posts</h4>
            <ul>
                {posts.map(post => (
                    <li key={post.$id}>{post.content}</li> // Adjust based on your schema
                ))}
            </ul>
        </div>
    );
};

export default UserPosts;