import { isUnique } from "@/util";
import { z } from "zod";

export const productSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number().min(0).max(5),
  stock: z.number(),
  brand: z.string(),
  thumbnail: z.string().url(),
  images: z.string().url().array(),
});

export const productsSchema = z.array(productSchema);

export const favoritesSchema = z.array(z.number().int()).refine(arr => isUnique(arr));
export const boughtSchema = favoritesSchema;