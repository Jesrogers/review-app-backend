const unknownEndpoint = (req, res) => {
  res.status(404).end();
};

module.exports = unknownEndpoint;
