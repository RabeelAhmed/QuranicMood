import axios from 'axios';

// Fetch Ayah based on mood
export const getAyahByMood = async (mood) => {
  try {
    // Use the correct key for the token
    const token = localStorage.getItem('token'); // Updated key here

    const response = await axios.post(
      'http://localhost:5000/api/ayahs/mood', // Ensure your backend URL is correct
      { mood },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Token will now be correct
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error('Error fetching Ayah:', err);
    throw new Error('Failed to fetch Ayah');
  }
};




// Updated functions for utils/api.js file

// First, define a baseURL variable that works in your environment
// You'll need to adjust this based on how your app accesses environment variables
const getBaseUrl = () => {
  // If you're using Create React App or have defined REACT_APP variables
  if (typeof window !== 'undefined' && window.__ENV) {
    return window.__ENV.REACT_APP_API_URL;
  } 
  // Check if process.env is available
  else if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Fallback to a default URL (replace with your actual API URL)
  else {
    return 'http://localhost:5000'; // Replace with your default API URL
  }
};

export const getFavoriteAyahs = async () => {
  try {
    const response = await fetch(`${getBaseUrl()}/api/ayahs/favorites`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getFavoriteAyahs:', error);
    throw error;
  }
};

export const addFavoriteAyah = async (ayah) => {
  try {
    const response = await fetch(`${getBaseUrl()}/api/ayahs/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ ayah })
    });

    if (!response.ok) {
      throw new Error('Failed to add favorite');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in addFavoriteAyah:', error);
    throw error;
  }
};

export const removeFavoriteAyah = async (id) => {
  try {
    const response = await fetch(`${getBaseUrl()}/api/ayahs/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to remove favorite');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in removeFavoriteAyah:', error);
    throw error;
  }
};