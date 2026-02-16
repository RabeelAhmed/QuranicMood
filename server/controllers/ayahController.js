const { GoogleGenerativeAI } = require("@google/generative-ai");
const MoodEntry = require("../models/MoodEntry");
const FavoriteAyah = require('../models/FavoriteAyah');

exports.getAyahByMood = async (req, res) => {
  try {
    const { mood } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing");
      return res.status(500).json({ message: "Server configuration error. Please add GEMINI_API_KEY to .env file" });
    }

    if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }

    // Initialize Google Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const aiPrompt = `Suggest a Quranic Ayah with reference and translation for someone feeling "${mood}". 

Please format your response as follows:
- Arabic text of the Ayah
- Surah name and verse number (e.g., "Surah Al-Baqarah 2:286")
- English translation

Keep the response concise and relevant to the mood.`;

    const result = await model.generateContent(aiPrompt);
    const response = await result.response;
    const responseText = response.text();

    if (!responseText) {
      return res.status(500).json({ message: "No response from Gemini model" });
    }

    const formattedAyah = {
      text: responseText,
      reference: "Suggested by Google Gemini",
      translation: responseText
    };

    if (req.user && req.user._id) {
      await MoodEntry.create({
        user: req.user._id,
        mood: mood.toLowerCase(),
        ayah: formattedAyah
      });
    }

    res.json(formattedAyah);
  } catch (error) {
    console.error("Error in getAyahByMood:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

exports.getMoodHistory = async (req, res) => {
  try {
    const moodHistory = await MoodEntry.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(moodHistory);
  } catch (error) {
    console.error("Error in getMoodHistory:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Favorite Ayahs Controllers
exports.getFavoriteAyahs = async (req, res) => {
  try {
    const favorites = await FavoriteAyah.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(favorites);
  } catch (error) {
    console.error("Error in getFavoriteAyahs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.addFavoriteAyah = async (req, res) => {
  try {
    const { ayah } = req.body;

    if (!ayah || !ayah.text || !ayah.reference) {
      return res.status(400).json({ message: "Ayah text and reference are required" });
    }

    const newFavorite = await FavoriteAyah.create({
      user: req.user._id,
      ayah: {
        text: ayah.text,
        reference: ayah.reference,
        translation: ayah.translation || ayah.text,
        mood: ayah.mood || null 
      }
    });

    res.status(201).json(newFavorite);
  } catch (error) {
    console.error("Error in addFavoriteAyah:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.removeFavoriteAyah = async (req, res) => {
  try {
    const favorite = await FavoriteAyah.findById(req.params.id);

    if (!favorite) {
      return res.status(404).json({ message: "Favorite ayah not found" });
    }

    // Check if the favorite belongs to the logged-in user
    if (favorite.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await favorite.deleteOne();
    res.json({ message: "Favorite ayah removed" });
  } catch (error) {
    console.error("Error in removeFavoriteAyah:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};