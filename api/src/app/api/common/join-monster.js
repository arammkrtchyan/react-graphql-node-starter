import joinMonster from "join-monster";
import knex from "app/common/knex";
import logger from "app/common/logger";

export const resolve = (parent, args, context, resolveInfo) => {
  return joinMonster(
    resolveInfo,
    context,
    sql => {
      const query = knex.raw(sql);

      logger.debug(query.toString());
      return query.then(result => result[0]);
    },
    { dialect: "mysql" }
  );
};
