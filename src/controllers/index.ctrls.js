const indexControllers = {}; 

indexControllers.renderIndex = (req, res) => {
  res.render('index')
};

module.exports = indexControllers;