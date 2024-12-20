// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `spicy_social_club_${name}`,
);

// TABLE
export type Comment = {
  author: string;
  date: Date;
  text: string;
  stats: RestaurantStats;
};

export type RestaurantStats = {
  location: number;
  spicy: number;
  service: number;
  presentation: number;
  quantity: number;
  secondaryEffects: number;
};

export const restaurants = createTable(
  "restaurant",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    address: varchar("address", { length: 256 }).notNull(),
    description: varchar("description", { length: 256 }),
    comments: jsonb("comments").default([]).$type<Comment[]>(),
    stats: jsonb("stats").$type<RestaurantStats>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (restaurant) => ({
    nameIndex: index("restaurant_name_idx").on(restaurant.name),
  }),
);

// SCHEMA

const statsSchema = z.object({
  location: z.number().min(0).max(5),
  spicy: z.number().min(0).max(5),
  service: z.number().min(0).max(5),
  presentation: z.number().min(0).max(5),
  quantity: z.number().min(0).max(5),
  secondaryEffects: z.number().min(0).max(5),
});

const AUTHORS = ["Etienne", "Jo", "Simon", "Axel"] as const;

export const commentSchema = z.object({
  author: z.enum(AUTHORS),
  text: z
    .string()
    .min(5, { message: "Le commentaire doit faire au moins 5 caractères" }),
  stats: statsSchema,
});

export const createRestaurantSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  description: z.string().min(1),
});

// TYPE
export type CreateRestaurantInput = z.infer<typeof createRestaurantSchema>;
export type Restaurant = typeof restaurants.$inferSelect;
export type NewRestaurant = typeof restaurants.$inferInsert;
export type CommentFormData = z.infer<typeof commentSchema>;
