// utils/withSocket.js
const withSocket = (handler, io) => {
  return (req, res, next) => {
    req.io = io;
    return handler(req, res, next); // Ensure next is passed correctly
  };
};

export { withSocket };
