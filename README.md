# Creating a GraphQL API

**Clone it** : https://github.com/sany2k8/graphql-udemy.git

**Download dependency** :  `npm install`

**Start Json Server** : `npm run json:server`

**Start GraphQL** : `npm start`

**Play at Live** :  https://graphql-sany2k8.c9users.io/graphql

**Example Queries:**

**Specific user with company info**

```
{
  user(id: "103") {
    firstName
    age
    company {
      name
      description
    }
  }
}

```


**Specific company with user info*

```
{
  company(id: "201") {
    name
    users {
      firstName
      age
    }
  }
}

```

**Alias**

```
{
  usr1: user(id: "103") {
    firstName
    age
    company {
      name
      description
    }
  }
  usr2: user(id: "102") {
    firstName
    age
    company {
      name
      description
    }
  }
}

```
**Fragment**

```
query FetchUserWithFragment {
  Sany: user(id: "103") {
     ...UserFragment
  }
  Mahadi: user(id: "102") {
    ...UserFragment
  }
}

fragment UserFragment on User{
    firstName
    age
    company {
      name
      description
    }
}
```



