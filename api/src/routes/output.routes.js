import { Router } from 'express';
import * as controller from '../controllers/output.controllers';
import { verifyToken as authenticateUser, isAdmin } from '../middleware/auth.middleware';
const routes = Router();

// Listing categories
routes.get('/categories', authenticateUser, controller.listCategories);

// Creating new record
routes.post('/', authenticateUser, controller.createOutput);

// Listing my records
routes.get('/', authenticateUser, controller.fetchMyOutput);

// Listing all records
routes.get('/all', authenticateUser, isAdmin, controller.fetchAllOutput);

routes.put(
  '/all/:outputId',
  authenticateUser,
  isAdmin,
  controller.addTagsOnOutput
);

export default routes;
