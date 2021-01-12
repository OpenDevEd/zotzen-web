import { Router } from 'express';
import auth from './auth.routes';

const routes = Router();

routes.use('/auth', auth);

export default routes;
