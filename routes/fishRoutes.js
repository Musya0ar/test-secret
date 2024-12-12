const express = require('express');
const router = express.Router();
const fishController = require('../controllers/fishController');


router.post('/', fishController.addFish);
router.get('/', fishController.getAllFish);
router.get('/:id', fishController.getFish);
router.put('/:id', fishController.updateFish);
router.delete('/:id', fishController.deleteFish);

module.exports = router;

