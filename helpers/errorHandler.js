const errorParser = (errors) => {
  try {
    if (errors[0].type === 'unique violation') {
      return {
        code: 409,
        message: '(sensorId, time) must be unique'
      }
    }
  } catch (error) {
    return {
      code: 400,
      message: 'Packet is corrupt'
    }
  }
}

const errorHandler = (error, res) => {
  //   console.error('Error: ', error.errors)
  const { errors = [] } = error
  const { code, message } = errorParser(errors)
  res.status(code).send(message)
}

module.exports = {
  errorHandler
}