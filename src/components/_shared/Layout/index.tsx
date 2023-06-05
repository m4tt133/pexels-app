import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

type Props = {
    className?: string
    children: JSX.Element | JSX.Element[]
}

export default function Layout({ className, children }: Props): React.ReactElement {
    return(
        <main
            className={`flex min-h-screen flex-col w-full items-center justify-between p-24 md:p-28 md:px-5 ${inter.className} ${className ? className : ""}`}
        >
            {children}
        </main>
    )
}