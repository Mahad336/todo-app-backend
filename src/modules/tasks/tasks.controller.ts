import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpException,
  Get,
  Param,
  Delete,
  Patch,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ListTasksDto } from './dto/list-tasks.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return await this.taskService.createTask(createTaskDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tasks with optional pagination and filters',
  })
  @ApiResponse({
    status: 200,
    description: 'Tasks retrieved successfully',
    type: [TaskResponseDto],
  })
  async getAllTasks(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query() listTasksDto: ListTasksDto,
  ): Promise<{ tasks: TaskResponseDto[]; total: number }> {
    return this.taskService.getAllTasks(listTasksDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async getTaskById(@Param('id') id: number): Promise<TaskResponseDto> {
    return await this.taskService.getTaskById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async deleteTask(@Param('id') id: number): Promise<void> {
    return await this.taskService.deleteTask(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return await this.taskService.updateTask(id, updateTaskDto);
  }
}
