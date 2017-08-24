const express = require('express');
const app = express();
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const PORT = 4000;

app.use('/graphql', expressGraphQL({
    graphiql: true,
    schema
}));

app.listen(PORT, ()=>{
    console.log('Express server is running on port: '+ PORT);
    console.log('View graphical on http://localhost:' + PORT + '/graphql');
});