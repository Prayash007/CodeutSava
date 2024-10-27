// src/api.js
import { databases, Query } from './appwriteConfig'; // Ensure Query is imported from appwriteConfig

const DATABASE_ID = '671cb9a30027d8186900';
const USERS_COLLECTION_ID = '671cba53000cdd3f2fa5';
const POSTS_COLLECTION_ID = '671cb9cd002cc7443bc4';

// Fetch flagged users
export const fetchFlaggedUsers = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
      Query.equal('flag', true) // Use Query.equal for filtering
    ]);
    return response.documents;
  } catch (error) {
    console.error('Error fetching flagged users:', error);
    return [];
  }
};

// Fetch posts for a specific user by userId
export const fetchUserPostsByUserId = async (accountId) => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
      Query.equal('accountId', accountId) // Filter by userId
    ]);
    return response.documents;
  } catch (error) {
    console.error(`Error fetching posts for user ${accountId}:`, error);
    return [];
  }
};

// Fetch flagged users along with their flagged posts
export const fetchFlaggedUsersWithPosts = async () => {
  try {
    const usersResponse = await fetchFlaggedUsers();
    
    const usersWithPosts = await Promise.all(usersResponse.map(async (user) => {
      const userPosts = await fetchUserPostsByUserId(user.$id); // Fetch posts using user.$id
      return {
        ...user,
        posts: userPosts // Add posts to the user object
      };
    }));

    return usersWithPosts;
  } catch (error) {
    console.error('Error fetching flagged users with their posts:', error);
    return [];
  }
};