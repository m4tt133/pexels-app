type Props = {
    cta: string
    children?: JSX.Element | JSX.Element[];
    className?: string
}

export default function PageHeading({ cta, children, className }: Props){
    return(
        <div className={`flex justify-between gap-5 ${className}`}>
            <h1>{cta}</h1>
            {children}
        </div>
    )
}