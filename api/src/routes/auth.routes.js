import { Router } from 'express';
import passport from 'passport';
import * as controller from '../controllers/auth.controllers';
import { verifyToken as authenticateUser } from '../middleware/auth.middleware';
const routes = Router();

routes.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  })
);

routes.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
  }),
  controller.callBack
);

routes.get('/loggedin', authenticateUser, controller.loggedIn);

export default routes;
