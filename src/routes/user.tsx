import { Hono } from "hono";
import prisma from "../lib/prisma";

export const app = new Hono();

app.get("/", async (c) => {
	try {
		const allUser = await prisma.user.findMany({
			select: {
				username: true,
				fullname: true,
			},
		});
		return c.json(
			{
				success: true,
				message: "List data user",
				data: allUser,
			},
			200
		);
	} catch (error) {
		console.error(`Error get User : ${error}`);
	}
});

app.get("/:username", async (c) => {
	try {
		const username = c.req.param("username");
		const user = await prisma.user.findUnique({
			where: { username },
			select: {
				id: true,
				username: true,
				fullname: true,
				email: true,
				updatedAt: true,
			},
		});
		if (!user) {
			return c.json(
				{
					success: false,
					message: `user not found!`,
				},
				404
			);
		}
		return c.json({
			success: true,
			message: `Detail user ${user.username}`,
			data: user,
		});
	} catch (error) {
		console.error(`Error get user by id : ${error}`);
	}
});

export default app;
