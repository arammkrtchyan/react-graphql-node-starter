import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from "graphql";
import { GraphQLDateTime } from "graphql-iso-date";
import { encodeId } from "./common/ids";
import { resolveUserId } from "./common/auth";
import { Post } from "./post";
import { Comment } from "./comment";
import { resolve } from "./common/join-monster";
import { escape } from "sqlstring";

export const User = new GraphQLObjectType({
  name: "User",
  sqlTable: "accounts",
  uniqueKey: "id",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      sqlColumn: "id",
      resolve: user => encodeId(user.id)
    },
    email: {
      type: GraphQLString,
      sqlColumn: "email_address"
    },
    fullName: {
      type: GraphQLString,
      description: "User's full name",
      sqlDeps: ["first_name", "last_name"],
      resolve: user => `${user.first_name} ${user.last_name}`
    },
    createTime: {
      type: new GraphQLNonNull(GraphQLDateTime),
      sqlColumn: "create_time"
    },
    posts: {
      description: "A list of Posts the user has written",
      type: new GraphQLList(Post),
      sqlJoin: (userTable, postTable) =>
        `${userTable}.id = ${postTable}.author_id`,
      orderBy: { id: "ASC" }
    },
    comments: {
      description: "Comments the user has written on people's posts",
      type: new GraphQLList(Comment),
      sqlJoin: (userTable, commentTable) =>
        `${userTable}.id = ${commentTable}.author_id AND ${commentTable}.archived = (0 = 1)`
    },
    following: {
      description: 'Users that this user is following',
      type: new GraphQLList(User),
      junction: {
        sqlTable: 'relationships',
        sqlJoins: [
          (followerTable, relationTable) => `${followerTable}.id = ${relationTable}.follower_id`,
          (relationTable, followeeTable) => `${relationTable}.followee_id = ${followeeTable}.id`
        ]
      }
    }
  })
});

const findUser = {
  type: User,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  where: (usersTable, args, ctx) =>
    `${usersTable}.id = ${escape(ctx.params.id)}`,
  resolve: (parent, args, ctx, resolveInfo) => {
    const id = resolveUserId(args.id);
    return resolve(parent, null, { ...ctx, params: { id } }, resolveInfo);
  }
};

export default {
  query: {
    user: findUser
  }
};
