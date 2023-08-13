// Write your "actions" router here!
const express = require('express')
const Action = require('./actions-model')
const { validateActionID, validateActionBody } = require('./actions-middlware')

const router = express.Router()

router.get('/', (req, res, next) => {
  Action.get()
    .then(actions => {
      res.json(actions)
    })
    .catch(next)
})

router.get('/:id', validateActionID, (req, res) => {
  res.json(req.action)
})

router.post('/', validateActionBody, (req, res, next) => {
  
})

router.put('/:id', (req, res, next) => {
  
})

router.delete('/:id', (req, res, next) => {
  
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'something went wrong inside of the actions router',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router
