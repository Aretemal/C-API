export const tryCatch = (middlewareFunction) => async (req, res, next) => {
  try {
    await middlewareFunction(req, res, next);
  } catch (error) {
    next(error);
  }
};
