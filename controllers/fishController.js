const { db } = require("../firebaseConfig.js"); // Adjust the path to match your setup

exports.addFish = async (req, res) => {
    try {
        const { name, scientificName, habitat, description, imageURL } = req.body;
        const docRef = await db.collection("fishes").add({
            name,
            scientificName,
            habitat,
            description,
            imageURL,
        });
        res.status(201).json({ id: docRef.id, message: "Fish added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllFish = async (req, res) => {
    try {
        const snapshot = await db.collection("fishes").get();
        const fishes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(fishes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFish = async (req, res) => {
    try {
        const fishId = req.params.id;
        const doc = await db.collection("fishes").doc(fishId).get();
        if (!doc.exists) {
            return res.status(404).json({ error: "Fish not found" });
        }
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateFish = async (req, res) => {
    try {
        const fishId = req.params.id;
        const updates = req.body;
        await db.collection("fishes").doc(fishId).update(updates);
        res.status(200).json({ message: "Fish updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteFish = async (req, res) => {
    try {
        const fishId = req.params.id;
        await db.collection("fishes").doc(fishId).delete();
        res.status(200).json({ message: "Fish deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
