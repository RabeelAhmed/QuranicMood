import { useState } from 'react';
import Button from '../common/Button';
import { getAyahByMood } from '../../utils/api'; // We'll add this function to handle API calls
import AyahDisplay from './AyahDisplay';

const MoodSelector = ({ onSelectMood }) => {
  const [selectedMood, setSelectedMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [ayah, setAyah] = useState(null);
  const [error, setError] = useState('');

  const moods = [
    { value: 'happy', label: 'Happy', emoji: '😊', color: 'bg-yellow-100 border-yellow-300' },
    { value: 'sad', label: 'Sad', emoji: '😢', color: 'bg-blue-100 border-blue-300' },
    { value: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-purple-100 border-purple-300' },
    { value: 'angry', label: 'Angry', emoji: '😠', color: 'bg-red-100 border-red-300' },
    { value: 'confused', label: 'Confused', emoji: '😕', color: 'bg-orange-100 border-orange-300' },
    { value: 'stressed', label: 'Stressed', emoji: '😩', color: 'bg-pink-100 border-pink-300' },
    { value: 'grateful', label: 'Grateful', emoji: '🙏', color: 'bg-green-100 border-green-300' },
    { value: 'fearful', label: 'Fearful', emoji: '😨', color: 'bg-indigo-100 border-indigo-300' },
    { value: 'peaceful', label: 'Peaceful', emoji: '😌', color: 'bg-teal-100 border-teal-300' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedMood) {
      setLoading(true);
      setError('');
      try {
        const fetchedAyah = await getAyahByMood(selectedMood); // Call API to fetch the Ayah
        setAyah(fetchedAyah);
      } catch (err) {
        setError('Error fetching Ayah. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">How are you feeling today?</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {moods.map((mood) => (
            <button
              key={mood.value}
              type="button"
              className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                selectedMood === mood.value
                  ? `${mood.color} border-opacity-100 shadow-md transform scale-105`
                  : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => setSelectedMood(mood.value)}
            >
              <span className="text-3xl mb-2">{mood.emoji}</span>
              <span className="font-medium text-gray-800 dark:text-white">{mood.label}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!selectedMood || loading}
            className="px-8"
          >
            {loading ? 'Loading...' : 'Get Quranic Ayah'}
          </Button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {ayah && <AyahDisplay ayah={ayah} mood={selectedMood} />}
    </div>
  );
};

export default MoodSelector;
