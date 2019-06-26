"use strict";

const ValidationError = router => {
  router.use(function(error, req, res) {
    if (error.name === "ValidationError") {
      return res.status(422).json(
        {
          errors: Object.keys(error.errors).reduce(function(errors, key) {
            errors[key] = errors.errors[key.message];
            return res.json(errors);
          })
        },
        {}
      );
    }
  });
};

module.exports = { ValidationError };
