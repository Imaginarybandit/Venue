//make a middleware  catch errors
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

//export the middleware
module.exports = catchAsync;
