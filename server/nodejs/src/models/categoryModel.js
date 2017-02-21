import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../utils/APIError';


const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  letters: {
    type: [String],
    required: true,
  }
},{collection: 'Category'});

// Methods
CategorySchema.method({
});

// Statics
CategorySchema.statics = {
  readAll() {
    return this.find().exec()
  },
  read(id) {
    return this.findById(id)
               .exec()
               .then((readedCategory) => {
                   const err = new APIError('Category not exists!', httpStatus.NOT_FOUND);
                   return (readedCategory) ? readedCategory : Promise.reject(err);
                });
  },
  create(category) {
    const newCategory = new this({...category})

    return newCategory.save()
                      .then(savedCategory => savedCategory)
                      .catch(e => Promise.reject(new APIError(e)));
  },
  delete(category) {
    return category.remove()
                  .then(deletedCategory => deletedCategory)
                  .catch(e => Promise.reject(new APIError(e)));
  }
};
export default mongoose.model('Category', CategorySchema);
