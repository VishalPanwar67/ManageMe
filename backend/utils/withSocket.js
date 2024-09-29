const withSocket = (handler, io) => {
  return (req, res) => handler(req, res, io);
};

export { withSocket };
