import { prisma } from "../lib/prisma";

export async function getCategoryIdBySlug(slugArray: string[]) {
  let ids: string[] = [];
  for (const slug of slugArray) {
    const result = await prisma.category.findFirst({
      where: { slug: slug },
      select: {
        id: true,
      },
    });

    if (result?.id) {
      ids.push(result?.id);
    }
  }

  return ids;
}
