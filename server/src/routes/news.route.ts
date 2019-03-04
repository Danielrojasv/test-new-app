import { Router, Request, Response } from 'express';
import { New } from '../controllers/news.controller'

const router = Router();
const newController = new New();

router.get('/', newController.getAll );

router.get('/synchronize', newController.synchronizeAll );

router.get('/delete-view/:id', newController.deleteView );

export default router;