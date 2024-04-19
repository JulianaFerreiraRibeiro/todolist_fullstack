import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Folder } from './entities/folder.entity';
import { MinLength } from 'class-validator';

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService){}

  async createFolder(createFolderDto: CreateFolderDto, userId: string) {

    const folder = new Folder()
    Object.assign(folder, {...createFolderDto})

    await this.prisma.folder.create({
      data: {
        id: folder.id,
        title: folder.title,
        description: folder.description,
        userId: userId
      }
    })

    return folder;
  }

  async findAllFolders(userId: string) {
    const folders = await this.prisma.folder.findMany({
      where: {userId: userId},
      include: {tasks: true}
    })

    if(!folders){
      throw new NotFoundException('Folders not found.')
    }

    return folders
  }


  async findOneFolder(id: string, userId: string) {
    const folder = await this.prisma.folder.findUnique({
      where: {id: id, userId: userId}
    })

    if(!folder){
      throw new NotFoundException('Folder not found.')
    }

    return folder
  }

  async updateFolder(id: string, userId: string, updateFolderDto: UpdateFolderDto,) {

    const folder = await this.prisma.folder.findUnique({
      where: {id, userId: userId}
    })

    if(!folder){
      throw new NotFoundException('Folder not found.')
    }

    const updatedFolder = await this.prisma.folder.update({
      where: {id},
      data: {...updateFolderDto}
    })

    return updatedFolder
  }

  async removeFolder(id: string, userId: string) {
    const folder = await this.prisma.folder.findUnique({
      where: {id: id, userId: userId}
    })

    if (!folder){
      throw new NotFoundException('Folder not found.')
    }

    await this.prisma.folder.delete({
      where: {id: id}
    })
  }
}
