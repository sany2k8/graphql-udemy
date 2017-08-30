const graphql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLList} = graphql;
const CompanyType = require('./company_type');
const UserType = require('./user_type');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: UserType,
            args: { id:{ type: GraphQLString }},
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(res => res.data)
            }
        },
        users:{
            type: new GraphQLList(UserType),
            resolve(parentValue,args){
                return axios.get('http://localhost:3000/users')
                    .then(res => res.data)
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString}},
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                    .then(res => res.data)
            }
        },
        companies:{
            type: new GraphQLList(CompanyType),
            resolve(parentValue,args){
                return axios.get('http://localhost:3000/companies')
                    .then(res => res.data)
            }
        },
    })
});

module.exports = RootQuery;

