const apiResponse = (res, data, status = 200, sendLength = false) => {
  if (sendLength)
    res.status(status).json({
      message: 'success',
      length: data.length,
      data,
    })
  res.status(status).json({ message: 'success', data })
}

const jwtTokenApiResponse = (res, token, status = 200) => {
  res.status(status).json({ message: 'success', token })
}

const apiError = (res, message, status = 500) => {
  res.status(status).json({ status: 'fail', message })
}

module.exports = { apiResponse, apiError, jwtTokenApiResponse }
