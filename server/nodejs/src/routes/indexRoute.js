import express from 'express';
import expressJwt from 'express-jwt';
import expressUnless from 'express-unless';
import userRoutes from './userRoute';
import categoryRoutes from './categoryRoute';
import config from '../../config/env';

const router = express.Router(); // eslint-disable-line new-cap

// Protect all routes except /api/user/login and /api/user/register
// and attach token to auth property of request
router.use(expressJwt({ secret: config.jwtSecret, requestProperty: 'auth'})
      .unless({ path: ['/api/test', '/api/user/login', '/api/user/register', '/api/category']}));

// GET /api/test
router.get('/test', (req, res) => res.send('OK') );

// mount user routes at /api/user
router.use('/user', userRoutes);

// mount category routes at /api/category
router.use('/category', categoryRoutes);

export default router;
