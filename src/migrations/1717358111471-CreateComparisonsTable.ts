import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateComparisonsTable1717358111471 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE comparisons (
          id SERIAL PRIMARY KEY,
          name VARCHAR NOT NULL,
          is_bookmarked BOOLEAN NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "comparisons"`, undefined);
  }
}
