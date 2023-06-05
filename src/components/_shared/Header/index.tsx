import Link from "next/link"

export default function Header(): React.ReactElement {
    return(
        <header className="fixed top-0 w-full p-10 m-auto z-10">
            <section className="w-full flex justify-between">
                <Link href={"/"} passHref>
                    <h1>PEXELS APP</h1>
                </Link>
                <Link href={"/wishlist"} passHref>
                    My Wishlist 🤍
                </Link>
            </section>
        </header>
    )
}