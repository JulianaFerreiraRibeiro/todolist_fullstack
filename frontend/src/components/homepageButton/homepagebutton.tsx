import Link from "next/link"
import { FaHome } from "react-icons/fa";

const HomePageButton = () => {
    return (
        <section>
            <Link href={"/"}>
                <button className="button_homepage">
                    <FaHome/>
                    Homepage
                </button>
            </Link>
        </section>
    )

}

export default HomePageButton