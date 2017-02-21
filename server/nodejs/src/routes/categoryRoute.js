import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/paramValidation';
import categoryCtrl from '../controllers/categoryController';
import config from '../../config/env';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  // GET /api/category - get list of categorys
  .get(categoryCtrl.readAllCategories)

  // POST /api/category - create new category
  .post(validate(paramValidation.category.createCategory), categoryCtrl.createCategory);

router.route('/:categoryId')
  // GET /api/category/:categoryId - get category
  .get(categoryCtrl.readCategory)

  // DELETE /api/category/:categoryId - delete category
  .delete(categoryCtrl.deleteCategory);


// Load category when API with categoryId route parameter is hit
router.param('categoryId', categoryCtrl.loadCategory);


export default router;
