import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}
 
  private isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    return passwordRegex.test(password)
  }

  async createUser(createUserDto: CreateUserDto) {
    
    const findUser = await this.prisma.user.findUnique({
      where: {email: createUserDto.email}
    })

    if(findUser){
      throw new ConflictException('This user already exists.')
    }

    console.log(createUserDto.password)
    console.log(this.isPasswordValid(createUserDto.password))

    if (!this.isPasswordValid(createUserDto.password)) {
      throw new BadRequestException('Password must contain at least 8 characters, including letters, numbers, and symbols.');
    }

    const hashedPassword = hashSync(createUserDto.password, 10);


    const user = new User()
    Object.assign(user, {
      ...createUserDto,
    })

    await this.prisma.user.create({
      data: {...user, password: hashedPassword}
    })

    return plainToInstance(User, user)
  }


  async findOneUser(id: string) {

    const user = await this.prisma.user.findUnique({
      where: {id}
    })

    if(!user){
      throw new NotFoundException('User not found.')
    }

    return plainToInstance(User, user)
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    
    const user = await this.prisma.user.findUnique({
      where: {id}
    })

    if(!user){
      throw new NotFoundException('User not found.')
    }

    const findUser = await this.prisma.user.findUnique({
      where: {email: updateUserDto.email}
    })

    if(findUser){
      throw new ConflictException('This user already exists')
    }

    // if(!this.isPasswordValid(updateUserDto.password)){
    //   throw new ConflictException('Password must contain at least 8 characters, including letters, numbers, and symbols.')
    // }

    const updateUser = await this.prisma.user.update({
      where: {id},
      data: {...updateUserDto}
    })

    return plainToInstance(User, updateUser)
  }

  async removeUser(id: string) {

    const user = await this.prisma.user.findUnique({
      where: {id}
    })

    if(!user){
      throw new NotFoundException('User not found.')
    }

    await this.prisma.user.delete({
      where: {id}
    })
  }
}
