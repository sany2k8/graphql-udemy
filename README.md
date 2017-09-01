# Creating a GraphQL API

**Clone it** : https://github.com/sany2k8/graphql-udemy.git

**Download dependency** :  `npm install`

**Start Json Server** : `npm run json:server`

**Start GraphQL** : `npm start`

**Play at Live** :  https://graphql-sany2k8.c9users.io/graphql

**Example Queries:**

```
    {
    user(id:"103"){
      firstName
      age
      company{
        name
        description
      }
    }
    }
```


```
      company(id:"201"){
        name
        users {
        firstName
        age
        }
      }
    }
```


