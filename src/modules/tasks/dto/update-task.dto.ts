import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../enums/task.enums';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'Updated status of the task',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    enum: TaskPriority,
    description: 'Updated priority of the task',
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional({ description: 'Updated description of the task' })
  @IsOptional()
  @IsString()
  description?: string;
}
