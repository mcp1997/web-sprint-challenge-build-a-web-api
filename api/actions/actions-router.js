// Write your "actions" router here!
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'hello from the actions router'
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'something went wrong inside of the actions router',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router
