const { createServer } = require('http');
const next = require('next');
const routes = require('./routes');

const app = next({
    dev: process.env.NODE_ENV !== 'production'
});
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    createServer(handler).listen(3000, err => {
        if (err) throw err;
        console.log('Ready on localhost:3000');
    });
});

//
// // With express
// const express = require('express')

//
// // Without express
// const {createServer} = require('http')
// app.prepare().then(() => {
//     createServer(handler).listen(3000)
// })