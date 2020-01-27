const express = require("express");
const projectRouter = require("./projects/projectRouter.js");
const actionRouter = require("./actions/actionRouter.js");
const server = express();

server.use(express.json());
server.use('/projects', projectRouter);
server.use('/actions', actionRouter);

server.get("/", (req, res) => {
    res.send(`<h2>Welcome to this API!</h2>`);
});

module.exports = server;