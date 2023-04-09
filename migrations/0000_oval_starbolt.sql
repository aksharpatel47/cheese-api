CREATE TABLE IF NOT EXISTS "brands" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"url" varchar(1024) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone
);

CREATE TABLE IF NOT EXISTS "cheeses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"url" varchar(1024) NOT NULL,
	"brand_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone
);

CREATE TABLE IF NOT EXISTS "cheeses_and_cheese_types" (
	"cheese_id" integer,
	"cheese_type_id" integer
);

CREATE TABLE IF NOT EXISTS "cheese_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"url" varchar(1024) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(256) NOT NULL,
	"refresh_token" varchar(36) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone
);

DO $$ BEGIN
 ALTER TABLE cheeses ADD CONSTRAINT cheeses_brand_id_brands_id_fk FOREIGN KEY ("brand_id") REFERENCES brands("id") ON DELETE restrict ON UPDATE restrict;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE cheeses_and_cheese_types ADD CONSTRAINT cheeses_and_cheese_types_cheese_id_cheeses_id_fk FOREIGN KEY ("cheese_id") REFERENCES cheeses("id") ON DELETE restrict ON UPDATE restrict;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE cheeses_and_cheese_types ADD CONSTRAINT cheeses_and_cheese_types_cheese_type_id_cheese_types_id_fk FOREIGN KEY ("cheese_type_id") REFERENCES cheese_types("id") ON DELETE restrict ON UPDATE restrict;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS cheese_and_cheese_type_unique ON cheeses_and_cheese_types ("cheese_type_id","cheese_id");