const apiResponse = (res, data, status = 200, sendLength = false) => {
  if (sendLength)
    return res.status(status).json({
      message: 'success',
      length: data.length,
      data,
    })
  return res.status(status).json({ message: 'success', data })
}

const jwtTokenApiResponse = (res, token, status = 200) => {
  return res.status(status).json({ message: 'success', token })
}

const apiError = (res, message, status = 500) => {
  return res.status(status).json({ status: 'fail', message })
}

module.exports = { apiResponse, apiError, jwtTokenApiResponse }
