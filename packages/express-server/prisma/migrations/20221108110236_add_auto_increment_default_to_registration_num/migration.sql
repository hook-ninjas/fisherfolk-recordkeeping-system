-- AlterTable
CREATE SEQUENCE "fisherfolks_registrationnum_seq";
ALTER TABLE "fisherfolks" ALTER COLUMN "registrationNum" SET DEFAULT nextval('fisherfolks_registrationnum_seq');
ALTER SEQUENCE "fisherfolks_registrationnum_seq" OWNED BY "fisherfolks"."registrationNum";
