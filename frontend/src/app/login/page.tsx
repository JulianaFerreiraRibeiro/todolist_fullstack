import HomePageButton from "@/components/homepageButton/homepagebutton"
import Image from "next/image"
import Tasks from "../../images/Tasks.svg"
import LoginForm from "@/components/loginform/loginform"

const LoginPage = () => {
    return (
        <>
            <HomePageButton/>
            <main className="center_flex my-10 gap-10">
                <section>
                    <Image src={Tasks} alt="moça ruiva fazendo suas tarefas em um notebook"/>
                    <h1 className="text-center text-xl">Welcome back to</h1>
                    <h2 className="text-center text-3xl font-semibold">REMIND ME!</h2>
                </section>
                <LoginForm/>
            </main>
        </>
    )
}


export default LoginPage