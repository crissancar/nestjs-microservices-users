import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1670084143958 implements MigrationInterface {
	name = 'initial1670084143958';

	public async up(queryRunner: QueryRunner): Promise<void> {
		// User
		await queryRunner.query(
			`CREATE TYPE "public"."user_audiences_enum" AS ENUM('GENERAL', 'ADMIN')`,
		);
		await queryRunner.query(
			`CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "audiences" "public"."user_audiences_enum" array NOT NULL DEFAULT '{GENERAL}', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "user"`);
		await queryRunner.query(`DROP TYPE "public"."user_audiences_enum"`);
	}
}
