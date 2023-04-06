-- AlterTable
CREATE SEQUENCE government_aid_id_seq;
ALTER TABLE "government_aid" ALTER COLUMN "id" SET DEFAULT nextval('government_aid_id_seq');
ALTER SEQUENCE government_aid_id_seq OWNED BY "government_aid"."id";
