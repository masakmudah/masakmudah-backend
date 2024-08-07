import { Hono } from "hono";
import { cors } from "hono/cors";

import registerRoute from "./routes/register";

const app = new Hono();

app.use("*", cors());
app.get("/", (c) => {
	return c.json({
		message: "Masak Mudah API",
	});
});

app.route("/auth/register", registerRoute);
