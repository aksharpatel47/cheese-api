import {
  integer,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';
import { BrandDbTable, IBrand } from './brand';
import { InferModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod/pg';
import { z } from 'zod';

export const CheeseTypeDbTable = pgTable('cheese_types', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
  url: varchar('url', { length: 1024 }).notNull(),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  }),
  deletedAt: timestamp('deleted_at', {
    mode: 'date',
    withTimezone: true,
  }),
});

export type DbCheeseType = InferModel<typeof CheeseTypeDbTable>;
export const CheeseTypeSchema = createInsertSchema(
  CheeseTypeDbTable,
  'camel',
  (schema) => ({
    description: schema.description.optional().nullable(),
  }),
).omit({
  deletedAt: true,
  createdAt: true,
  updatedAt: true,
});
export const CheeseInputSchema = CheeseTypeSchema.omit({
  id: true,
});
export type ICheeseType = z.infer<typeof CheeseTypeSchema>;
export type ICheeseTypeInput = z.infer<typeof CheeseInputSchema>;

export const CheeseDbTable = pgTable('cheeses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
  url: varchar('url', { length: 1024 }).notNull(),
  brandId: integer('brand_id')
    .notNull()
    .references(() => BrandDbTable.id, {
      onUpdate: 'restrict',
      onDelete: 'restrict',
    }),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  }),
  deletedAt: timestamp('deleted_at', {
    mode: 'date',
    withTimezone: true,
  }),
});

export type DbCheese = InferModel<typeof CheeseDbTable>;
export const DbCheeseSchema = createInsertSchema(
  CheeseDbTable,
  'camel',
  (schema) => ({
    description: schema.description.nullable().optional(),
    updatedAt: schema.updatedAt.optional().nullable(),
    deletedAt: schema.deletedAt.optional().nullable(),
  }),
);
export const zCheeseSchema = DbCheeseSchema.omit({ deletedAt: true });
export type ICheeseDto = z.infer<typeof zCheeseSchema>;
export type ICheeseWithBrandDto = Omit<
  ICheeseDto & {
    brand: IBrand;
  },
  'brandId'
>;

export const CheeseAndCheeseTypesDbTable = pgTable(
  'cheeses_and_cheese_types',
  {
    cheeseId: integer('cheese_id').references(() => CheeseDbTable.id, {
      onUpdate: 'restrict',
      onDelete: 'restrict',
    }),
    cheeseTypeId: integer('cheese_type_id').references(
      () => CheeseTypeDbTable.id,
      {
        onUpdate: 'restrict',
        onDelete: 'restrict',
      },
    ),
  },
  (cheeseAndCheeseTypes) => {
    return {
      cheeseAndCheeseTypeUnique: uniqueIndex(
        'cheese_and_cheese_type_unique',
      ).on(cheeseAndCheeseTypes.cheeseTypeId, cheeseAndCheeseTypes.cheeseId),
    };
  },
);

export type DbCheeseAndCheeseTypes = InferModel<
  typeof CheeseAndCheeseTypesDbTable
>;
export const CheeseAndCheeseTypesDbSchema = createInsertSchema(
  CheeseAndCheeseTypesDbTable,
  'camel',
);

export interface ICheeseInput {
  name: string;
  url: string;
}
