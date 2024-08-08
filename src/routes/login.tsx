import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { HonoApp } from "..";
import prisma from "../lib/prisma";
import { verifyPassword } from "../lib/password";
import { createToken } from "../lib/jwt";
import { checkUserToken } from "../midleware/cekUserToken";

const app = new Hono<HonoApp>();

app.post(
	"/",
	zValidator(
		"json",
		z.object({
			username: z.string(),
			password: z.string(),
		})
	),
	async (c) => {
		const body = c.req.valid("json");

		const foundUser = await prisma.user.findUnique({
			where: { username: body.username },
			include: { password: { select: { hash: true } } },
		});

		if (!foundUser) {
			c.status(404);
			return c.json({ message: "Cannot login because user not found" });
		}

		if (!foundUser?.password?.hash) {
			c.status(400);
			return c.json({
				message: "Cannot login because user doesn't have a password",
			});
		}

		const validPassword = await verifyPassword(
			foundUser.password.hash,
			body.password
		);

		if (!validPassword) {
			c.status(400);
			return c.json({
				message: "Password incorrect",
			});
		}

		const token = await createToken(foundUser.id);

		if (!token) {
			c.status(400);
			return c.json({ message: "Token failed to create" });
		}

		return c.json({
			message: "Login successful",
			token,
		});
	}
);

app.get("/auth/user", checkUserToken(), async (c, next) => {
	const user = c.get("user");
	const userData = await prisma.user.findUnique({
		where: { id: user.id },
		select: {
			id: true,
			username: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return c.json({
		message: "User data",
		user: userData,
	});
});

export default app;
