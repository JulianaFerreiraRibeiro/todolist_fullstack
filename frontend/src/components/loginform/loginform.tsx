"use client"

import Link from "next/link"
import { FaEnvelope } from "react-icons/fa";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { LoginData, LoginSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/authContext";




const LoginForm = () => {
    const {register, handleSubmit, formState: { errors }} = useForm<LoginData>({
        resolver: zodResolver(LoginSchema)
    })

    const {login, passwordOrText, togglePasswordVisibility} = useAuth()

    const onFormSubmit = (formData: LoginData) => {
        console.log(formData)
        login(formData)
    }


    return (
        <section className="center_flex gap-14">
            <form className="center_flex gap-9" onSubmit={handleSubmit(onFormSubmit)}>
                <div className="relative_form">
                    <input type="email" placeholder="Enter your email" className="rounded_input" {...register('email')} id="email"/>
                    <FaEnvelope className="absolute_icons" />
                    <p className="errors_form">{errors.email?.message}</p>
                </div>
                <div className="relative_form">
                    <input type={passwordOrText} placeholder="Enter your password" className="rounded_input" {...register('password')} id="password"/>
                    {passwordOrText === 'password' ? (
                        <FaEyeSlash className="absolute_icons" onClick={togglePasswordVisibility} />

                    ) : (
                        <FaEye className="absolute_icons" onClick={togglePasswordVisibility} />
                    )}
                    <p className="errors_form">{errors.password?.message}</p>
                </div>

                <p className="tracking-wider mt-4">Forgot password?</p>
                <button className="button_gradient">Sign In</button>
            </form>

            <section className="center_flex">
                <p className="font-medium tracking-wide">Don’t have an account?  
                    <Link href={"/register"}>
                        <span className="red_span"> Sign Up</span>
                    </Link>
                </p>
            </section>
        </section>
    )
}

export default LoginForm