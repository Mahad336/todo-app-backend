import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { TaskStatus, TaskPriority } from '../enums/task.enums';

@Entity('tasks')
export class Task extends BaseEntity {
  @Column()
  name: string;

  @Column()
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.NORMAL,
  })
  priority: TaskPriority;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  description: string;
}
