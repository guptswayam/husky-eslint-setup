import Koa from "koa";
import Router from "@koa/router";
import Logger from "./util/logger.js";
import "./util/gloabl-error-handling.js";
import * as util from "util";

const sleep = util.promisify(setTimeout);

const logger = new Logger("hes");

const app = new Koa();
const router = new Router();

logger.info(process.env.npm_package_version);
logger.info(process.env.npm_package_name);

// More on Koa: https://www.linkedin.com/pulse/building-user-authentication-authorization-apis-koajs-behara-1c
router.get("/healthcheck", async (ctx, next) => {
  const { isError } = ctx.request.query;

  if (isError === "true") {
    throw ctx.throw(400, "manual error");
  }

  ctx.status = 200;
  ctx.body = {
    status: "Success",
  };

  await next();

  await sleep(4000);
  console.log("Swayam");

  return null;
});

app.use(async function jsonErrorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    logger.warn(err);
    ctx.status = err.status || err.statusCode || 500;
    ctx.body = { message: err.message };
  }
});

app.listen(4000, function listenCallback() {
  app.use(router.routes());
  app.use(router.allowedMethods());
  logger.info("Server Started at port 4000");
});

export { app, router };
