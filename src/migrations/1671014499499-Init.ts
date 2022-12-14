import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1671014499499 implements MigrationInterface {
    name = 'Init1671014499499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "outlets" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT '"2022-12-14T10:41:42.483Z"',
                "updated_at" TIMESTAMP NOT NULL DEFAULT '"2022-12-14T10:41:42.483Z"',
                "name" character varying(100) NOT NULL,
                "picture" text,
                "address" text,
                "longitude" numeric(15, 7) NOT NULL,
                "latitude" numeric(15, 7) NOT NULL,
                "brand_id" integer,
                CONSTRAINT "PK_4f218ad1778c5c01d7bf77bab02" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT '"2022-12-14T10:41:42.483Z"',
                "updated_at" TIMESTAMP NOT NULL DEFAULT '"2022-12-14T10:41:42.483Z"',
                "name" character varying(100) NOT NULL,
                "picture" text,
                "price" numeric(100, 2) NOT NULL,
                "brand_id" integer,
                CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "brands" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT '"2022-12-14T10:41:42.483Z"',
                "updated_at" TIMESTAMP NOT NULL DEFAULT '"2022-12-14T10:41:42.483Z"',
                "name" character varying(100) NOT NULL,
                "logo" text,
                "banner" text,
                CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "outlets"
            ADD CONSTRAINT "FK_16c752205f79822c4e7af92748f" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products" DROP CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be"
        `);
        await queryRunner.query(`
            ALTER TABLE "outlets" DROP CONSTRAINT "FK_16c752205f79822c4e7af92748f"
        `);
        await queryRunner.query(`
            DROP TABLE "brands"
        `);
        await queryRunner.query(`
            DROP TABLE "products"
        `);
        await queryRunner.query(`
            DROP TABLE "outlets"
        `);
    }

}
