import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod/pg';
import { z } from 'zod';

export const BrandDbTable = pgTable('brands', {
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

export const DbBrandSchema = createInsertSchema(
  BrandDbTable,
  'camel',
  (schema) => ({
    description: schema.description.optional().nullable(),
    updatedAt: schema.updatedAt.optional().nullable(),
    deletedAt: schema.deletedAt.optional().nullable(),
  }),
);
export const BrandSchema = DbBrandSchema.omit({
  deletedAt: true,
});
export type IBrand = z.infer<typeof BrandSchema>;
export const BrandInputSchema = BrandSchema.pick({
  name: true,
  description: true,
  url: true,
});
export type IBrandInput = z.infer<typeof BrandInputSchema>;
