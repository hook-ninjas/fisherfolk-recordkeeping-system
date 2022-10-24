-- CreateEnum
CREATE TYPE "RegistrationType" AS ENUM ('RENEWAL', 'NEW_REGISTRATION');

-- CreateEnum
CREATE TYPE "Salutation" AS ENUM ('MR', 'MS', 'MRS');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "CivilStatus" AS ENUM ('SINGLE', 'MARRIED', 'LEGALLY_SEPARATED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "Nationality" AS ENUM ('FILIPINO');

-- CreateEnum
CREATE TYPE "EducationalBackground" AS ENUM ('ELEMENTARY', 'HIGH_SCHOOL', 'VOCATIONAL', 'COLLEGE', 'POST_GRADUATE');

-- CreateEnum
CREATE TYPE "SourceOfIncome" AS ENUM ('CAPTURE_FISHING', 'AQUACULTURE', 'FISH_VENDING', 'FISH_PROCESSING');

-- CreateEnum
CREATE TYPE "FisherfolkStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DECEASED');

-- CreateEnum
CREATE TYPE "EngineType" AS ENUM ('MOTORIZED', 'NON_MOTORIZED');

-- CreateEnum
CREATE TYPE "PermitStatus" AS ENUM ('PENDING', 'ON_RELEASE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fisherfolks" (
    "id" SERIAL NOT NULL,
    "registrationNum" INTEGER NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registrationType" "RegistrationType" NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "salutation" "Salutation" NOT NULL,
    "barangay" TEXT NOT NULL,
    "cityMunicipality" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "contactNum" TEXT NOT NULL,
    "residentYear" INTEGER NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "civilStatus" "CivilStatus" NOT NULL,
    "numOfChildren" INTEGER,
    "nationality" "Nationality" NOT NULL,
    "educationalBackground" "EducationalBackground" NOT NULL,
    "personToNotify" TEXT NOT NULL,
    "ptnRelationship" TEXT NOT NULL,
    "ptnAddress" TEXT NOT NULL,
    "ptnContactNum" TEXT NOT NULL,
    "mainSrcOfIncome" "SourceOfIncome" NOT NULL,
    "otherSrcOfIncome" "SourceOfIncome",
    "mainSrcGear" TEXT NOT NULL,
    "otherSrcGear" TEXT,
    "mainSrcMethod" TEXT NOT NULL,
    "otherSrcMethod" TEXT,
    "orgName" TEXT,
    "orgYearMember" INTEGER,
    "orgPosition" TEXT,
    "image" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "status" "FisherfolkStatus" NOT NULL,

    CONSTRAINT "fisherfolks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gears" (
    "id" SERIAL NOT NULL,
    "fisherfolk_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "gears_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boats" (
    "id" SERIAL NOT NULL,
    "fisherfolk_id" INTEGER NOT NULL,
    "engineType" "EngineType" NOT NULL,
    "length" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "depth" DOUBLE PRECISION,
    "grossTonage" DOUBLE PRECISION NOT NULL,
    "horsePower" DOUBLE PRECISION,
    "numOfMenOnBoard" INTEGER NOT NULL,

    CONSTRAINT "boats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fishponds" (
    "id" SERIAL NOT NULL,
    "fisherfolk_id" INTEGER NOT NULL,
    "length" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "depth" DOUBLE PRECISION,
    "location" TEXT NOT NULL,
    "kindOfProd" TEXT NOT NULL,

    CONSTRAINT "fishponds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registration_permits" (
    "num" INTEGER NOT NULL,
    "fisherfolk_id" INTEGER NOT NULL,
    "status" "PermitStatus" NOT NULL,
    "issuedDate" TIMESTAMP(3) NOT NULL,
    "validityDate" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "gears_fisherfolk_id_key" ON "gears"("fisherfolk_id");

-- CreateIndex
CREATE UNIQUE INDEX "boats_fisherfolk_id_key" ON "boats"("fisherfolk_id");

-- CreateIndex
CREATE UNIQUE INDEX "fishponds_fisherfolk_id_key" ON "fishponds"("fisherfolk_id");

-- CreateIndex
CREATE UNIQUE INDEX "registration_permits_fisherfolk_id_key" ON "registration_permits"("fisherfolk_id");

-- AddForeignKey
ALTER TABLE "gears" ADD CONSTRAINT "gears_fisherfolk_id_fkey" FOREIGN KEY ("fisherfolk_id") REFERENCES "fisherfolks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boats" ADD CONSTRAINT "boats_fisherfolk_id_fkey" FOREIGN KEY ("fisherfolk_id") REFERENCES "fisherfolks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fishponds" ADD CONSTRAINT "fishponds_fisherfolk_id_fkey" FOREIGN KEY ("fisherfolk_id") REFERENCES "fisherfolks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_permits" ADD CONSTRAINT "registration_permits_fisherfolk_id_fkey" FOREIGN KEY ("fisherfolk_id") REFERENCES "fisherfolks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
