import axios from 'axios';

export const getAyahByMood = async (mood) => {
  try {
    const response = await axios.post('/api/ayahs/mood', { mood }, { withCredentials: true });
    return response.data;
  } catch (err) {
    console.error("Error fetching ayah:", err);
    throw new Error("Failed to fetch ayah");
  }
};