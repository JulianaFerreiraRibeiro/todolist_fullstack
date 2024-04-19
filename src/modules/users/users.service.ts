import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';
import { EmailService } from './../../utils/email.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private emailService: EmailService){}
 
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

    if(updateUserDto.email){
      const findUser = await this.prisma.user.findUnique({
        where: {email: updateUserDto.email}
      })
  
      if(findUser){
        throw new ConflictException('This user already exists')
      }
    }

    if(updateUserDto.password){
      if(!this.isPasswordValid(updateUserDto.password)){
        throw new ConflictException('Password must contain at least 8 characters, including letters, numbers, and symbols.')
      }
    }


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

  async findUserByEmail(email: string){

    const foundUser = await this.prisma.user.findUnique({
      where: {email: email}
    })

    if(!foundUser){
      throw new NotFoundException('User not found.')
    }

    return foundUser
  }

  async sendEmailResetPassword(email: string){

    const user = await this.prisma.user.findUnique({
      where: {email: email}
    })

    if(!user){
      throw new NotFoundException("User not found.")
    }

    const resetToken = randomUUID()
    await this.prisma.user.update({
      where: {email: email},
      data: {token: resetToken}
    })

    const resetPasswordTemplate = this.emailService.resetPasswordTemplate(email, user.name, resetToken)

    await this.emailService.sendEmail(resetPasswordTemplate)
  }

  async resetPassword(token: string, password: string){
    const user = await this.prisma.user.findFirst({
      where: {token: token}
    })

    if(!user){
      throw new NotFoundException("User not found.")
    }

    if(!this.isPasswordValid(password)){
      throw new ConflictException('Password must contain at least 8 characters, including letters, numbers, and symbols.')
    }

    await this.prisma.user.update({
      where: {id: user.id},
      data: {
        password: hashSync(password, 10),
        token: null
      }
    })
  }
}
