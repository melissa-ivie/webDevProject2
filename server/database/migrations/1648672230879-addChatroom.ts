import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class addChatroom1648672230879 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'chatroom',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
              },
              {
                name: 'lat',
                type: 'float',
                isNullable: true,
              },
              {
                name: 'long',
                type: 'float',
                isNullable: true,
              },
              {
                name: 'title',
                type: 'text',
                isNullable: true,
              },
              {
                name: 'userEmails',
                type: 'text[]',
                isNullable: true,
              },
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('chatroom');
      }
    }
    
