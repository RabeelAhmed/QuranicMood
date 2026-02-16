import { useState } from 'react';
import Button from '../common/Button';
import { getAyahByMood } from '../../utils/api';
import AyahDisplay from './AyahDisplay';

const MoodSelector = ({ onSelectMood }) => {
  const [selectedMood, setSelectedMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [ayah, setAyah] = useState(null);
  const [error, setError] = useState('');

  const moods = [
    { value: 'happy', label: 'Happy', emoji: '😊', 
      color: 'from-yellow-100 to-yellow-200 border-yellow-300' },
    { value: 'sad', label: 'Sad', emoji: '😢', 
      color: 'from-blue-100 to-blue-200 border-blue-300' },
    { value: 'anxious', label: 'Anxious', emoji: '😰', 
      color: 'from-purple-100 to-purple-200 border-purple-300' },
    { value: 'angry', label: 'Angry', emoji: '😠', 
      color: 'from-red-100 to-red-200 border-red-300' },
    { value: 'confused', label: 'Confused', emoji: '😕', 
      color: 'from-orange-100 to-orange-200 border-orange-300' },
    { value: 'stressed', label: 'Stressed', emoji: '😩', 
      color: 'from-pink-100 to-pink-200 border-pink-300' },
    { value: 'grateful', label: 'Grateful', emoji: '🙏', 
      color: 'from-green-100 to-green-200 border-green-300' },
    { value: 'fearful', label: 'Fearful', emoji: '😨', 
      color: 'from-indigo-100 to-indigo-200 border-indigo-300' },
    { value: 'peaceful', label: 'Peaceful', emoji: '😌', 
      color: 'from-teal-100 to-teal-200 border-teal-300' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedMood) {
      setLoading(true);
      setError('');
      try {
        const fetchedAyah = await getAyahByMood(selectedMood);
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
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          How are you feeling today?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select your mood to receive a comforting Quranic Ayah
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {moods.map((mood) => (
            <button
              key={mood.value}
              type="button"
              className={`p-5 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                selectedMood === mood.value
                  ? `bg-gradient-to-br ${mood.color} border-opacity-100 shadow-lg scale-[1.03]`
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-[1.02]'
              }`}
              onClick={() => setSelectedMood(mood.value)}
            >
              <span className="text-4xl mb-3">{mood.emoji}</span>
              <span className="font-medium text-gray-800 dark:text-white">{mood.label}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!selectedMood || loading}
            className="px-8 py-3 text-lg font-medium"
            variant="primary"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Loading...
              </span>
            ) : (
              'Get Quranic Ayah'
            )}
          </Button>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-300 text-center">
          {error}
        </div>
      )}
      
      {ayah && <AyahDisplay ayah={ayah} mood={selectedMood} />}
    </div>
  );
};

export default MoodSelector;