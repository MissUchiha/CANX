import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import config from '../../config/env';
import User from '../models/userModel';
import Drawing from '../models/drawingModel';
import APIError from '../utils/APIError';
import fs from 'fs'

// Login user and return JWT token
function login(req, res, next) {
  const credentials = req.body

  User.readCredentials(credentials)
      .then((user) => {
        const token = jwt.sign({ email: user.email},
                                 config.jwtSecret);
        return res.json({
         jwt: token,
         user: user
        });
      })
      .catch(e => next(e))
}

// Load user and append to request
function loadUser(req, res, next, id) {
  User.read(id)
      .then((user) => {
        // If user email dont match token user email
        if(user.email == req.auth.email) {
          req.user = user; // eslint-disable-line no-param-reassign
          return next();
        }
        else
          return next(new APIError("User email dont match token user email.", httpStatus.UNAUTHORIZED, true))
      })
      .catch(e => next(e));
}

// Get user in json format
function readUser(req, res) {
  return res.json(req.user);
}

// Get user list
function readAllUsers(req, res, next) {
  User.readAll()
      .then(users => res.json(users))
      .catch(e => next(e));
}

// Get list of drawings
function readAllDrawings(req, res, next) {
  Drawing.readAll()
         .then(drawings => res.json(drawings))
         .catch(e => next(e));
}

// Create new user
function createUser(req, res, next) {
  const user = { ...req.body}

  User.create(user)
      .then(user => {
        const token = jwt.sign({ email: user.email},
                                 config.jwtSecret);
        // TODO: send token through Header not working
        // res.header('Autorization', 'Bearer ' + token)
        res.json({user, jwt: token})
      })
      .catch(e => next(e))
}

// Create new drawing
function createDrawing(req, res, next) {
  const user = req.user

  if(user.id != req.body.uid)
    next(new APIError("Drawing userId dont match route userId.", httpStatus.UNAUTHORIZED, true))

  const drawing = { ...req.body}
  Drawing.create(drawing)
         .then(drawing => res.json(drawing))
         .catch(e => next(e))
}

// Update user
function update(req, res, next) {
  const user = req.body
  user.email = req.auth.email

  User.update(user)
      .then(user => res.json(user))
      .catch(e => next(e))
}

// Update user avatar
function updateAvatar(req, res, next) {
  req.body.content = req.body.content.replace(/^data:image\/gif+;base64,/, "").replace(/ /g, '+');

  const path = './avatars/'+req.user._id+"."+req.body.type

  fs.writeFile(path, req.body.content, 'base64', function(err) {
    next(new APIError("Cannot upload avatar picture.", httpStatus.INTERNAL_SERVER_ERROR, true))
  });
  User.update({email: req.auth.email, avatar: path})
      .then(user => res.json(user))
      .catch(e => next(e))
}

// Delete user
function deleteUser(req, res, next) {
  const user = req.user

  User.delete(user)
      .then(user => res.json(user))
      .catch(e => next(e))
}


export default { login, loadUser, readUser, createUser, createDrawing, update, updateAvatar, readAllUsers, readAllDrawings, deleteUser };
