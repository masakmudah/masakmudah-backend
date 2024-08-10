import { Hono } from "hono";
import prisma from "../lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const app = new Hono();

app.get("/", async (c) => {
	try {
		const allRecipie = await prisma.recipes.findMany();
		return c.json(
			{
				success: true,
				message: "List data Recipes",
				data: allRecipie,
			},
			200
		);
	} catch (error) {
		console.error(`Error getting recipes: ${error}`);
		return c.json(
			{ success: false, message: "Failed to fetch recipes" },
			500
		);
	}
});

app.get("/:slug", async (c) => {
	try {
		const searchSlug = c.req.query("q");

		if (!searchSlug) {
			const allRecipie = await prisma.recipes.findMany({
				where: {},
				orderBy: [{ createdAt: "desc" }],
			});

			return c.json(allRecipie);
		}

		const searchRecipe = await prisma.recipes.findMany({
			where: {
				recipe: {
					contains: searchSlug,
					mode: "insensitive",
				},
			},
		});

		return c.json(searchRecipe);
	} catch (err: any) {
		console.log(err.message);
	}
});

app.post(
	"/create",
	zValidator(
		"json",
		z.object({
			recipe: z.string(),
			description: z.string(),
			imageURL: z.string().url(),
			slug: z.string(),
			ingredients: z.string(),
			cookingIntructions: z.string(),
			userId: z.string(),
		})
	),
	async (c) => {
		const body = c.req.valid("json");
		try {
			const newRecipe = await prisma.recipes.create({
				data: {
					recipe: body.recipe,
					description: body.description,
					imageURL: body.imageURL,
					slug: body.slug,
					ingredients: body.ingredients,
					cookingIntructions: body.cookingIntructions,
					userId: body.userId,
				},
			});
			return c.json(
				{
					success: true,
					message: "New recipe created successfully",
					newRecipe: {
						recipe: newRecipe.recipe,
					},
				},
				201
			);
		} catch (error) {
			console.error(`Error creating recipe: ${error}`);
			return c.json({ message: "Cannot create recipe." }, 400);
		}
	}
);

export default app;
