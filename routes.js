// see: https://github.com/fridays/next-routes

const routes = require('next-routes')();

routes
    .add('/projects/new', '/projects/new')
    .add('/projects/:address', '/projects/show')
    .add('/projects/:address/requests', '/projects/requests/index')
    .add('/projects/:address/requests/new', '/projects/requests/new');

module.exports = routes;