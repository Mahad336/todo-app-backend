import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1723988258578 implements MigrationInterface {
    name = 'CreateTasksTable1723988258578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "dueDate" TIMESTAMP NOT NULL, "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'Pending', "priority" "public"."tasks_priority_enum" NOT NULL DEFAULT 'Normal', "isActive" boolean NOT NULL DEFAULT true, "description" character varying, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
