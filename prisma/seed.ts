import { recipes } from "../src/data/recipes";
import { prisma } from "../src/lib/prisma";

async function seed() {
	for (let recipe of recipes) {
		const newRecipesSeed = await prisma.recipes.upsert({
			where: { slug: recipe.slug },
			update: recipe,
			create: recipe,
		});
		console.log(`Recipe : ${newRecipesSeed.slug}`);
	}
}

seed()
	.catch((e) => {
		console.log(e);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect();
	});
