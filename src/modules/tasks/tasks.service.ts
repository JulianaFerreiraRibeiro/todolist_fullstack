import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService){}
  async createTask(createTaskDto: CreateTaskDto, folderId: string, userId: string) {
    const task = new Task()

    Object.assign(task, {...createTaskDto})

    await this.prisma.task.create({
      data:{
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        userId: userId,
        folderId: folderId,
      }
    })

    return task
  }


  async findOneTask(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: {id: id, userId: userId}
    })

    console.log(task)

    if(!task){
      throw new NotFoundException("Task not found.")
    }

    return task
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: {id: id, userId: userId}
    })

    if(!task){
      throw new NotFoundException("Task not found.")
    }

    const updatedTask = await this.prisma.task.update({
      where: {id: id},
      data: {...updateTaskDto}
    })

    return updatedTask
  }

  async removeTask(id: string, userId) {
    const task = await this.prisma.task.findUnique({
      where: {id: id, userId: userId}
    })

    if(!task){
      throw new NotFoundException("Task not found.")
    }

    await this.prisma.task.delete({
      where: {id: id}
    })
  }
}
