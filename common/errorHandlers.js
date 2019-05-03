/**
 * @description handle errors for route
 * @param fn - Function need to handle error.
 * @returns Response error to client.
 */
const routeErrorHandlingMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    res.status(err.code || 500);
    res.json({ message: err.message });
    next(err);
  });
};
/**
 * @description handle validation errors for route
 * @param fn - Validate function.
 * @returns Response error to client.
 */
const validationErrorHandlingMiddleware = inputValidator => (
  req,
  res,
  next
) => {
  const { errors, isValid } = inputValidator(req.body);
  if (!isValid) {
    res.status(400);
    res.json(errors);
    next(errors);
  } else {
    next();
  }
};

module.exports = {
  routeErrorHandlingMiddleware,
  validationErrorHandlingMiddleware
};
