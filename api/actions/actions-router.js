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
  Action.insert(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(next)
})

router.put('/:id', validateActionID, validateActionBody, (req, res, next) => {
  console.log(req.body)
  Action.update(req.params.id, req.body)
    .then(updated => {
      res.json(updated)
    })
    .catch(next)
})

router.delete('/:id', validateActionID, (req, res, next) => {
  Action.remove(req.params.id)
    .then(() => {
      res.status(200).json()
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'something went wrong inside of the actions router',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router
