const router = require('express').Router();

const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.getAllCategories);
router.post('/add', categoriesController.addCategories);
router.delete('/delete', categoriesController.deleteCategories);

module.exports = router;