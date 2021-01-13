import { Router } from 'express';
import * as controller from '../controllers/output.controllers';
import { verifyToken } from '../middleware/auth.middleware';
const routes = Router();

// Listing categories
routes.get('/categories', verifyToken, controller.listCategories);

// Listing my records
routes.get('/', verifyToken, controller.test);

// Creating new record
routes.post('/', verifyToken, controller.test);

export default routes;
