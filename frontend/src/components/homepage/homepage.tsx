import Image from "next/image"
import Tasks from "../../images/Tasks.svg"
import Arrow from "../../images/ArrowRight.svg"
import Link from "next/link"

const HomePage = () => {
    return (
        <>
            <section className="center_flex">
                <h1 className="text-center text-xl">Welcome to</h1>
                <h2 className="text-center text-3xl font-semibold">REMIND ME!</h2>
                <Image src={Tasks} alt="moça ruiva fazendo suas tarefas em um notebook" className="my-4"/>
                <p className="text-center max-w-2xl mt-3 leading-7">Tired of having to remember all your tasks, disorganized ideas and not being able to separate your priorities? Relax and let Remind Me, remind you. The best app to achieve your goals and plans, with better organization and priority options</p>
            </section>
            <section className="my-8">
                <Link href={"/login"}>
                    <button className="flex flex-row items-center my-10 button_gradient ">
                        Get Start
                        <Image src={Arrow} alt="seta branca indicando para a direita"/>
                    </button>
                </Link>
            </section>
        </>
    )
}

export default HomePage