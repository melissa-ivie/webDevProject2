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
                type: 'text',
                isNullable: false,
              },
              {
                name: 'timeStamp',
                type: 'float',
                isNullable: true,
              },
              {
                name: 'userName',
                type: 'text',
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
