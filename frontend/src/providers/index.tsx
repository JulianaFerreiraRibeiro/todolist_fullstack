"use client"
import { AuthProvider } from "@/contexts/authContext"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

const Providers = ({children}: Props) => {
    return(
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}


export default Providers