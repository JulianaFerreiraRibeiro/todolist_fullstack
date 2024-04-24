import Toast from "@/components/toast/toast";
import { LoginData } from "@/schemas/user.schema";
import api from "@/services/api";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
    children: ReactNode
}

interface AuthProviderData{
    login: (loginData: LoginData) => void;
    passwordOrText: string;
    setPasswordOrText: React.Dispatch<React.SetStateAction<string>>;
    togglePasswordVisibility: () => void;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData)

export const AuthProvider = ({children}: Props) => {
    const [passwordOrText, setPasswordOrText] = useState<string>('password')

    const togglePasswordVisibility = () => {
        setPasswordOrText(prevState => prevState === 'password' ? 'text' : 'password')
    }

    const router = useRouter()

    const login = (loginData: LoginData) => {
        api.post("/login", loginData).then((response) => {
            setCookie("remindme.token", response.data.token, {
                maxAge: 60 * 30
            })
        }).then(() => {
            Toast({message: "Login realizado com sucesso", isSucess: true})
            router.push("/dashboard")
        }).catch((error) => {
            Toast({message: "Erro ao logar, verifique se o email e a senha estão corretos"})
        })
    }


    return (
        <AuthContext.Provider value={{login, passwordOrText, setPasswordOrText, togglePasswordVisibility}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)