import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../enums/task.enums';

export class TaskResponseDto {
  @ApiProperty({ description: 'Unique identifier of the task', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Name of the task',
    example: 'Complete assignment',
  })
  name: string;

  @ApiProperty({
    description: 'Due date of the task',
    example: '2023-01-01T00:00:00.000Z',
  })
  dueDate: Date;

  @ApiProperty({ enum: TaskStatus, description: 'Current status of the task' })
  status: TaskStatus;

  @ApiProperty({
    enum: TaskPriority,
    description: 'Priority level of the task',
  })
  priority: TaskPriority;

  @ApiProperty({ description: 'Whether the task is active', example: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Description of the task',
    example: 'Finish the documentation.',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'The date the task was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date the task was last updated',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
