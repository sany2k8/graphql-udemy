const express = require('express');
const app = express();
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const PORT = 4000;

function loggingMiddleware(req, res, next) {
    console.log('ip:', req.ip);
    next();
}

let root = {
    ip: function (args, request) {
        return request.ip;
    }
};
app.use(loggingMiddleware);
app.use('/graphql', expressGraphQL({
    graphiql: true,
    schema,
    rootValue: root,
}));

app.listen(PORT, ()=>{
    console.log('Express server is running on port: '+ PORT);
    console.log('View graphical on http://localhost:' + PORT + '/graphql');
});