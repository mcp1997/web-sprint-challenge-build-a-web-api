// add middlewares here related to actions
const Action = require('./actions-model')
const Project = require('../projects/projects-model')

const validateActionID = (req, res, next) => {
  Action.get(req.params.id)
    .then(action => {
      if(!action) {
        res.status(404).json({
          message: "action not found"
        })
      } else {
        req.action = action
        next()
      }
    })
    .catch(next)
}

const validateActionBody = (req, res, next) => {
  const { project_id, description, notes, completed } = req.body
  if(description.length > 128) {
    res.status(400).json({
      message: "Action description cannot be longer than 128 characters"
    })
  } else if(!description || !notes || !project_id) {
    res.status(400).json({
      message: "Action description, notes, and Project ID required"
    })
  } else if(req.method === 'PUT' && typeof completed !== 'boolean') {
    res.status(400).json({
      message: "description, notes, and completion status required to update Action"
    })
  } else {
    Project.get(project_id)
      .then(project => {
        if(!project) {
          res.status(404).json({
            message: "Cannot add Action to non-existent Project"
          })
        } else {
          next()
        }
      })
      .catch(next)
  }
}

module.exports = { validateActionID, validateActionBody }