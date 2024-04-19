import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { EmailService } from 'src/utils/email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [MailerModule.forRoot({
    transport: {
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    },
    defaults: {
      from: "julianaferreiraribeiro04@gmail.com"
    }
  })],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, EmailService],
  exports: [UsersService]
})
export class UsersModule {}
