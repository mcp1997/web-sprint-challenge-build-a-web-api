const express = require('express');
const helmet = require('helmet')
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

const logger = (req, res, next) => {
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

const server = express();

server.use(express.json())
server.use(helmet())
server.use(logger)

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.use('*', (req, res) => {
  res.status(404).json({
    message: "The resource you are looking for does not exist"
  })
})

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
