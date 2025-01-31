const varMiddleware = (req, res, next) => {
  const isToken = req.cookies.token ? true : false
  res.locals.token = isToken
  next();
};

export default varMiddleware;
