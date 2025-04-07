const axios = require("axios");
const MoodEntry = require("../models/MoodEntry");
const FavoriteAyah = require('../models/FavoriteAyah');


exports.getAyahByMood = async (req, res) => {
  try {
    const { mood } = req.body;
    const apiKey = process.env.AI21_API_KEY;

    if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }

    const aiPrompt = `Suggest a Quranic Ayah with reference and translation for someone feeling "${mood}". Only return the Ayah, its Surah and verse number, and the English translation.`;

    const payload = {
      model: "jamba-instruct",
      messages: [{ role: "user", content: aiPrompt }],
      temperature: 0.7,
      n: 1
    };

    const aiResponse = await axios.post(
      "https://api.ai21.com/studio/v1/chat/completions",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    const responseText = aiResponse.data?.choices?.[0]?.message?.content;

    if (!responseText) {
      return res.status(500).json({ message: "No response from AI21 model" });
    }

    const formattedAyah = {
      text: responseText,
      reference: "As interpreted by AI21 model",
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
        mood: ayah.mood || null // ✅ Add this line
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