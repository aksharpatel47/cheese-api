import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod/pg';
import { z } from 'zod';

export const UserDbTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(), // 256 is the max length of a bcrypt hash
  refreshToken: varchar('refresh_token', { length: 36 }).notNull(),
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

export const UserDbSchema = createInsertSchema(
  UserDbTable,
  'camel',
  (schema) => ({
    updatedAt: schema.updatedAt.optional().nullable(),
    deletedAt: schema.deletedAt.optional().nullable(),
  }),
);
export const UserDtoSchema = UserDbSchema.pick({
  id: true,
  name: true,
  email: true,
});
export const UserWithPasswordSchema = createInsertSchema(
  UserDbTable,
  'camel',
).pick({
  id: true,
  name: true,
  email: true,
  password: true,
});

export type IUserDto = z.infer<typeof UserDtoSchema>;

// NOTE: Should not be used for DTOs, only to be used for database operations.
export type IUserWithPassword = z.infer<typeof UserWithPasswordSchema>;
export const UserInputSchema = UserDbSchema.pick({
  name: true,
  email: true,
  password: true,
});
export type IUserInput = z.infer<typeof UserInputSchema>;
