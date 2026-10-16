ALTER TABLE "users" RENAME TO "subscribers";--> statement-breakpoint
ALTER TABLE "subscribers" ADD COLUMN "confirm_token" varchar(64);--> statement-breakpoint
ALTER TABLE "subscribers" ADD COLUMN "confirm_token_expires_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "subscribers" ADD COLUMN "unsubscribe_token" varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE "subscribers" ADD COLUMN "confirmed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "subscribers" ADD COLUMN "unsubscribed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "subscribers" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "subscribers" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "subscribers" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "subscribers" DROP COLUMN "age";--> statement-breakpoint
ALTER TABLE "subscribers" ALTER COLUMN "email" SET DATA TYPE text USING "email"::text;--> statement-breakpoint
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_confirm_token_key" UNIQUE("confirm_token");--> statement-breakpoint
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_unsubscribe_token_key" UNIQUE("unsubscribe_token");