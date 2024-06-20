import Koa from "koa";
import Router from "@koa/router";

const app = new Koa();
const router = new Router();

router.get("/healthcheck", (ctx) => {
  ctx.status = 200;
  ctx.body = {
    status: "Success",
  };
});

app.listen(4000, () => {
  app.use(router.routes());
  app.use(router.allowedMethods());
  console.log("Server Started at port 4000");
});
