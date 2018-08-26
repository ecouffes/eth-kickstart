// see: https://github.com/fridays/next-routes

const routes = require('next-routes')();

routes
    .add('/projects/new', '/projects/new')
    .add('/projects/:address', '/projects/show');

module.exports = routes;