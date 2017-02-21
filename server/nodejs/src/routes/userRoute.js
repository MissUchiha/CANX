import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/paramValidation';
import userCtrl from '../controllers/userController';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/register')
  // POST /api/user/register - register new user
  .post(validate(paramValidation.user.createUser), userCtrl.createUser);

router.route('/login')
  // POST /api/user/login - login user
  .post(validate(paramValidation.user.login), userCtrl.login);

router.route('/')
  // GET /api/user - get list of users
  .get(userCtrl.readAllUsers)

router.route('/:userId')
  // GET /api/user/:userId - get user
  .get(userCtrl.readUser)

  // PUT /api/users/:userId - update user
  .put(validate(paramValidation.user.updateUser), userCtrl.update)

  // DELETE /api/user/:userId - delete user
  .delete(userCtrl.deleteUser);

router.route('/drawing')
  // GET /api/user/:userId/drawing - get user
  .get(userCtrl.readAllDrawings);

router.route('/:userId/drawing')
  // POST /api/user/:userId/drawing - create new drawing
  .post(userCtrl.updateAvatar)

router.route('/:userId/avatar')
  // PUT /api/user/:userId/avatar - update user avatar
  .put(validate(paramValidation.user.updateAvatar), userCtrl.updateAvatar)

// Load user when API with userId route parameter is hit
router.param('userId', userCtrl.loadUser);

export default router;
