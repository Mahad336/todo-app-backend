import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { ListTasksDto } from './dto/list-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = this.taskRepository.create(createTaskDto);
    try {
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new Error('Failed to create task due to unexpected error.');
    }
  }

  async getTaskById(id: number): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updatedTask = this.taskRepository.merge(task, updateTaskDto);
    await this.taskRepository.save(updatedTask);
    return updatedTask;
  }

  async getAllTasks(
    listTasksDto: ListTasksDto,
  ): Promise<{ tasks: TaskResponseDto[]; total: number }> {
    const {
      page,
      limit,
      status,
      priority,
      name,
      description,
      fromDate,
      toDate,
      isActive,
    } = listTasksDto;
    const [tasks, total] = await this.taskRepository.findAndCount({
      where: {
        ...(status && { status }),
        ...(priority && { priority }),
        ...(name && { name: ILike(`%${name}%`) }),
        ...(description && { description: ILike(`%${description}%`) }),
        ...(isActive !== undefined && { isActive }),
        ...(fromDate && { dueDate: MoreThanOrEqual(new Date(fromDate)) }),
        ...(toDate && { dueDate: LessThanOrEqual(new Date(toDate)) }),
      },
      order: {
        id: 'ASC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      tasks: tasks.map((task) => this.toTaskResponseDto(task)),
      total,
    };
  }

  private toTaskResponseDto(task: Task): TaskResponseDto {
    return {
      id: task.id,
      name: task.name,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      isActive: task.isActive,
      description: task.description,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
