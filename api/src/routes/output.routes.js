import { Router } from 'express';
import * as controller from '../controllers/output.controllers';
<<<<<<< HEAD
import { verifyToken } from '../middleware/auth.middleware';
const routes = Router();

// Listing categories
routes.get('/categories', verifyToken, controller.listCategories);

// Listing my records
routes.get('/', verifyToken, controller.test);

// Creating new record
routes.post('/', verifyToken, controller.test);
=======
import { verifyToken as authenticateUser } from '../middleware/auth.middleware';
const routes = Router();

// Listing categories
routes.get('/categories', authenticateUser, controller.listCategories);

// Listing my records
routes.get('/', authenticateUser, controller.test);

// Creating new record
routes.post('/', authenticateUser, controller.test);
>>>>>>> caac3b07f8893ed3061c5995799549cec9566abf

export default routes;
