import {MigrationInterface, QueryRunner} from "typeorm";

export class InitSchema1670427741506 implements MigrationInterface {
    name = 'InitSchema1670427741506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT '"2022-12-07T15:42:24.706Z"',
                "updated_at" TIMESTAMP NOT NULL DEFAULT '"2022-12-07T15:42:24.706Z"',
                "name" character varying(100) NOT NULL,
                "picture" text,
                "price" numeric(2) NOT NULL,
                CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "outlets" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT '"2022-12-07T15:42:24.706Z"',
                "updated_at" TIMESTAMP NOT NULL DEFAULT '"2022-12-07T15:42:24.706Z"',
                "name" character varying(100) NOT NULL,
                "picture" text,
                "address" text,
                "longitude" numeric(7) NOT NULL,
                "latitude" numeric(7) NOT NULL,
                CONSTRAINT "PK_4f218ad1778c5c01d7bf77bab02" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "brands" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT '"2022-12-07T15:42:24.706Z"',
                "updated_at" TIMESTAMP NOT NULL DEFAULT '"2022-12-07T15:42:24.706Z"',
                "name" character varying(100) NOT NULL,
                "logo" text,
                "banner" text,
                CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "brand_outlets" (
                "brand_id" integer NOT NULL,
                "outlet_id" integer NOT NULL,
                CONSTRAINT "PK_77ab474dba86f58ec14ae506ecc" PRIMARY KEY ("brand_id", "outlet_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_6641f0583f9df8016b815450ae" ON "brand_outlets" ("brand_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_665a2dddb38b8fff59f138bfc5" ON "brand_outlets" ("outlet_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "brand_products" (
                "brand_id" integer NOT NULL,
                "product_id" integer NOT NULL,
                CONSTRAINT "PK_5efe5c48021fd12c61c1758f9fc" PRIMARY KEY ("brand_id", "product_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1a6aa9f165df46ffa2a51da9a2" ON "brand_products" ("brand_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d080bcb905ea59c3d00d5b9aa3" ON "brand_products" ("product_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "brand_outlets"
            ADD CONSTRAINT "FK_6641f0583f9df8016b815450aee" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "brand_outlets"
            ADD CONSTRAINT "FK_665a2dddb38b8fff59f138bfc57" FOREIGN KEY ("outlet_id") REFERENCES "outlets"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "brand_products"
            ADD CONSTRAINT "FK_1a6aa9f165df46ffa2a51da9a2a" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "brand_products"
            ADD CONSTRAINT "FK_d080bcb905ea59c3d00d5b9aa3e" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "brand_products" DROP CONSTRAINT "FK_d080bcb905ea59c3d00d5b9aa3e"
        `);
        await queryRunner.query(`
            ALTER TABLE "brand_products" DROP CONSTRAINT "FK_1a6aa9f165df46ffa2a51da9a2a"
        `);
        await queryRunner.query(`
            ALTER TABLE "brand_outlets" DROP CONSTRAINT "FK_665a2dddb38b8fff59f138bfc57"
        `);
        await queryRunner.query(`
            ALTER TABLE "brand_outlets" DROP CONSTRAINT "FK_6641f0583f9df8016b815450aee"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d080bcb905ea59c3d00d5b9aa3"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_1a6aa9f165df46ffa2a51da9a2"
        `);
        await queryRunner.query(`
            DROP TABLE "brand_products"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_665a2dddb38b8fff59f138bfc5"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_6641f0583f9df8016b815450ae"
        `);
        await queryRunner.query(`
            DROP TABLE "brand_outlets"
        `);
        await queryRunner.query(`
            DROP TABLE "brands"
        `);
        await queryRunner.query(`
            DROP TABLE "outlets"
        `);
        await queryRunner.query(`
            DROP TABLE "products"
        `);
    }

}
