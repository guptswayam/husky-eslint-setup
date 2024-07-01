import Koa from "koa";
import Router from "@koa/router";
import { app, router } from "./index";

// https://jestjs.io/docs/mock-functions
jest.mock("koa", () => {
  class X {
    listen = jest.fn((port, callback) => {
      callback();
    });
    use = jest.fn(() => {});
  }

  return {
    __esModule: true,
    default: X,
  };
});

// jest.mock without any second param mocks all the exported fn with jest.fn()
jest.mock("@koa/router");

describe("index.js", () => {
  it("check router and koa instances", () => {
    expect(app).toBeInstanceOf(Koa);
    expect(router).toBeInstanceOf(Router);
  });

  it("healthcheck route", () => {
    expect(router.get).toHaveBeenCalled();
  });

  it("app.listen", () => {
    expect(app.listen).toHaveBeenCalled();
    expect(app.use).toHaveBeenCalled();
    expect(router.routes).toHaveBeenCalled();
    expect(router.allowedMethods).toHaveBeenCalled();
  });
});
