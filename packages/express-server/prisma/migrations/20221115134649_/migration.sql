-- CreateEnum
CREATE TYPE "salutation" AS ENUM ('MR', 'MS', 'MRS');

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "civil_status" AS ENUM ('SINGLE', 'MARRIED', 'LEGALLY_SEPARATED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "educational_background" AS ENUM ('ELEMENTARY', 'HIGH_SCHOOL', 'VOCATIONAL', 'COLLEGE', 'POST_GRADUATE');

-- CreateEnum
CREATE TYPE "source_of_income" AS ENUM ('CAPTURE_FISHING', 'AQUACULTURE', 'FISH_VENDING', 'FISH_PROCESSING', 'OTHERS');

-- CreateEnum
CREATE TYPE "fisherfolk_status" AS ENUM ('ACTIVE', 'INACTIVE', 'DECEASED');

-- CreateEnum
CREATE TYPE "material" AS ENUM ('WOOD', 'FIBERGLASS', 'COMPOSITE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fisherfolks" (
    "id" BIGSERIAL NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "appellation" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "salutation" "salutation" NOT NULL,
    "barangay" TEXT NOT NULL,
    "city_municipality" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "contact_num" TEXT NOT NULL,
    "resident_year" INTEGER NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "place_of_birth" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "gender" "gender" NOT NULL,
    "civil_status" "civil_status" NOT NULL,
    "num_of_children" INTEGER NOT NULL,
    "nationality" TEXT NOT NULL,
    "educational_background" "educational_background" NOT NULL,
    "person_to_notify" TEXT NOT NULL,
    "ptn_relationship" TEXT NOT NULL,
    "ptn_address" TEXT NOT NULL,
    "ptn_contact_num" TEXT NOT NULL,
    "status" "fisherfolk_status" NOT NULL DEFAULT 'ACTIVE',
    "is_archive" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fisherfolks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "government_aid" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "slot" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "government_aid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fisherfolk_organizations" (
    "fisherfolk_id" BIGINT NOT NULL,
    "organization_id" INTEGER NOT NULL,
    "year_joined" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fisherfolk_organizations_pkey" PRIMARY KEY ("fisherfolk_id","organization_id")
);

-- CreateTable
CREATE TABLE "fisherfolk_aid" (
    "fisherfolk_id" BIGINT NOT NULL,
    "government_aid_id" INTEGER NOT NULL,
    "queue_number" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fisherfolk_aid_pkey" PRIMARY KEY ("fisherfolk_id","government_aid_id")
);

-- CreateTable
CREATE TABLE "livelihoods" (
    "id" BIGSERIAL NOT NULL,
    "fisherfolk_id" BIGINT NOT NULL,
    "type" "source_of_income" NOT NULL,
    "description" TEXT NOT NULL,
    "is_main" BOOLEAN NOT NULL DEFAULT true,
    "is_archive" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "livelihoods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permits" (
    "certificate_number" TEXT NOT NULL,
    "livelihood_id" BIGINT NOT NULL,
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "renewed_at" TIMESTAMP(3) NOT NULL,
    "expires_on" TIMESTAMP(3) NOT NULL,
    "expired" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permits_pkey" PRIMARY KEY ("certificate_number")
);

-- CreateTable
CREATE TABLE "gears" (
    "id" BIGSERIAL NOT NULL,
    "permitId" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "is_archive" BOOLEAN NOT NULL DEFAULT false,
    "certificate_num" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gears_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vessels" (
    "id" BIGSERIAL NOT NULL,
    "permitId" TEXT NOT NULL,
    "homeport" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "place_built" TEXT NOT NULL,
    "year_built" INTEGER NOT NULL,
    "material" "material" NOT NULL,
    "registered_length" DOUBLE PRECISION NOT NULL,
    "registered_breadth" DOUBLE PRECISION NOT NULL,
    "registered_depth" DOUBLE PRECISION NOT NULL,
    "tonnage_length" DOUBLE PRECISION NOT NULL,
    "tonnage_breadth" DOUBLE PRECISION NOT NULL,
    "tonnage_depth" DOUBLE PRECISION NOT NULL,
    "gross_tonnage" DOUBLE PRECISION NOT NULL,
    "net_tonnage" DOUBLE PRECISION NOT NULL,
    "engine_make" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "horsepower" DOUBLE PRECISION NOT NULL,
    "certificate_num" TEXT NOT NULL,
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "renewed_at" TIMESTAMP(3) NOT NULL,
    "expires_on" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vessels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fishponds" (
    "id" BIGSERIAL NOT NULL,
    "livelihood_id" BIGINT NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "depth" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "production" TEXT NOT NULL,
    "is_archive" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fishponds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "fisherfolk_id" BIGINT NOT NULL,
    "gear_id" BIGINT NOT NULL,
    "vessel_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "is_archive" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "gears_certificate_num_key" ON "gears"("certificate_num");

-- CreateIndex
CREATE UNIQUE INDEX "vessels_certificate_num_key" ON "vessels"("certificate_num");

-- AddForeignKey
ALTER TABLE "fisherfolk_organizations" ADD CONSTRAINT "fisherfolk_organizations_fisherfolk_id_fkey" FOREIGN KEY ("fisherfolk_id") REFERENCES "fisherfolks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fisherfolk_organizations" ADD CONSTRAINT "fisherfolk_organizations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fisherfolk_aid" ADD CONSTRAINT "fisherfolk_aid_fisherfolk_id_fkey" FOREIGN KEY ("fisherfolk_id") REFERENCES "fisherfolks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fisherfolk_aid" ADD CONSTRAINT "fisherfolk_aid_government_aid_id_fkey" FOREIGN KEY ("government_aid_id") REFERENCES "government_aid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "livelihoods" ADD CONSTRAINT "livelihoods_fisherfolk_id_fkey" FOREIGN KEY ("fisherfolk_id") REFERENCES "fisherfolks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permits" ADD CONSTRAINT "permits_livelihood_id_fkey" FOREIGN KEY ("livelihood_id") REFERENCES "livelihoods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gears" ADD CONSTRAINT "gears_permitId_fkey" FOREIGN KEY ("permitId") REFERENCES "permits"("certificate_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vessels" ADD CONSTRAINT "vessels_permitId_fkey" FOREIGN KEY ("permitId") REFERENCES "permits"("certificate_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fishponds" ADD CONSTRAINT "fishponds_livelihood_id_fkey" FOREIGN KEY ("livelihood_id") REFERENCES "livelihoods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_fisherfolk_id_fkey" FOREIGN KEY ("fisherfolk_id") REFERENCES "fisherfolks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_gear_id_fkey" FOREIGN KEY ("gear_id") REFERENCES "gears"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_vessel_id_fkey" FOREIGN KEY ("vessel_id") REFERENCES "vessels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
