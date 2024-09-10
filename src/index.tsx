import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";

import { usersRoute } from "./modules/users/route";
import { authRoute } from "./modules/auth/route";
import { recipesRoute } from "./modules/recipes/route";
import { categoriesRoute } from "./modules/categories/route";
import { savedRecipesRoute } from "./modules/saved-recipes/route";
import { WelcomePage } from "./welcome";

type Bindings = {
  TOKEN: string;
};

type Variables = {
  user: {
    id: string;
  };
};

export type HonoApp = { Bindings: Bindings; Variables: Variables };

const app = new OpenAPIHono({ strict: false });

app.use("*", cors());

// OPEN API
app.doc31("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "MasakMudah REST API",
    description:
      "MasakMudah provides access to a large collection of recipe.\n\nIt allows users to search for recipe, retrieve recipe details, and publish own recipe also saving another user recipe.",
  },
});

// SECURITY SCHEMES
app.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  }
);

app.route("/auth", authRoute);
app.route("/users", usersRoute);
app.route("/recipes", recipesRoute);
app.route("/categories", categoriesRoute);
app.route("/saved-recipes", savedRecipesRoute);

// SWAGGER UI
app.get("/ui", swaggerUI({ url: "/doc" }));

// WELCOME PAGE
app.get("/", (c) =>
  c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Masakmudah REST API</title>
        <meta
          name="description"
          content="MasakMudah provides access to a large collection of recipe."
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <WelcomePage />
      </body>
    </html>
  )
);

export default app;
