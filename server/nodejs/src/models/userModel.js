import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../utils/APIError';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  ident: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email is not valid.']
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  }
},{collection: 'User'});

// Methods
UserSchema.method({

});

// Statics
UserSchema.statics = {
  readAll() {
    return this.find().exec()
  },
  read(id) {
    return this.findById(id)
               .exec()
               .then((readedUser) => {
                   const err = new APIError('User not exists!', httpStatus.NOT_FOUND);
                   return (readedUser) ? readedUser : Promise.reject(err);
                });
  },
  readCredentials(credentials) {
    return this.findOne(credentials)
               .exec()
               .then((readedUser) => {
                   const err = new APIError('User not exists!', httpStatus.NOT_FOUND);
                   return (readedUser) ? readedUser : Promise.reject(err);
                });
  },
  create(user) {
    const newUser = new this({...user})

    return newUser.save()
                  .then(savedUser => savedUser)
                  .catch(e => Promise.reject(new APIError(e)));
 },
 update(user) {
   return this.findOneAndUpdate({email: user.email}, {$set : user}, {upsert: true, new: true})
              .then(savedUser => savedUser)
              .catch(e => Promise.reject(new APIError(e)));
 },
 delete(user) {
   return user.remove()
              .then(deletedUser => deletedUser)
              .catch(e => Promise.reject(new APIError(e)));
 }
};

export default mongoose.model('User', UserSchema);
