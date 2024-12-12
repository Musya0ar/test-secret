const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');


router.post('/', recipesController.addRecipes);
router.get('/', recipesController.getAllRecipes);
router.get('/:id', recipesController.getRecipes);
router.put('/:id', recipesController.updateRecipes);
router.delete('/:id', recipesController.deleteRecipes);

module.exports = router;

