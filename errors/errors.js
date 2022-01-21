exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(404).send({ msg: "Not Found." });
  } else next(err);
};
