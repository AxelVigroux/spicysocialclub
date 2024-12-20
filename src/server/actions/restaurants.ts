"use server";
import { z } from "zod";
import { createRestaurantSchema, restaurants } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export async function createRestaurant(
  value: z.infer<typeof createRestaurantSchema>,
) {
  try {
    const data = createRestaurantSchema.parse(value);

    await db.insert(restaurants).values({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      stats: {
        location: 0,
        spicy: 0,
        service: 0,
        presentation: 0,
        quantity: 0,
        secondaryEffects: 0,
      },
      comments: [],
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}

export async function getRestaurants() {
  try {
    const allRestaurants = await db
      .select()
      .from(restaurants)
      .orderBy(restaurants.createdAt);
    return { success: true, data: allRestaurants };
  } catch (err) {
    console.error("Error fetching restaurants:", err);
    return { success: false, error: err };
  }
}

export async function getRestaurant(id: number) {
  try {
    const [restaurant] = await db
      .select()
      .from(restaurants)
      .where(eq(restaurants.id, id));

    if (!restaurant) {
      return { success: false, error: "Restaurant not found" };
    }

    return { success: true, data: restaurant };
  } catch (err) {
    console.error("Error fetching restaurant:", err);
    return { success: false, error: err };
  }
}

export async function addComment(
  restaurantId: number,
  comment: {
    author: string;
    text: string;
    stats: {
      location: number;
      spicy: number;
      service: number;
      presentation: number;
      quantity: number;
      secondaryEffects: number;
    };
  },
) {
  try {
    const [restaurant] = await db
      .select()
      .from(restaurants)
      .where(eq(restaurants.id, restaurantId));

    if (!restaurant) {
      return { success: false, error: "Restaurant not found" };
    }

    const newComment = {
      ...comment,
      date: new Date(),
    };

    const currentComments = restaurant.comments || [];
    const updatedComments = [...currentComments, newComment];

    await db
      .update(restaurants)
      .set({ comments: updatedComments })
      .where(eq(restaurants.id, restaurantId));

    return { success: true, data: newComment };
  } catch (err) {
    console.error("Error adding comment:", err);
    return { success: false, error: err };
  }
}
