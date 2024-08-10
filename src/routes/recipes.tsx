import { Hono } from "hono";
import prisma from "../lib/prisma";

export const app = new Hono();

app.get("/", async (c) => {
	try {
		const allRecipie = await prisma.recipes.findMany();
		return c.json(
			{
				success: true,
				message: "List data Risipes",
				data: allRecipie,
			},
			200
		);
	} catch (error) {
		console.error(`Error get recipe : ${error}`);
	}
});

app.get("/:slug", async (c) => {
	try {
		const slugParam = c.req.param("slug");

		if (!slugParam) {
			c.status(204);
			return c.json({ message: "Recipie ID needed" });
		}

		const recipie = await prisma.recipes.findFirst({
			where: { slug: slugParam },
		});

		if (recipie == null) {
			c.status(204);
			return c.json({ message: "Recipie doesn't exists!" });
		}

		return c.json({
			success: true,
			message: `Recipie ${recipie.slug}`,
			data: recipie,
		});
	} catch (err: any) {
		console.log(err.message);
	}
});

export default app;
