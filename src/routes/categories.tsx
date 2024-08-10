import { Hono } from "hono";
// import prisma from "../lib/prisma";
// import { zValidator } from "@hono/zod-validator";
// import { z } from "zod";

const app = new Hono();

app.get("/", async (c) => {
	try {
		return c.json(
			{
				success: true,
				message: "List data Categories",
				data: [
					{
						id: "cat-1",
						category: "Ayam",
						createdAt: "2024-08-10T11:02:49.177Z",
						updatedAt: "2024-08-10T11:02:49.177Z",
					},
					{
						id: "cat-2",
						category: "Sayuran",
						createdAt: "2024-08-10T11:02:49.177Z",
						updatedAt: "2024-08-10T11:02:49.177Z",
					},
					{
						id: "cat-3",
						category: "Sapi",
						createdAt: "2024-08-10T11:02:49.177Z",
						updatedAt: "2024-08-10T11:02:49.177Z",
					},
					{
						id: "cat-4",
						category: "Seafood",
						createdAt: "2024-08-10T11:02:49.177Z",
						updatedAt: "2024-08-10T11:02:49.177Z",
					},
				],
			},
			200
		);
	} catch (error) {
		console.error(`Error getting categories: ${error}`);
		return c.json(
			{ success: false, message: "Failed to fetch categories" },
			500
		);
	}
});

export const categories = app;
