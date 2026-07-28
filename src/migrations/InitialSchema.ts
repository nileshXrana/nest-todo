import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(30) NOT NULL,
                "email" VARCHAR(40) NOT NULL UNIQUE,
                "password" VARCHAR NOT NULL
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "label" (
                "id" SERIAL PRIMARY KEY,
                "label" VARCHAR NOT NULL UNIQUE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "task" (
                "id" SERIAL PRIMARY KEY,
                "userId" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
                "task" VARCHAR(100),
                "title" VARCHAR(100) NOT NULL,
                "description" TEXT NOT NULL,
                "status" VARCHAR(20) NOT NULL
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "task_labels_label" (
                "taskId" INTEGER NOT NULL REFERENCES "task"("id") ON DELETE CASCADE,
                "labelId" INTEGER NOT NULL REFERENCES "label"("id") ON DELETE CASCADE,
                PRIMARY KEY ("taskId", "labelId")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "task_labels_label"');
        await queryRunner.query('DROP TABLE "task"');
        await queryRunner.query('DROP TABLE "label"');
        await queryRunner.query('DROP TABLE "user"');
    }
}
