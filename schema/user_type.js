const graphql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;
//const CompanyType = require('./company_type');


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id:{ type: GraphQLString},
        firstName:{ type: GraphQLString},
        age:{ type: GraphQLInt},
        company :{
            type: require('./company_type'),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(res => res.data)
            }
        }
    })
});

module.exports = UserType;