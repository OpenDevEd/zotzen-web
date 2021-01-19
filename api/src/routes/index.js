import { Router } from 'express';
import auth from './auth.routes';
import output from './output.routes';

const routes = Router();

routes.use('/auth', auth);
routes.use('/output', output);

export default routes;
