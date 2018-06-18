import { GraphQLSchema, GraphQLObjectType } from "graphql";
import user from "./user";

const QeryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...user.query
  }
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {}
});

const schema = new GraphQLSchema({
  description: "Api Schema",
  query: QeryType,
  //mutation: MutationType
});

export default schema;
