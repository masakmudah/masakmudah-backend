import { Hono } from "hono";
import { checkUserToken } from "../midleware/cekUserToken";
import { HonoApp } from "..";

const app = new Hono<HonoApp>();

app.get("/", checkUserToken, async (c) => {
	// Note: might be unnecessary since this is token-based auth
	// We can just remove the token on the client or frontend
	return c.json({
		message: "Logout",
	});
});

export default app;
