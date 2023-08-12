// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const { validateProjID, validateProjBody } = require('./projects-middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
  Project.get()
    .then(projects => {
      res.json(projects)
    })
    .catch(next)
})

router.get('/:id', validateProjID, (req, res) => {
  res.json(req.project)
})

router.post('/', validateProjBody, (req, res, next) => {
  Project.insert(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(next)
})

router.put('/:id', validateProjID, validateProjBody, (req, res, next) => {
  Project.update(req.params.id, req.body)
    .then(updated => {
      res.json(updated)
    })
    .catch(next)
})

router.delete('/:id', validateProjID, (req, res, next) => {
  Project.remove(req.params.id)
    .then(() => {
      res.status(200).json()
    })
    .catch(next)
})

router.get('/:id/actions', validateProjID, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then(actions => {
      res.json(actions)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'something went wrong inside of the projects router',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router
