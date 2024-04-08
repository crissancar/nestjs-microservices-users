import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1670084143958 implements MigrationInterface {
    name = 'initial1670084143958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Admin user
        await queryRunner.query(`CREATE TYPE "public"."admin_user_audiences_enum" AS ENUM('GENERAL', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "admin_user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "audience" "public"."admin_user_audiences_enum" NOT NULL DEFAULT 'GENERAL', CONSTRAINT "UQ_840ac5cd67be99efa5cd989bf9f" UNIQUE ("email"), CONSTRAINT "PK_a28028ba709cd7e5053a86857b4" PRIMARY KEY ("id"))`);

        // User
        await queryRunner.query(
          `CREATE TYPE "public"."user_audiences_enum" AS ENUM('GENERAL', 'ADMIN')`,
        );
        await queryRunner.query(
          `CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "audiences" "public"."user_audiences_enum" array NOT NULL DEFAULT '{GENERAL}', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "policy"`);
        await queryRunner.query(`DROP TYPE "public"."policy_language_enum"`);
        await queryRunner.query(`DROP TYPE "public"."policy_type_enum"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_b2d8e683f020f61115edea206b3"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "faq"`);
        await queryRunner.query(`DROP TYPE "public"."faq_language_enum"`);
        await queryRunner.query(`ALTER TABLE "forgot_password" DROP CONSTRAINT "FK_dba25590105b78ad1a6adfbc6ae"`);
        await queryRunner.query(`DROP TABLE "forgot_password"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "blacklist_user"`);
        await queryRunner.query(`DROP TABLE "blacklist_ip"`);
        await queryRunner.query(`DROP TABLE "api_key"`);
        await queryRunner.query(`DROP TABLE "admin_user"`);
        await queryRunner.query(`DROP TYPE "public"."admin_user_audiences_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_audiences_enum"`);
        await queryRunner.query(`DROP TYPE "public"."api_key_audiences_enum"`);
    }

}
