import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class addMessage1648672476438 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'message',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
              },
              {
                name: 'chatroom',
                type: 'int',
                isNullable: false,
              },
              {
                name: 'time',
                type: 'int',
                isNullable: true,
              },
              {
                name: 'userID',
                type: 'int',
                isNullable: true,
              },
              {
                name: 'content',
                type: 'text',
                isNullable: true,
              },
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('message');
      }
    }
