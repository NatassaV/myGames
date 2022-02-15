exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlePsqlErrors400 = (err, req, res, next) => {
  if (err.code == "22P02") {
    res.status(400).send({ msg: "oh no, that looks wrong!" });
  } else next(err);
};

exports.handle500Errors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "int server error" });
};

exports.handlesInvalidPaths = (req, res, next) => {
  res.status(404).send({ msg: "Sorry, invalid route" });
};
