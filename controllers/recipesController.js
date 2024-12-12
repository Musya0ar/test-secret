const { db } = require("../firebaseConfig.js"); // Adjust the path to match your setup

exports.addRecipes = async (req, res) => {
    try {
        const { cookMethode, fishId, ingredient, instruction, imageURL } = req.body;
        const docRef = await db.collection("recipes").add({
            cookMethode,
            fishId,
            ingredient,
            instruction,
            imageURL,
        });
        res.status(201).json({ id: docRef.id, message: "Recipes added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllRecipes = async (req, res) => {
    try {
        const snapshot = await db.collection("recipes").get();
        const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecipes = async (req, res) => {
    try {
        const fishId = req.params.id;
        const doc = await db.collection("recipes").doc(fishId).get();
        if (!doc.exists) {
            return res.status(404).json({ error: "Recipes not found" });
        }
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateRecipes = async (req, res) => {
    try {
        const fishId = req.params.id;
        const updates = req.body;
        await db.collection("recipes").doc(fishId).update(updates);
        res.status(200).json({ message: "Recipes updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteRecipes = async (req, res) => {
    try {
        const fishId = req.params.id;
        await db.collection("recipes").doc(fishId).delete();
        res.status(200).json({ message: "Recipes deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
