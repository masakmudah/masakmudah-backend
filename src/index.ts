import { Hono } from "hono";
import { cors } from "hono/cors";

import registerRoute from "./routes/register";
import { userRoute } from "./routes/user";
import loginRoute from "./routes/login";
import { recipesRoute } from "./routes/recipes";
import { categories } from "./routes/categories";

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

app.route("/auth/login", loginRoute);
app.route("/auth/register", registerRoute);
app.route("/user", userRoute);
app.route("/recipies", recipesRoute);
app.route("/recipies", recipesRoute);
app.route("/categories", categories);

export default app;
