import Koa from "koa";
import Router from "@koa/router";
import Logger from "./util/Logger.js";
import "./util/gloabl-error-handling.js";

const logger = new Logger("hes");

const app = new Koa();
const router = new Router();

logger.info(process.env.npm_package_version);
logger.info(process.env.npm_package_name);

// More on Koa: https://www.linkedin.com/pulse/building-user-authentication-authorization-apis-koajs-behara-1c
router.get("/healthcheck", (ctx) => {
  ctx.status = 200;
  ctx.body = {
    status: "Success",
  };
});

app.listen(4000, function listenCallback() {
  app.use(router.routes());
  app.use(router.allowedMethods());
  logger.info("Server Started at port 4000");
});

export { app, router };
