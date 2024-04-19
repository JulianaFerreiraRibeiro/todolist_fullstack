import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as Mailgen from "mailgen";
import { SendEmailDto } from "src/modules/users/dto/send-email.dto";

const emailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: "Remind Me!",
        link: 'http://localhost:3000'
    }
})

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService){}

    async sendEmail({to, subject, text}: SendEmailDto){
        await this.mailerService.sendMail({
            to, subject, html: text
        }).then(() => {
            console.log("Email sent with success.")
        }).catch((error) => {
            throw new InternalServerErrorException("Error sending email, try again later.")
        })

    }

    resetPasswordTemplate(userEmail: string, userName: string, resetToken: string){
        const email = {
            body: {
                name: userName,
                intro: 'You have received this email because a password reset request for your account was received.',
                action: {
                    instructions: 'Click the button below to reset your password:',
                    button: {
                        color: '#DC4D2F',
                        text: 'Reset your password',
                        link: `http://localhost:3000/resetPassword/${resetToken}`,
                    }
                },
                outro: 'If you did not request a password reset, no further action is required on your part.',
            }
        }

        const emailBody = emailGenerator.generate(email)
        const emailTemplate = {
            to: userEmail,
            subject: 'Reset your password - REMIND ME!',
            text: emailBody
        }

        return emailTemplate
    }
}