import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTask1645396613250 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'projectId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'assignedUserId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'timeEstimation',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'projectID',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'assignee',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'boolean',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task');
  }
}
