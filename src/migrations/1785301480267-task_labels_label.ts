import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class TaskLabelsLabel1785301480267 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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

    }

}
