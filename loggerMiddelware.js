const logger = (request, response, next) => {
  console.log('-----------------')
  console.log('logger middleware')
  console.log('-----------------')
  console.log(request)
  console.log(response)
  console.log('----------------------')
  console.log('ends logger middleware')
  console.log('----------------------')
  next()
}

module.exports = logger
