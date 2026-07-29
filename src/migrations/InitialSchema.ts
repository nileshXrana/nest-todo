import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitialSchema1785440611401 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "30",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "40",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createTable(
            new Table({
                name: "label",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "label",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createTable(
            new Table({
                name: "task",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "userId",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "status",
                        type: "varchar",
                        length: "20",
                        isNullable: false,
                    },
                    {
                        name: "checked",
                        type: "boolean",
                        default: false,
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ["userId"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "user",
                        onDelete: "CASCADE",
                    }),
                ],
            }),
            true,
        );

        await queryRunner.createTable(
            new Table({
                name: "task_labels_label",
                columns: [
                    {
                        name: "taskId",
                        type: "int",
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: "labelId",
                        type: "int",
                        isPrimary: true,
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ["taskId"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "task",
                        onDelete: "CASCADE",
                    }),
                    new TableForeignKey({
                        columnNames: ["labelId"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "label",
                        onDelete: "CASCADE",
                    }),
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("task_labels_label", true);
        await queryRunner.dropTable("task", true);
        await queryRunner.dropTable("label", true);
        await queryRunner.dropTable("user", true);
    }
}

