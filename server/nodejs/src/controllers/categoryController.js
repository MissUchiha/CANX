import Category from '../models/categoryModel';

// Load category and append to request
function loadCategory(req, res, next, id) {
  Category.read(id)
          .then((category) => {
            req.category = category; // eslint-disable-line no-param-reassign
            return next();
          })
          .catch(e => next(e));
}

// Get category in json format
function readCategory(req, res) {
  return res.json(req.category);
}

// Get category list
function readAllCategories(req, res, next) {
  Category.readAll()
          .then(categories => res.json(categories))
          .catch(e => next(e));
}

// Create new category
function createCategory(req, res, next) {
  const category = { ...req.body}

  Category.create(category)
          .then(category => res.json(category))
          .catch(e => next(e))
}

// Delete category
function deleteCategory(req, res, next) {
  const category = req.category
  Category.delete(category)
          .then(category => res.json(category))
          .catch(e => next(e))
} 

export default { loadCategory, readCategory, createCategory, readAllCategories, deleteCategory };
