import { Router } from 'express';
import {
  createCard,
  deleteCard,
  getCards,
  updateCard,
} from '../controllers/card.controller.js';

const router = Router();

router.get('/dashboard', getCards);
router.post('/create', createCard);
router.put('/update/:id', updateCard);
router.delete('/delete/:id', deleteCard);

export default router;
