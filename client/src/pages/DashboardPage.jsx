import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import MoodSelector from "../components/mood/MoodSelector";
import AyahDisplay from "../components/mood/AyahDisplay";
import Card, { CardHeader, CardBody } from "../components/common/Card";
import { getAyahByMood } from "../utils/api";
import { toast } from "react-hot-toast";

const DashboardPage = () => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);
  const [mood, setMood] = useState("");
  const [ayah, setAyah] = useState(null);
  const [fetchingAyah, setFetchingAyah] = useState(false);

  useEffect(() => {
    // Reset mood and ayah when the user changes
    setAyah(null);
    setMood("");
  }, [user]);

  const handleSelectMood = async (selectedMood) => {
    try {
      setMood(selectedMood);
      setFetchingAyah(true);

      const data = await getAyahByMood(selectedMood);
      setAyah(data);

      toast.success("Ayah loaded successfully!", {
        position: 'top-center', // You can customize the position or other settings here
      });
    } catch (err) {
      console.error("Error fetching ayah:", err);
      toast.error("Failed to fetch Ayah. Please try again.", {
        position: 'top-center', // You can customize the position or other settings here
      });
    } finally {
      setFetchingAyah(false);
    }
  };

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div className="text-center">Authenticating...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="mb-8">
        <CardHeader>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back, {user?.name}. Find Quranic guidance based on your
            current mood.
          </p>
        </CardHeader>

        <CardBody>
          <MoodSelector onSelectMood={handleSelectMood} />
        </CardBody>
      </Card>

      {(ayah || fetchingAyah) && (
        <AyahDisplay ayah={ayah} loading={fetchingAyah} mood={mood} />
      )}
    </div>
  );
};

export default DashboardPage;
