// add middlewares here related to projects
const Project = require('./projects-model')

const validateProjID = (req, res, next) => {
  console.log('validateProjID middleware')
  Project.get(req.params.id)
    .then(project => {
      if(!project) {
        res.status(404).json({
          message: "project not found"
        })
      } else {
        req.project = project
        next()
      }
    })
    .catch(next)
}

const validateProjBody = (req, res, next) => {
  console.log('validateProjBody middleware')
  const { name, description } = req.body
  if(!name || !description) {
    res.status(400).json({
      message: "Project name and description required"
    })
  } else {
    next()
  }
}

module.exports = { validateProjID, validateProjBody }