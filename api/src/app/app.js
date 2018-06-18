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

import schema from "./api";

const app = new koa();

app.on("error", err => {
  logger.error(err);
});

const health = async ctx => {
  ctx.status = 200;
};

app.use(
  koaCompress({
    flush: zlib.Z_SYNC_FLUSH
  })
);

app.use(koaBody({ multipart: true }));

app.use(conditional());
app.use(etag());

const isDevEnv = process.env.NODE_ENV || "development" === "development";

app.use(morgan(isDevEnv ? "dev" : "short"));

const router = new koaRouter({
  prefix: "/api"
});

router.post("/graphql", graphqlKoa({ schema }));
router.get("/graphql", graphqlKoa({ schema }));

router.get('/health', health);

if (isDevEnv) {
  router.get("/graphiql", graphiqlKoa({ endpointURL: "/api/graphql" }));
}

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
