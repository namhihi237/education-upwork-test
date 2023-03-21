module.exports.responseSuccess = function responseSuccess(res, data, status = 200) {
  return res.status(status).json({
    success: true,
    errors: null,
    data: data || null
  });
}


module.exports.responseFailure = function responseFailure(res, errors, status = 500) {
  return res.status(status).json({
    success: false,
    errors,
    data: null
  });
}