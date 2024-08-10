import { Hono } from "hono";
import { cors } from "hono/cors";

import { categories } from "./routes/categories";
import recipiesRoute from "./routes/recipes";
import registerRoute from "./routes/register";
import userRoute from "./routes/user";
import loginRoute from "./routes/login";

type Bindings = {
	TOKEN: string;
};

type Variables = {
	user: {
		id: string;
	};
};

export type HonoApp = { Bindings: Bindings; Variables: Variables };

const app = new Hono();

app.use("*", cors());
app.get("/", (c) => {
	return c.json({
		message: "masakmudah.com API",
		registerURL: "/auth/register",
		loginURL: "/auth/login",
		usersURL: "/user",
		categories: "/categories",
	});
});

app.route("/auth/login", loginRoute);
app.route("/auth/register", registerRoute);
app.route("/user", userRoute);
categories: "/categories",

app.route("/recipies", recipiesRoute);
app.route("/categories", categories);

export default app;
