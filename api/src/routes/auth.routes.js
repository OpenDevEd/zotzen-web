import { Router } from 'express';
import passport from 'passport';
import * as controller from '../controllers/auth.controllers';
import passportGoogle from '../helpers/google-passport';
const routes = Router();
 
routes.get('/google', passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
}));

routes.get('/google/callback', passport.authenticate("google", {
    session: false,
}), controller.callBack);

export default routes;
