const graphql = require('graphql');
const {GraphQLSchema} = graphql;

const RootQuery = require('./root_query_type');
const Mutation = require('./mutation_type');


module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
});
