import { Router } from 'express';
import * as controller from '../controllers/user.controllers';
import { verifyToken as authenticateUser, isAdmin } from '../middleware/auth.middleware';
const routes = Router();

// Listing users
routes.get('/', authenticateUser, isAdmin, controller.listOfUsers);
routes.put('/:userId', authenticateUser, isAdmin, controller.updateUserRole);

export default routes;
