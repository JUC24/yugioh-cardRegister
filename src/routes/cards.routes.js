const { Router } = require('express');
const router = Router();

const {
  renderCardForm,
  createNewCard,
  renderCards,
  renderEditForm,
  updateCard,
  deleteCard,
  searchCards,
  filterCards,
  sortCards
} = require('../controllers/cards.ctrls');

router.get('/cards/add', renderCardForm);

router.post('/cards/new-card', createNewCard);

router.get('/cards', renderCards);

router.get('/cards/update/:id', renderEditForm);

router.put('/cards/edit/:id', updateCard);

router.delete('/cards/delete/:id', deleteCard);

router.get('/cards/search', searchCards);

router.get('/cards/filter', filterCards);

router.get('/cards/sort', sortCards);

module.exports = router;
