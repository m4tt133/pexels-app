interface IGridLayout {
    children: JSX.Element | JSX.Element[]
}

export default function GridLayout({ children }: IGridLayout): React.ReactElement{
    return(
        <div className="grid grid-cols-4 gap-8 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
            {children}
        </div>
    )
}