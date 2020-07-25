'use strict'
const Path = require('path')
const route = Path.join(__dirname, '..').split(Path.sep).pop()

const routePath = `/${route}`
const validations = require('./validations')
const handlers = require('./handlers')
const routes = [
  {
    method: 'post',
    name: `${route}:create`,
    path: routePath,
    validate: validations.create,
    needAuth: true,
    handler: handlers.getAll
  },
  {
    method: 'get',
    name: `${route}:getAll`,
    path: routePath,
    validate: validations.getAll,
    needAuth: true,
    handler: handlers.getAll
  },
  {
    method: 'get',
    name: `${route}:getById`,
    path: `${routePath}/:id`,
    validate: null,
    needAuth: true,
    handler: handlers.getAll
  },
  {
    method: 'put',
    name: `${route}:updateById`,
    path: `${routePath}/:id`,
    validate: validations.updateById,
    needAuth: true,
    handler: handlers.getAll
  },
  {
    method: 'delete',
    name: `${route}:removeById`,
    path: `${routePath}/:id`,
    validate: null,
    needAuth: true,
    handler: handlers.getAll
  }
]

module.exports = routes
