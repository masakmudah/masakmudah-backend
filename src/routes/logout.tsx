import { Hono } from "hono";
import { checkUserToken } from "../midleware/cekUserToken";
import { HonoApp } from "..";

const app = new Hono<HonoApp>();

app.get("/", checkUserToken, async (c) => {
	return c.json({
		message: "Logout",
	});
});

export const logoutRoute = app;
