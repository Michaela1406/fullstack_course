// Exercise 4.1 Blog list step 1
// Exercise 4.2 Blog list step 2

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
