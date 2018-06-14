import koa from "koa";
import koaRouter from "koa-router";
import koaBody from "koa-bodyparser";
import koaCompress from "koa-compress";
import conditional from "koa-conditional-get";
import etag from "koa-etag";
import morgan from "koa-morgan";
import { graphqlKoa, graphiqlKoa } from "apollo-server-koa";
import logger from "./common/logger";
import zlib from "zlib";

import schema from './api';

const app = new koa();

app.on("error", err => {
  logger.error(err);
});

const health = async ctx => {
  ctx.status = 200;
};
const healthRouter = koaRouter();
healthRouter.get("/", health);
app.use(healthRouter.routes()).use(healthRouter.allowedMethods());

app.use(
  koaCompress({
    flush: zlib.Z_SYNC_FLUSH
  })
);

app.use(koaBody({ multipart: true }));

app.use(conditional());
app.use(etag());

const isDev = process.env.NODE_ENV || "development" === "development";

app.use(morgan(isDev ? "dev" : "short"));

const router = new koaRouter();

router.post("/graphql", graphqlKoa({ schema }));
router.get("/graphql", graphqlKoa({ schema }));

if (isDevEnv) {
  router.get("/graphiql", graphiqlKoa({ endpointURL: "/api/graphql" }));
}

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
