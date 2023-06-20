-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "password" VARCHAR(500) NOT NULL,
    "o_auth_token" VARCHAR(255) NOT NULL,
    "o_auth_verified" BOOLEAN NOT NULL DEFAULT false,
    "o_auth_last_refresh" TIMESTAMP(6),
    "user_name" VARCHAR(255) NOT NULL,
    "user_last_name" VARCHAR(255) NOT NULL,
    "address" JSON,
    "last_update" TIMESTAMP(6) NOT NULL,
    "created_on" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_key" ON "user"("phone_number");
