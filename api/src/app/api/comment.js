import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList
} from "graphql";
import { encodeId } from "./common/ids";
import { Post } from "./post";
import { User } from "./user";

export const Comment = new GraphQLObjectType({
  name: "Comment",
  sqlTable: "comments",
  uniqueKey: "id",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: comment => encodeId(comment.id)
    },
    body: {
      type: GraphQLString
    },
    post: {
      description: "The post that the comment belongs to",
      type: Post,
      sqlJoin: (commentTable, postTable) =>
        `${commentTable}.post_id = ${postTable}.id`
    },
    likers: {
      description: "Users who liked this comment",
      type: new GraphQLList(User),
      junction: {
        sqlTable: "likes",
        sqlJoins: [
          (commentTable, likeTable) =>
            `${commentTable}.id = ${likeTable}.comment_id`,
          (likeTable, accountTable) =>
            `${likeTable}.account_id = ${accountTable}.id`
        ]
      }
    },
    author: {
      description: "The user who wrote the comment",
      // and one to its User
      type: User,
      sqlJoin: (commentTable, userTable) =>
        `${commentTable}.author_id = ${userTable}.id`
    },
    archived: {
      type: GraphQLBoolean
    }
  })
});
