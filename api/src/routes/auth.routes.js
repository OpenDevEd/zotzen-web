import { Router } from 'express';
import * as controller from '../controllers/auth.controllers';
const routes = Router();

routes.post('/login', controller.login);

export default routes;
