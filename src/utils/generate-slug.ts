import { nanoid } from "nanoid";

export async function generateUniqueSlug(name: string) {
  const sluggify = `${name}-${nanoid()}`;
  const uniqueSlug = sluggify.replace(/ /g, "-").toLowerCase();
  return uniqueSlug;
}
