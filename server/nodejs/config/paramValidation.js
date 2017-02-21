import Joi from 'joi';

export default {
  user: {
    // POST /api/user
    createUser: {
      body: {
        ident: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        name: Joi.string().required(),
        avatar: Joi.string()
      }
    },
    // POST /api/user/:userId/drawing
    createDrawing: {
      body: {
        uid: Joi.string().required(),
        letter: Joi.string().required(),
        category: Joi.string().required(),
        content: Joi.string().required()
      }
    },
    // PUT /api/user/:userId
    updateUser: {
      body: {
        email: Joi.string().email(),
        password: Joi.string().min(6),
        name: Joi.string()
      }
    },
    // PUT /api/user/:userId/avatar
    updateAvatar: {
      body: {
        content: Joi.string().required(),
        type: Joi.string().required()
      }
    },
    // POST /api/login
    login: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    }
  },
  category: {
    // POST /api/category
    createCategory: {
      body: {
        name: Joi.string().required(),
        letters: Joi.array().required()
      }
    }
  },
};
