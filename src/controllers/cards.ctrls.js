const cardsControllers = {};
const { object } = require('webidl-conversions');
const Card = require('../models/cards')

cardsControllers.renderCardForm = (req, res) => {
  res.render('cards/cardForm')
};

cardsControllers.createNewCard = async (req, res) => {
  const {
    image,
    name,
    cardtype,
    description,
    battlep,
    defensp
  } = req.body;

  const newCard = Card({
    image,
    name,
    cardtype,
    description,
    battlep,
    defensp
  })
  await newCard.save()
  res.redirect('/cards')
};

cardsControllers.renderCards = async (req, res) => {
  let cards;

  // Verificar si se envió un parámetro de filtrado
  if (req.query.cardtype) {
    cards = await Card.find({ cardtype: req.query.cardtype }).lean();
  } else {
    cards = await Card.find().lean();
  }

  // Si no hay parámetros de filtrado, verificar si se envió un parámetro de ordenamiento
  if (!req.query.cardtype && req.query.sortBy) {
    let sortField = 'battlep'; // Ordenar por puntos de batalla por defecto

    if (req.query.sortBy === 'name') {
      sortField = 'name';
    }

    cards = await Card.find().sort({ [sortField]: 1 }).lean();
  }

  res.render('cards/cards', { cards });
};

cardsControllers.renderEditForm = async (req, res) => {
  const card = await Card.findById(req.params.id).lean();
  console.log(card)
  res.render('cards/updateForm', { card })
};

cardsControllers.updateCard = async (req, res) => {
  const {
    image,
    name,
    cardtype,
    description,
    battlep,
    defensp
  } = req.body

  await Card.findByIdAndUpdate(req.params.id,{image, name, cardtype, description, battlep, defensp});
  res.redirect('/cards')
};

cardsControllers.deleteCard = async (req, res) => {
  await Card.findByIdAndDelete(req.params.id);
  res.redirect('/cards')
};

cardsControllers.searchCards = async (req, res) => {
  const searchTerm = req.query.term; // Obtén el término de búsqueda del query string

  try {
    // Utiliza una expresión regular (regex) para realizar una búsqueda insensible a mayúsculas y minúsculas
    const matchingCards = await Card.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } }, // Buscar por nombre
        { cardtype: { $regex: searchTerm, $options: 'i' } }, // Buscar por tipo de carta
      ],
    }).lean();

    res.render('cards/cards', { cards: matchingCards, searchTerm });
  } catch (error) {
    // Manejo de errores
    console.error('Error al buscar cartas:', error);
    res.status(500).send('Error al buscar cartas');
  }
};

cardsControllers.filterCards = async (req, res) => {
  const { cardtype } = req.query;
  const filteredCards = await Card.find({ cardtype }).lean();
  res.render('cards/cards', { cards: filteredCards });
};

cardsControllers.sortCards = async (req, res) => {
  const { sortBy } = req.query;
  let sortField = 'battlep'; // Ordenar por puntos de batalla por defecto

  if (sortBy === 'name') {
    sortField = 'name';
  }

  const sortedCards = await Card.find().sort({ [sortField]: 1 }).lean();
  res.render('cards/cards', { cards: sortedCards });
};

module.exports = cardsControllers;