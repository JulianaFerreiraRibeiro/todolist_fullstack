import { z } from "zod";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/


export const UserSchema = z.object({
    name: z.string().min(1, "Este campo é obrigatório"),
    email: z.string().email("Deve ser um email válido"),
    password: z.string().min(8, "Senha deve conter no mínimo 8 caracteres").regex(passwordRegex, "Senha deve conter uma letra, um número e um caractere especial"),
    passwordConfirm: z.string().min(8, "Confirmação de senha é obrigatória").regex(passwordRegex, "Confirmação de senha é obrigatória")
}).refine(obj => obj.password === obj.passwordConfirm, {
    message: "As senhas não coincidem",
    path: ["passwordConfirm"]
})

export const LoginSchema = z.object({
    email: z.string().email("Deve ser um email válido"),
    password: z.string().min(8, "Senha deve conter no mínimo 8 caracteres").regex(passwordRegex, "Senha deve conter uma letra, um número e um caractere especial"),
})

export const SendEmailResetPasswordSchema = LoginSchema.omit({
    password: true
})

export const ResetPasswordSchema = z.object({
    password: z.string().min(8, "Senha deve conter no mínimo 8 caracteres").regex(passwordRegex, "Senha deve conter uma letra, um número e um caractere especial"),
    passwordConfirm: z.string().min(8, "Confirmação de senha é obrigatória").regex(passwordRegex, "Confirmação de senha é obrigatória")
}).refine(obj => obj.password === obj.passwordConfirm, {
    message: "As senhas não coincidem",
    path: ["passwordConfirm"]
})

export type UserData = z.infer<typeof UserSchema>
export type LoginData = z.infer<typeof LoginSchema>
export type SendEmailResetPasswordData = z.infer<typeof SendEmailResetPasswordSchema>
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>