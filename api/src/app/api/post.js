import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} from "graphql";
import { GraphQLDateTime } from "graphql-iso-date";
import { encodeId } from "./common/ids";
import { Comment } from "./comment";
import { User } from "./user";

export const Post = new GraphQLObjectType({
  description: "A post from a user",
  name: "Post",
  sqlTable: "posts",
  uniqueKey: "id",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: post => encodeId(post.id)
    },
    body: {
      description: "The content of the post",
      type: GraphQLString
    },
    author: {
      description: "The user that created the post",
      type: User,
      sqlJoin: (postTable, userTable) =>
        `${postTable}.author_id = ${userTable}.id`
    },
    numComments: {
      description: "The number of comments on this post",
      type: GraphQLInt,
      sqlExpr: postTable =>
        `(SELECT count(*) FROM comments WHERE post_id = ${postTable}.id AND archived = (0 = 1))`
    },
    archived: {
      type: GraphQLBoolean
    },
    createdAt: {
      type: GraphQLDateTime,
      sqlColumn: "created_at"
    },
    comments: {
      type: new GraphQLList(Comment),
      sqlBatch: {
        thisKey: "post_id", // key on comments table.
        parentKey: "id" // key on post table.
      },
      where: commentTable => `${commentTable}.archived = FALSE`
    }
  })
});
