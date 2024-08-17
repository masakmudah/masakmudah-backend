import { Hono } from "hono";
import { checkUserToken } from "../midleware/cek-user-token";
import { HonoApp } from "..";

const app = new Hono<HonoApp>();

app.get("/", checkUserToken, async (c) => {
  return c.json({
    message: "Logout",
  });
});

export const logoutRoute = app;
