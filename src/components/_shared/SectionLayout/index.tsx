type Props = {
    className?: string
    children: JSX.Element | JSX.Element[]
}

export default function SectionLayout({ className, children }: Props){
    return(
        <section className={`wrapper flex flex-col gap-5 ${className}`}>
            {children}
        </section>
    )
}