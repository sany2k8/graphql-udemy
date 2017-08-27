const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const CompanyType = new GraphQLObjectType({
   name: "Company",
   fields: ()=> ({
       id: { type: GraphQLString},
       name: { type: GraphQLString},
       description: { type: GraphQLString},
       users:{
           type: new GraphQLList(UserType),
           resolve(parentValue, args){
               return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                   .then(res => res.data)
           }
       }
   })
});
const UserType = new GraphQLObjectType({
   name: "User",
   fields: () => ({
       id:{ type: GraphQLString},
       firstName:{ type: GraphQLString},
       age:{ type: GraphQLInt},
       company :{
           type: CompanyType,
           resolve(parentValue, args){
               return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                   .then(res => res.data)
           }
       }
   })
});

const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields:{
       user: {
           type: UserType,
           args: { id:{ type: GraphQLString }},
           resolve(parentValue, args){
                return axios.get(`http://localhost:3000/users/${args.id}`)
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
       }
   }
});

const Mutation = new GraphQLObjectType({
    name : "Mutation",
    fields: {
        addUser:{
            type: UserType,
            args:{
                firstName: { type: new GraphQLNonNull(GraphQLString)},
                age: { type: new GraphQLNonNull(GraphQLInt)},
                companyId: { type: GraphQLString},
            },
            resolve(parentValue, {firstName, age, companyId}){
                return axios.post('http://localhost:3000/users', {firstName, age, companyId})
                    .then(res => res.data)
            }
        },
        deleteUser:{
            type: UserType,
            args:{
                id: { type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args){
                return axios.delete(`http://localhost:3000/users/${args.id}`)
                    .then(res => res.data)
            }
        },
        editUser:{
            type: UserType,
            args:{
                id: { type: new GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLInt},
                firstName: { type: GraphQLString},
                companyId: { type: GraphQLString},
            },
            resolve(parentValue, args){
                return axios.put(`http://localhost:3000/users/${args.id}`, args)
                    .then(res => res.data)
            }
        },
        addCompany:{
            type: CompanyType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString)},
                description: { type: GraphQLString},
            },
            resolve(parentValue, {name, description}){
                return axios.post('http://localhost:3000/companies', {name, description})
                    .then(res => res.data)
            }
        },
        deleteCompany:{
            type: CompanyType,
            args:{
                id: { type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args){
                return axios.delete(`http://localhost:3000/companies/${args.id}`)
                    .then(res => res.data)
            }
        },
        editCompany:{
            type: CompanyType,
            args:{
                id: { type: new GraphQLNonNull(GraphQLString)},
                name: { type: GraphQLString},
                description: { type: GraphQLString},
            },
            resolve(parentValue, args){
                return axios.put(`http://localhost:3000/companies/${args.id}`, args)
                    .then(res => res.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
});
