import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../utils/APIError';

const DrawingSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  letter: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
},{collection: 'Drawing'});

// Methods
DrawingSchema.method({
});

// Statics
DrawingSchema.statics = {
  create(drawing) {
    const newDrawing = new this({...drawing})

    return newDrawing.save()
                     .then(savedDrawing => savedDrawing)
                     .catch(e => Promise.reject(new APIError(e)));
  },
  readAll() {
      return this.find().exec()
  }
};
export default mongoose.model('Drawing', DrawingSchema);
