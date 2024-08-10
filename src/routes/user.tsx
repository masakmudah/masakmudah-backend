import { Hono } from "hono";
import prisma from "../lib/prisma";

export const app = new Hono();

app.get("/", async (c) => {
	try {
		const allUser = await prisma.user.findMany({
			select: {
				id: true,
				username: true,
				fullname: true,
				createdAt: true,
				updatedAt: true,
				password: {
					select: {
						id: true,
					},
				},
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
				createdAt: true,
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

app.delete("/:username", async (c) => {
	const id = c.req.param("id");
	const user = await prisma.user.delete({
		where: { id: id },
	});
	if (!id) {
		return c.json({ message: "users Not Found" });
	}
	return c.json(`user by name ${user.username} deleted`);
});

app.put("/:username", async (c) => {
	try {
		const username = c.req.param("username");
		const body = await c.req.json();
		if (!username) {
			return c.json({ message: `user not found`, Status: 404 });
		}
		const newUser = await prisma.user.update({
			where: { username },
			data: {
				username: String(body.username),
				email: String(body.email),
				fullname: String(body.firstName),
			},
		});
		return c.json(newUser);
	} catch (error) {
		console.error(`Error user : ${error}`);
	}
});

export default app;
