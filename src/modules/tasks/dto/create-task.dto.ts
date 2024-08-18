import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../enums/task.enums';

export class CreateTaskDto {
  @ApiProperty({ description: 'The name of the task' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Due date of the task',
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @ApiProperty({
    enum: TaskStatus,
    description: 'Status of the task',
    default: TaskStatus.PENDING,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    enum: TaskPriority,
    description: 'Priority of the task',
    default: TaskPriority.NORMAL,
  })
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @ApiProperty({
    description: 'Whether the task is active',
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @ApiProperty({ description: 'Description of the task', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
