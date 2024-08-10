import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/password";

const app = new Hono();

app.post(
	"/",
	zValidator(
		"json",
		z.object({
			username: z.string(),
			email: z.string(),
			fullname: z.string(),
			password: z.string(),
		})
	),
	async (c) => {
		const body = c.req.valid("json");

		try {
			const newUser = await prisma.user.create({
				data: {
					username: body.username,
					email: body.email,
					fullname: body.fullname,
					password: {
						create: {
							hash: await hashPassword(body.password),
						},
					},
				},
			});

			return c.json({
				message: "Register new user successful",
				newUser: {
					username: newUser.username,
				},
			});
		} catch (error) {
			c.status(400);
			return c.json({ message: "Cannot register user." });
		}
	}
);

export const registerRoute = app;
